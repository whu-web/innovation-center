/**
 * * 更多导师卡片
 * @author shepard
 */

import { message } from 'antd';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react';
import { MentorInfo } from '../../types';
import { useTransition } from '../hooks/many';
import { IconMore } from '../shared/icons';
import Text from '../shared/text';

// Components

// Interfaces

// Stylesheet
import './moreMentors.scss';

export interface MoreMentorsProps {
    className?: string;
    mentors: MentorInfo[],
    disableTransition?: boolean;
    transitionDelay?: number;
}

const MoreMentors: FunctionComponent<MoreMentorsProps> = (props) => {
    const { className, mentors, disableTransition, transitionDelay } = props;

    // 其他导师照片栈
    const mentorImageStacks = useMemo(() => ([0, 1, 2].map(stackIdx => (
        <span className='more-mentors--area' key={stackIdx}>{
            mentors.map((elem, idx) => idx % 3 === stackIdx ? (
                <img key={elem.id} src={elem.imgUrl} alt={elem.name} className='more-mentors--image' />
            ) : null)
        }</span>
    ))), []);

    // 照片栈切换动画
    useEffect(() => {
        const switchInterval = 2500;
        const transitionTime = 400;
        const maxSwitchDelay = 500;
        const interval = setInterval(() => {
            document.querySelectorAll('.more-mentors--area:not(.more-mentors--all-mentors)').forEach((area) => {
                // 照片栈从上往下找到目前显示的那一张
                let allInvisible = true;
                const childElems: HTMLImageElement[] = [];
                for (let i = area.children.length - 1; i >= 0; --i) {
                    const elem = area.children.item(i) as HTMLImageElement;
                    childElems.push(elem);
                    // 如果照片栈上存在有显示的那一张，则将其透明度设置为0
                    if (elem.style.opacity === '1' && i !== 0) {
                        allInvisible = false;
                        setTimeout(() => { elem.style.opacity = '0'; }, Math.random() * maxSwitchDelay);
                        break;
                    }
                }
                // 如果除了底部一张照片，其他均不可见，则恢复所有照片透明度为1
                if (allInvisible) {
                    childElems.forEach((elem, idx) => {
                        if (idx === 0) setTimeout(() => elem.style.opacity = '1', Math.random() * maxSwitchDelay);
                        else setTimeout(() => { elem.style.opacity = '1'; }, transitionTime);
                    });
                }
            });
        }, switchInterval);

        return () => clearInterval(interval);
    }, []);

    // TODO：删除此临时解决方案
    const [antMsg, ctxHolder] = message.useMessage();
    const handleMoreMentorsClick = useCallback(() => {
        antMsg.info((
            "更多导师页面暂时不可用噢"
        ), 1);
    }, []);

    // 卡片过渡动画
    const inOb = useTransition('more-mentors--invisible', disableTransition, transitionDelay);
    const myRef = useRef<HTMLDivElement>(null);
    useEffect(() => { if (!disableTransition) inOb.observe(myRef.current); }, [disableTransition, inOb]);

    return (
        <div className={`more-mentors ${className || ''} more-mentors--invisible`} ref={myRef} onClick={handleMoreMentorsClick}>
            {
                //TODO：删除此临时提示
                ctxHolder
            }
            {mentorImageStacks}
            <span className='more-mentors--area more-mentors--all-mentors container-column-center'>
                <Text id='allMentors' />
                <IconMore />
            </span>
        </div>
    );
};

export default MoreMentors;