/**
 * * 分享栏
 */
import React, { useState, FunctionComponent } from 'react';
import Container from '../shared/container';
import { IconQQ, IconShare, IconWechat, IconWechatX, IconWeiboX } from '../shared/icons';

// Components

// Interfaces
import { ContainerProps } from '../shared/container';

// Stylesheet
import './shareBar.scss';

export interface ShareBarProps {
    className?: string;
    // hollow 将按钮样式设成镂空带背景；solid 按钮无背景
    type?: 'hollow' | 'solid'
    // 按钮排列方向
    direction?: 'column' | 'row';
    style?: ContainerProps['style'];
    justify?: ContainerProps['justify'];
    align?: ContainerProps['align'];
}

const ShareBar: FunctionComponent<ShareBarProps> = (props) => {
    const { className, type, direction, ...containerProps } = props;

    return (
        <Container className={`${'share-bar--' + (type || 'hollow')} ${className || ''}`} direction={direction} {...containerProps}>
            <IconQQ className='share-bar--qq' />
            <IconWechatX className='share-bar--wechat' />
            <IconWeiboX className='share-bar--weibo' />
            <IconShare className='share-bar--share' />
        </Container >
    );
};

export default ShareBar;