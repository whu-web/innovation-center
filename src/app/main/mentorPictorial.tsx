import React, { useEffect, useRef, FunctionComponent } from 'react';
import Pictorial from '../shared/pictorial';

// Components
import Container from '../shared/container';
import Text from '../shared/text';
import { FormattedDate } from 'react-intl';
import { IconArrowRight } from '../shared/icons';

// Interfaces
import { MentorInfo } from '../../types';

// Stylesheet
import './mentorPictorial.scss';

export interface MentorPictorialProps extends MentorInfo {
    className?: string;
    // 香蕉检测过渡动画
    disableTransition?: boolean;
    // 香蕉检测过渡动画延时(ms)
    transitionDelay?: number;
}

const MentorPictorial: FunctionComponent<MentorPictorialProps> = (props) => {
    const {
        name,
        titles,
        intro,
        department,
        className,
        link,
        imgUrl,
        disableTransition,
        transitionDelay
    } = props;

    return (
        <Pictorial className={`mentor ${className || ''}`} disableTransition={disableTransition}
            layerClass='mentor--layer' transitionDelay={transitionDelay}
            imgUrl={imgUrl} imgAlt={intro}>
            <a href={link} target='_blank' className='mentor--link-wrapper container-column'>
                <p className='mentor--line mentor--line1'>
                    <span className='mentor--line1--name'>{name}</span>
                    <span className='mentor--line1--titles'>{titles}</span>
                </p>
                <p className='mentor--line mentor--line2'>{department}</p>
                <p className='mentor--line mentor--line3 text-line-clamp-4'>{intro}</p>
            </a>
        </Pictorial>
    );
};

export default MentorPictorial;