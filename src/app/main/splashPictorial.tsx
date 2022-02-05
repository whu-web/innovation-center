import React, { FunctionComponent } from 'react';

// Components
import Pictorial from '../shared/pictorial';

// Interfaces

// Stylesheet
import './splashPictorial.scss';

export interface SplashPictorialProps {
    imgUrl: string;
    imgAlt: string;
    title: string;
    descrip: string;
}

const SplashPictorial: FunctionComponent<SplashPictorialProps> = (props) => {
    const { imgUrl, imgAlt, title, descrip } = props;

    return (
        <Pictorial className='splash' imgUrl={imgUrl} imgAlt={imgAlt}>
            <div className='splash--content'>
                <p className='splash--content--title text-line-clamp-1'>{title}</p>
                <p className='splash--content--descrip text-line-clamp-2'>{descrip}</p>
            </div>
        </Pictorial>
    );
};

export default SplashPictorial;