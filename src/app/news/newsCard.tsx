import React, { FunctionComponent } from 'react';

// Components
import Card from '../shared/card';
import { Link } from 'react-router-dom';

// Interfaces
import { NewsType } from '../../types';

// Stylesheet
import './newsCard.scss';
import { FormattedDate } from 'react-intl';

export interface NewsCardProps extends Omit<NewsType, 'tag'> {
    className?: string;
    // 香蕉检测过渡动画
    disableTransition?: boolean;
    // 香蕉检测过渡动画延时(ms)
    transitionDelay?: number;
}

const NewsCard: FunctionComponent<NewsCardProps> = (props) => {
    const {
        className,
        disableTransition,
        transitionDelay,
        imgUrl,
        publishTime,
        title,
        id
    } = props;

    return (
        <Card className={`news-card ${className || ''}`} imgSrc={imgUrl} imgFallback={title}
            imgPreview={false} direction='row' transitionDelay={transitionDelay}
            imgClass='news-card--image'
            disableTransition={disableTransition} >
            <Link to={`/news/${id}`} className='news-card--link-wrapper'>
                <p className='news-card--time'>
                    <FormattedDate value={publishTime}
                        year={publishTime.getFullYear() === new Date().getFullYear() ? null : 'numeric'}
                        month='short'
                        day='2-digit' />
                </p>
                <p className='news-card--title text-line-clamp-3'>{title}</p>
            </Link>
        </Card >
    );
};

export default NewsCard;