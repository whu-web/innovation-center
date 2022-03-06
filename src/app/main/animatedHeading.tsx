/**
 * * 带有滚动触发动画的标题
 * 
 */

import React, { useState, FunctionComponent } from 'react';

// Components
import Text from '../shared/text';

// Interfaces
import Heading, { HeadingProps } from '../shared/heading';

// Stylesheet
import './animatedHeading.scss';
import { useSimpleScrollAnimation } from '../hooks/many';

export interface AnimatedHeadingProps extends HeadingProps {
    className?: string;
    msgId?: string;
}

const AnimatedHeading: FunctionComponent<AnimatedHeadingProps> = (props) => {
    const { className, msgId, ...headingProps } = props;

    const rsRef = useSimpleScrollAnimation<HTMLDivElement>({
        ruleName: 'top',
        ruleValTemplate: 'calc(var(--scale) * {}px)',
        ruleValMin: 8,
        ruleValMax: -10,
        scrollTrigStartOffsetFromTargetTop: -window.innerHeight * 0.75,
        scrollTrigEndOffsetFromTargetBottom: -window.innerHeight * 0.25,
        direction: 'vertical',
        interpMethod: 'ease-in-out',
        throttle: 10
    });

    return (
        <Heading className={`anima-heading ${className || ''}`} {...headingProps}>
            <div ref={rsRef} className='anima-heading--subtitle container'>
                <Text id='rs+' className='anima-heading--rs' />
                <div className='anima-heading--line'></div>
            </div>
            <Text id={msgId} className='anima-heading--title' />
        </Heading>
    );
};

export default AnimatedHeading;