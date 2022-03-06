import { message } from 'antd';
import React, { useState, FunctionComponent, useRef, useEffect, useCallback } from 'react';
import { useIntersectionObserver } from '../hooks/many';

// Components

// Interfaces

// Stylesheet
import './membersVideo.scss';

export interface MembersVideoProps {
    videoUrl: string;
    className?: string;
}

const MembersVideo: FunctionComponent<MembersVideoProps> = (props) => {
    const { videoUrl, className } = props;

    // TODO:删除此临时解决方案
    const [antMsg, ctxHolder] = message.useMessage();
    const handleClick = useCallback(() => {
        antMsg.info("招新还未开始噢，请耐心等待～", 1);
    }, []);

    return (
        <div className={`members-video ${className || ''}`} onClick={handleClick}>
            {
                //TODO：删除此临时提示
                ctxHolder
            }
            <div className='members-video--border-tl' />
            <div className='members-video--border-br' />
            <video loop className='members-video--vid' muted autoPlay
                preload='auto' src={videoUrl}>
            </video>
        </div >
    );
};

export default MembersVideo;