import React, { FunctionComponent } from 'react';
import { ContentBase } from '../../types';

// Components
import Pictorial from '../shared/pictorial';

// Interfaces

// Stylesheet
import './splashPictorial.scss';

export interface SplashPictorialProps extends Omit<ContentBase, 'id'> {
    className?: string;
}

const SplashPictorial: FunctionComponent<SplashPictorialProps> = (props) => {
    const { imgUrl, title, descrip, link, className } = props;

    return (
        <Pictorial className={`splash ${className || ''}`} imgUrl={imgUrl} imgAlt={title} disableTransition>
            <div className='splash--content'>
                <a href={link} className='splash--link' target='_blank'>
                    <p className='splash--content--title text-line-clamp-title-first'>{title}</p>
                    <p className='splash--content--descrip text-line-clamp-2'>{descrip}</p>
                </a>
            </div>
        </Pictorial>
    );
};

export default SplashPictorial;