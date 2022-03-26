import React, { FunctionComponent } from 'react';

// Components
import Card from '../shared/card';

// Interfaces
import { NewsType } from '../../types';

// Stylesheet
import './newsCard.scss';
import { FormattedDate, useIntl } from 'react-intl';

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

    const locale = useIntl().locale;

    return (
        <Card imgAlt={title} className={`news-card ${className || ''}`} imgSrc={imgUrl} imgFallback={title}
            imgPreview={false} direction='row' transitionDelay={transitionDelay} link={`/news/${id}`}
            imgClass='news-card--image'
            disableTransition={disableTransition} >
            <div className='news-card--wrapper'>
                <p className='news-card--time'>
                    {publishTime.toLocaleString(locale, {
                        year: publishTime.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
                        month: 'short',
                        day: '2-digit'
                    })}
                </p>
                <p className='news-card--title text-line-clamp-3'>{title}</p>
            </div>
        </Card>
    );
};

export default NewsCard;