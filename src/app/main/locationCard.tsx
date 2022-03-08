/**
 * * 带地图、位标的地点展示专用卡片
 * @author shepard
 */

import React, { useState, FunctionComponent, useRef, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';

// Components
import Card from '../shared/card';
import Container from '../shared/container';
import Text from '../shared/text';
import { IconBar, IconDownOutlined, IconLocation, IconMap } from '../shared/icons';
import Amap from '../shared/amap';

// Interfaces
import { ContainerProps } from '../shared/container';

// Stylesheet
import './locationCard.scss';

export interface LocationCardProps {
    className?: string;
    title: React.ReactNode;
    descrip?: React.ReactNode;
    location: React.ReactNode;
    // 地点名称的国际化文本ID
    locationIntlId: string;
    imgSrc: string;
    imgPreview?: boolean;    // 是否允许打开图片预览
    markerLonLat: [number, number];
    // 首次加载显示全景和地图交互提示
    splash?: boolean;
}

const LocationCard: FunctionComponent<LocationCardProps> = (props) => {
    const {
        className,
        title,
        descrip,
        location,
        imgSrc,
        imgPreview,
        markerLonLat,
        locationIntlId,
        splash
    } = props;

    const intl = useIntl();

    // 是否显示导航地图
    const [showMap, setShowMap] = useState(false);

    // 地图组件引用
    const amapRef = useRef<HTMLDivElement>(null);
    // 全景图交互提示引用
    const imageMaskRef = useRef<HTMLDivElement>(null);
    // 地图交互提示引用
    const mapMaskRef = useRef<HTMLDivElement>(null);

    // 处理显示、隐藏地图
    const handleShowMap = useCallback(() => { setShowMap(true) }, []);
    const handleHideMap = useCallback<ContainerProps['onClick']>((ev) => {
        if (ev.target !== amapRef.current)
            setShowMap(false);
    }, []);
    // 阻止单击地图时事件冒泡到loc-card--content，导致地图隐藏
    const handleMapClick = useCallback((ev) => { ev.stopPropagation(); }, []);

    // 首次显示后提示交互
    useEffect(() => {
        if (!splash) return;
        const inOb = new IntersectionObserver((entries, ob) => {
            for (const entry of entries) {
                if (entry.intersectionRatio <= 0) return;
                entry.target.parentElement.classList.add('loc-card--mask--visible');
                entry.target.classList.add('loc-card--mask--visible');
                setTimeout(() => {
                    entry.target.parentElement.classList.remove('loc-card--mask--visible');
                    entry.target.classList.remove('loc-card--mask--visible');
                    ob.unobserve(entry.target);
                }, 2000);
            }
        });
        for (const nodeRef of [imageMaskRef, mapMaskRef]) {
            inOb.observe(nodeRef.current);
        }
    }, [splash]);

    return (
        <Card imgAlt='Image of the location is currently not availible.' className={`loc-card ${className || ''}`} imgSrc={imgSrc} imgPreview={imgPreview}
            imgClass='loc-card--image' imgMaskRef={imageMaskRef} disableTransition
            imgFallback={require('../../assets/location-image-fallback.svg')}>
            <div className='loc-card--content-wrapper'>
                <Container direction='column' onClick={handleHideMap}
                    className='loc-card--content'>
                    <span className='loc-card--content--location container-end'>
                        {showMap
                            ? <IconBar className='loc-card--content--location--expand-icon' />
                            : <IconDownOutlined className='loc-card--content--location--expand-icon' />}
                        <span className='loc-card--content--location--text'>{location}</span>
                        <IconLocation className='loc-card--content--location--loc-icon' />
                    </span>
                    <span className='loc-card--content--title text-line-clamp-1'>{title}</span>
                    <span className='loc-card--content--descrip text-line-clamp-2'>{descrip}</span>
                    <Amap className={`loc-card--content--amap ${showMap ? 'loc-card--content--amap--visible' : ''}`}
                        innerRef={amapRef} onClick={handleMapClick} load={showMap}
                        markerName={intl.messages[locationIntlId] as string}
                        markerLonLat={markerLonLat} />
                </Container>
                <Container justify='center' align='center' direction='column' innerRef={mapMaskRef}
                    onClick={handleShowMap} style={{ display: showMap ? 'none' : 'flex' }}
                    className='loc-card--content-mask'>
                    <IconMap className='loc-card--content-mask--map-icon' />
                    <Text id='locationCard.showMap' className='loc-card--content-mask--text' />
                </Container>
            </div>
        </Card>
    );
};

export default LocationCard;