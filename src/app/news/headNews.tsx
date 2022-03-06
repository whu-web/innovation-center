import React, { FunctionComponent } from 'react';

// Components
import Card from '../shared/card';

// Interfaces
import { NewsType } from '../../types';

// Stylesheet
import './headNews.scss';

export interface HeadNewsProps extends Omit<NewsType, 'tag'> {
    className?: string;
}

const HeadNews: FunctionComponent<HeadNewsProps> = (props) => {
    const {
        className,
        title,
        descrip,
        imgUrl,
        id,
    } = props;

    return (
        <Card className={`head-news ${className || ''}`} imgClass='head-news--image' link={`/news/${id}`}
            imgFallback={descrip} imgSrc={imgUrl}>
            <div className='head-news--content'>
                <p className='head-news--title text-line-clamp-3'>{title}</p>
                <p className='head-news--descrip text-line-clamp-7'>{descrip}</p>
            </div>
        </Card>
    );
};

export default HeadNews;