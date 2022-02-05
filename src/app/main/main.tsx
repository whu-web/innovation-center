import React, { useState, FunctionComponent, useCallback } from 'react';

// Components
import { Carousel } from 'antd';
import SplashPictorial from './splashPictorial';
import Container from '../shared/container';

// Interfaces

// Stylesheet
import './main.scss';

import picMocks from '../../mocks/pictorial.mocks';
import { IconDown } from '../shared/icons';

export interface MainProps {

}

const Main: FunctionComponent<MainProps> = (props) => {

    // 处理向下滚动一屏的事件
    const handleScrollDownClick = useCallback(() => { window.scroll({ top: window.innerHeight, behavior: 'smooth' }); }, []);

    return (
        <div className='main'>
            <div className='main--carousel'>
                <Carousel autoplay={true} effect='fade' autoplaySpeed={5000}
                    dots={{ className: 'main--carousel--dots' }}
                    lazyLoad='progressive'>{
                        picMocks.map((elem) => (<SplashPictorial key={elem.id} title={elem.title}
                            descrip={elem.descrip} imgUrl={elem.imgUrl} imgAlt={elem.title}
                        />))
                    }
                </Carousel>
                <Container direction='column' className='main--scroll-down' onClick={handleScrollDownClick}>
                    <IconDown className='main--scroll-down--icon main--scroll-down--icon--upper' />
                    <IconDown className='main--scroll-down--icon main--scroll-down--icon--lower' />
                </Container>
            </div>
            <div className='main--content'>
                {Array(200).fill(2).map((a, idx) => <div>{idx}:Hello</div>)}
            </div>
        </div >
    );
};

export default Main;