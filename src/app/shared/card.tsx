/**
 * * 卡片组件
 * @author shepard
 */

import React, { useMemo, FunctionComponent, LegacyRef, useRef, useCallback, useEffect } from 'react';
import { useTransition } from '../hooks/many';

// Components
import { Image } from 'antd';
import Container, { ContainerProps } from './container';
import { IconPanorama } from './icons';
import Text from './text';

// Interfaces

// Stylesheet
import './card.scss';
import { useNavigate } from 'react-router';

export interface CardProps extends ContainerProps {
    className?: string;
    imgSrc: string;
    imgClass?: string;
    imgFallback?: string;
    imgPreview?: boolean;
    imgMaskRef?: LegacyRef<HTMLDivElement>,
    link?: string;
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
        link,
        ...divProps
    } = props;

    const navigate = useNavigate();
    const rootNodeRef = useRef<HTMLDivElement>(null);

    const inOb = useTransition('card--hidden', disableTransition, transitionDelay);
    useEffect(() => {
        if (!disableTransition) inOb.observe(rootNodeRef.current);
    }, [inOb, disableTransition]);

    const previewMask = useMemo(() => (
        <Container className='card--image-mask' justify='center' direction='column' innerRef={imgMaskRef}>
            <IconPanorama className='card--image-mask--icon' />
            <Text id='card.panorama' className='card--image-mask--text' />
        </Container>
    ), [imgMaskRef]);

    const handleClick = useCallback(() => {
        navigate(link);
    }, [navigate, link]);


    return (
        <Container className={`card ${className || ''} ${disableTransition ? '' : 'card--hidden'}`} onClick={link ? handleClick : null}
            style={{ cursor: link ? 'pointer' : 'auto' }}
            innerRef={rootNodeRef} align={align || 'start'} direction={direction || null} {...divProps}>
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