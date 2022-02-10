import React, { useState, useRef, FunctionComponent, useCallback, useEffect } from 'react';

// Components
import SplashPictorial from './splashPictorial';
import Container from '../shared/container';
import { Col, Row, Carousel } from 'antd';
import { IconDown } from '../shared/icons';
import { FormattedMessage } from 'react-intl';
import ClubPurpose from './clubPurpose';
import ClubResources from './clubResources';
import Text from '../shared/text';
import NewsPictorial from './newsPictorial';
import EventPictorial from './eventPictorial';

// Interfaces

// Stylesheet
import './main.scss';

// Mock data
import picMocks from '../../mocks/pictorial.mocks';
import newsMocks from '../../mocks/news.mocks';
import eventMocks from '../../mocks/event.mocks';
import mentorMocks from '../../mocks/mentor.mocks';
import EventCard from './eventCard';
import { useIntersetionObserver } from '../shared/hooks';
import MentorPictorial from './mentorPictorial';


export interface MainProps {

}

const Main: FunctionComponent<MainProps> = (props) => {

    // 处理向下滚动一屏的事件
    const handleScrollDownClick = useCallback(() => { window.scroll({ top: window.innerHeight, behavior: 'smooth' }); }, []);

    // 中心简介DOM node ref
    const overviewPurposeNodeRef = useRef<HTMLDivElement>(null);
    // 中心资源DOM node ref
    const overviewResourcesNodeRef = useRef<HTMLDivElement>(null);


    useIntersetionObserver([overviewPurposeNodeRef, overviewResourcesNodeRef],
        (entries, inOb) => {
            let allAdded = true;
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    allAdded = false;
                    return;
                }
                entry.target.classList.add('main--elem--visible');
            });
            if (allAdded) inOb.disconnect();
        });

    return (
        <div className='main'>
            {/* 首屏轮播图 */}
            <div className='main--carousel'>
                <Carousel autoplay={true} effect='fade' autoplaySpeed={5000}
                    dots={{ className: 'main--carousel--dots' }}
                    lazyLoad='progressive'>{
                        picMocks.map((elem) => (
                            <SplashPictorial key={elem.id} {...elem} />))}
                </Carousel>
                {/* 向下滚动一屏指示按钮 */}
                <Container direction='column' className='main--scroll-down' onClick={handleScrollDownClick}>
                    <IconDown className='main--scroll-down--icon main--scroll-down--icon--upper' />
                    <IconDown className='main--scroll-down--icon main--scroll-down--icon--lower' />
                </Container>
            </div>
            {/* 主页内容区 */}
            <div className='main--content'>
                {/* 中心概况区域 */}
                <Row className='main--overview'>
                    {/* 中心简介 */}
                    <Col xl={10} className='main--overview--purpose' ref={overviewPurposeNodeRef}>
                        <ClubPurpose />
                    </Col>
                    {/* 中心资源详情区 */}
                    <Col xl={14} className='main--overview--resources' ref={overviewResourcesNodeRef} >
                        <ClubResources />
                    </Col>
                </Row>
                {/* 新闻板块 */}
                <section className='main--news main--section'>
                    <h2 className='main--news--heading container-center main--section--heading'>
                        <Text id='rs' />
                        <span className='main--section--heading--plus'>+</span>
                        <Text id='news' />
                    </h2>
                    <Row className='main--news--row'>{
                        newsMocks.map((elem, idx) => (
                            <Col xl={8} key={elem.id} className='main--news--col'>
                                <NewsPictorial className='main--news--col--news-pic' {...elem}
                                    transitionDelay={idx * 100} />
                            </Col>
                        ))
                    }</Row>
                </section>
                {/* 活动板块 */}
                <section className='main--events main--section'>
                    <h2 className='main--events--heading container-center main--section--heading'>
                        <Text id='rs' />
                        <span className='main--section--heading--plus'>+</span>
                        <Text id='events' />
                    </h2>
                    <Row className='main--events--row'>
                        <Col xl={12} className='main--events--col'>
                            <EventPictorial {...eventMocks[0]} className='main--events--pic' />
                        </Col>
                        <Col xl={6} className='main--events--col'>
                            <EventCard {...eventMocks[1]} className='main--events--card' />
                        </Col>
                        <Col xl={6} className='main--events--col'>
                            <EventCard {...eventMocks[2]} className='main--events--card' />
                        </Col>
                    </Row>
                </section>
                {/* 导师板块和成员板块 */}
                <Row className='main--mentors-and-members'>
                    <Col xl={12}>
                        <section className='main--mentors main--section'>
                            <h2 className='main--mentors--heading container main--section--heading'>
                                <Text id='rs' />
                                <span className='main--section--heading--plus'>+</span>
                                <Text id='mentors' />
                            </h2>
                            <Row className='main--mentors--row'>{
                                mentorMocks.map((elem, idx) => (
                                    <Col xl={12} key={elem.id} className='main--mentors--row--col'>
                                        <MentorPictorial transitionDelay={idx * 100}
                                            className='main--mentors--row--col--pic' {...elem} />
                                    </Col>))
                            }</Row>
                        </section>
                    </Col>
                    <Col xl={12}>
                        <section className='main--members main--section'>
                            <h2 className='main--members--heading container main--section--heading'>
                                <Text id='rs' />
                                <span className='main--section--heading--plus'>+</span>
                                <Text id='members' />
                            </h2>
                        </section>
                    </Col>
                </Row>
            </div>
        </div >
    );
};

export default Main;