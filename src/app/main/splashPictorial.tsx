import React, { FunctionComponent, } from 'react';
import { Link } from 'react-router-dom';
import { ContentBase } from '../../types';

// Components
import Pictorial from '../shared/pictorial';

// Interfaces

// Stylesheet
import './splashPictorial.scss';

export interface SplashPictorialProps extends Omit<ContentBase, 'id'> {
    className?: string;
    ariaHidden?: boolean;
}

const SplashPictorial: FunctionComponent<SplashPictorialProps> = (props) => {
    const { imgUrl, title, descrip, link, className, ariaHidden } = props;

    return (
        <Pictorial className={`splash ${className || ''}`} imgUrl={imgUrl} imgAlt={title} disableTransition>
            <div className='splash--content' aria-hidden={ariaHidden || false}>
                <Link to={link} className='splash--link'>
                    <p className='splash--content--title text-line-clamp-title-first'>{title}</p>
                    <p className='splash--content--descrip text-line-clamp-2'>{descrip}</p>
                </Link>
            </div>
        </Pictorial>
    );
};

export default SplashPictorial;