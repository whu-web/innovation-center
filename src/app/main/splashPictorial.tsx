import React, { FunctionComponent } from 'react';
import { ContentBase } from '../../types';

// Components
import Pictorial from '../shared/pictorial';

// Interfaces

// Stylesheet
import './splashPictorial.scss';

export interface SplashPictorialProps extends Omit<ContentBase, 'id'> {
}

const SplashPictorial: FunctionComponent<SplashPictorialProps> = (props) => {
    const { imgUrl, title, descrip, link } = props;

    return (
        <Pictorial className='splash' imgUrl={imgUrl} imgAlt={title} disableTransition>
            <div className='splash--content'>
                <a href={link} className='splash--link' target='_blank'>
                    <p className='splash--content--title text-line-clamp-1'>{title}</p>
                    <p className='splash--content--descrip text-line-clamp-2'>{descrip}</p>
                </a>
            </div>
        </Pictorial>
    );
};

export default SplashPictorial;