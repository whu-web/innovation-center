import { message } from 'antd';
import React, { FunctionComponent, useCallback } from 'react';

// Components

// Interfaces

// Stylesheet
import './membersVideo.scss';

export interface MembersVideoProps {
    videoUrl: string;
    videoUrlAlt: string;
    className?: string;
}

const MembersVideo: FunctionComponent<MembersVideoProps> = (props) => {
    const { videoUrl, className, videoUrlAlt } = props;

    // TODO:删除此临时解决方案
    const [antMsg, ctxHolder] = message.useMessage();
    const handleClick = useCallback(() => {
        antMsg.info("招新还未开始噢，请耐心等待～", 1);
    }, [antMsg]);

    return (
        <div className={`members-video ${className || ''}`} onClick={handleClick}>
            {
                //TODO：删除此临时提示
                ctxHolder
            }
            <div className='members-video--border-tl' />
            <div className='members-video--border-br' />
            <video loop className='members-video--vid' muted autoPlay
                preload='auto'>
                <source src={videoUrl}></source>
                <source src={videoUrlAlt}></source>
            </video>
        </div >
    );
};

export default MembersVideo;