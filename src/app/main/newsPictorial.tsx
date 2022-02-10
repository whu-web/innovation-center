import React, { useEffect, useRef, FunctionComponent } from 'react';
import Pictorial from '../shared/pictorial';

// Components
import Container from '../shared/container';
import Text from '../shared/text';

// Interfaces

// Stylesheet
import './newsPictorial.scss';
import { FormattedDate } from 'react-intl';
import { IconArrowRight } from '../shared/icons';
import { NewsType } from '../../types';

export interface NewsPictorialProps extends Omit<NewsType, 'id'> {
    className?: string;
    // 香蕉检测过渡动画
    disableTransition?: boolean;
    // 香蕉检测过渡动画延时(ms)
    transitionDelay?: number;
}

const NewsPictorial: FunctionComponent<NewsPictorialProps> = (props) => {
    const {
        imgUrl,
        className,
        title,
        descrip,
        publishTime,
        link,
        disableTransition,
        transitionDelay
    } = props;

    return (
        <Pictorial className={`news ${className || ''}`} disableTransition={disableTransition}
            layerClass='news--layer' transitionDelay={transitionDelay}
            imgUrl={imgUrl} imgAlt={title}>
            <a href={link} target='_blank' className='news--link-wrapper container-column-end'>
                <p className='news--layer--title text-line-clamp-2'>{title}</p>
                <p className='news--layer--descrip text-line-clamp-3'>{descrip}</p>
                <p className='news--layer--time'>
                    <FormattedDate value={publishTime}
                        year={publishTime.getFullYear() === new Date().getFullYear() ? null : 'numeric'}
                        month='short'
                        day='2-digit' />
                </p>
                <Container className='news--layer--more-wrapper' justify='end'>
                    <Text id='news.more' icon={<IconArrowRight />}
                        direction='row-reverse' className='news--layer--more' />
                </Container>
            </a>
        </Pictorial >
    );
};

export default NewsPictorial;