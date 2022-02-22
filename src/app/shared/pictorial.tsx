/**
 * * 画报组件
 * 背景图像叠加上层内容
 * 
 * @author shepard
 */
import React, { useRef, FunctionComponent, LegacyRef } from 'react';
import { useTransition } from '../hooks/many';

// Components

// Interfaces

// Stylesheet
import './pictorial.scss';

export interface PictorialProps {
    imgUrl: string;
    imgAlt: string;
    className?: string;
    imageClass?: string;
    layerClass?: string;
    imgRef?: LegacyRef<HTMLImageElement>;
    // 香蕉检测过渡动画
    disableTransition?: boolean;
    // 香蕉检测过渡动画延时(ms)
    transitionDelay?: number;
}

const Pictorial: FunctionComponent<PictorialProps> = (props) => {
    const {
        imgUrl,
        disableTransition,
        transitionDelay,
        imgAlt,
        className,
        imageClass,
        layerClass,
        children,
        imgRef
    } = props;

    const rootNodeRef = useRef<HTMLDivElement>(null);

    useTransition(rootNodeRef, 'pictorial--hidden', disableTransition, transitionDelay);

    return (
        <div className={`pictorial ${className || ''} ${disableTransition ? '' : 'pictorial--hidden'}`} ref={rootNodeRef}>
            <img ref={imgRef} className={`pictorial--bg-img ${imageClass || ''}`} src={imgUrl} alt={imgAlt} />
            <div className={`pictorial--layer ${layerClass || ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Pictorial;