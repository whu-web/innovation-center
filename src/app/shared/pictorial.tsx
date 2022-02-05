/**
 * * 画报组件
 * 背景图像叠加上层内容
 * 
 * @author shepard
 */
import React, { useState, FunctionComponent } from 'react';

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
    imgRef?: React.LegacyRef<HTMLImageElement>;
}

const Pictorial: FunctionComponent<PictorialProps> = (props) => {
    const { imgUrl, imgAlt, className, imageClass, layerClass, children, imgRef } = props;

    return (
        <div className={`pictorial ${className || ''}`}>
            <img ref={imgRef} className={`pictorial--bg-img ${imageClass || ''}`} src={imgUrl} alt={imgAlt} />
            <div className={`pictorial--layer ${layerClass || ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Pictorial;