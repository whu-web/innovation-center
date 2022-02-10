/**
 * * 卡片组件
 * @author shepard
 */

import React, { useMemo, FunctionComponent, LegacyRef, useRef } from 'react';
import { useTransition } from './hooks';

// Components
import { Image } from 'antd';
import Container, { ContainerProps } from './container';
import { IconPanorama } from './icons';
import Text from './text';

// Interfaces

// Stylesheet
import './card.scss';

export interface CardProps extends ContainerProps {
    className?: string;
    imgSrc: string;
    imgClass?: string;
    imgFallback?: string;
    imgPreview?: boolean;
    imgMaskRef?: LegacyRef<HTMLDivElement>,
    // 香蕉检测过渡动画
    disableTransition?: boolean;
    // 香蕉检测过渡动画延时(ms)
    transitionDelay?: number;
}

const Card: FunctionComponent<CardProps> = (props) => {
    const {
        className,
        imgSrc,
        imgClass,
        imgFallback,
        children,
        imgPreview,
        imgMaskRef,
        direction,
        align,
        disableTransition,
        transitionDelay,
        ...divProps
    } = props;

    const rootNodeRef = useRef<HTMLDivElement>(null);

    useTransition(rootNodeRef, 'card--hidden', disableTransition, transitionDelay);

    const previewMask = useMemo(() => (
        <Container className='card--image-mask' justify='center' direction='column' innerRef={imgMaskRef}>
            <IconPanorama className='card--image-mask--icon' />
            <Text id='card.panorama' className='card--image-mask--text' />
        </Container>
    ), [imgMaskRef]);

    return (
        <Container className={`card ${className || ''} ${disableTransition ? '' : 'card--hidden'}`}
            innerRef={rootNodeRef} align={align || 'start'} direction={direction || 'column'} {...divProps}>
            <Image src={imgSrc} preview={imgPreview ? {
                mask: imgPreview ? previewMask : null,
            } : false}
                fallback={imgFallback}
                className={`card--image ${imgClass} `} />
            {children}
        </Container>
    );
};

export default Card;