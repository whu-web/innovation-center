/**
 * * 高德地图组件
 * @author shepard
 */

import React, { useState, FunctionComponent, useEffect, useRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useTheme } from '../hooks/many';

(window as any)._AMapSecurityConfig = {
    securityJsCode: 'ac9f17feb51213464455cde088a274df',
}

import AMapLoader from '@amap/amap-jsapi-loader';

// Components
import Container from './container';
import { IconGoBack } from './icons';

// Interfaces

// Stylesheet
import './amap.scss';

export interface AmapProps extends React.HTMLAttributes<HTMLDivElement> {
    // 该id将作为地图挂载点，需保证唯一。若未指定，将使用时间生成
    mapId?: string;
    // 地图标记点位置
    markerLonLat: [number, number];
    // 地图标记点名（用以唤起地图）
    markerName: string;

    // 一次性懒加载控制属性，若取undefined或null，将在首次渲染加载。若为false则暂不加载，true则加载地图
    load?: boolean;

    className?: string;
    innerRef?: React.LegacyRef<HTMLDivElement>;

    // 提供一个返回功能按钮的回调。若取undefined或null，不显示该按钮
    onGoBack?: () => void;
}

const Amap: FunctionComponent<AmapProps> = (props) => {
    const {
        mapId,
        markerLonLat,
        className,
        style,
        innerRef,
        markerName,
        load,
        onGoBack,
        ...divProps
    } = props;

    // 地图加载错误时的容错机制
    const [mapFallback, setMapFallback] = useState<boolean>(false);

    const mapIdRef = useRef<string>(mapId ? mapId : Date.now().toString());
    const mapRef = useRef<any>(null);  // 高德地图JS API 2.0没有TypeScript类型定义文件

    const intl = useIntl();
    const theme = useTheme();

    // 首次渲染挂载地图
    useEffect(() => {
        // 若指定load属性为false，或地图已加载完成，则不再重复加载地图
        if (load === false || mapRef.current) return;
        // load为undefined时，该effect会在第一次渲染后执行且仅执行一次
        AMapLoader.load({
            key: 'afaf068e8d94f762627f278a497c8e3c',
            version: '1.4.15'
        }).then((Amap) => {
            // 挂载地图到DOM节点
            const map = mapRef.current = new Amap.Map(mapIdRef.current, {
                zoom: 16,
                center: markerLonLat
            });
            // 设置颜色主题
            if (theme === 'dark')
                map.setMapStyle("amap://styles/dark");
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                map.setMapStyle(`amap://styles/${event.matches ? "dark" : "light"}`);
            });
            //实时路况图层
            const trafficLayer = new Amap.TileLayer.Traffic({
                zIndex: 10,
                zooms: [7, 22],
            });
            trafficLayer.setMap(map);

            // 显示标记点
            const marker = new Amap.Marker({
                icon: require('../../assets/location-animated.svg'),
                position: markerLonLat,
                label: {
                    offset: new Amap.Pixel(35, -3),
                    content: intl.messages['amap.toNavigationMapApp']
                }
            });
            // 设置单击标记唤起地图
            marker.on('click', () => {
                marker.markOnAMAP({
                    name: markerName,
                    position: marker.getPosition(),
                })
            })
            map.add(marker);

            // 限制地图区域
            const bounds = map.getBounds();
            map.setLimitBounds(bounds);

        }).catch(() => { setMapFallback(true); })
    }, [load, theme]); // eslint-disable-line

    const backBtn = useMemo(() => (onGoBack
        ? (
            <Container className='amap--back-btn' onClick={onGoBack} justify='center'>
                <IconGoBack />
            </Container>
        ) : null)
        , [onGoBack])

    return (
        <div id={mapIdRef.current} ref={innerRef} {...divProps} style={style}
            className={`amap-container ${className || ''}`}>
            {mapFallback
                ? <img className='amap-container--fallback' src={require('../../assets/map-fallback.svg')}
                    alt='Unable to load AMap services' />
                : null}
            {backBtn}
        </div>
    );
};

export default Amap;