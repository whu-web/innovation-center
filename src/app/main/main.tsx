import React, { useRef, FunctionComponent, useCallback, useEffect } from 'react';
import { useIntersetionObserver } from '../hooks/many';

// Components
import SplashPictorial from './splashPictorial';
import Container from '../shared/container';
import { Col, Row, Carousel } from 'antd';
import { IconDown } from '../shared/icons';
import ClubPurpose from './clubPurpose';
import ClubResources from './clubResources';
import Text from '../shared/text';
import NewsPictorial from '../shared/newsPictorial';
import EventPictorial from './eventPictorial';
import EventCard from './eventCard';
import MentorPictorial from './mentorPictorial';
import NavBar from '../navbar';
import Footer from '../footer';

// Interfaces

// Stylesheet
import './main.scss';

// Mock data
import picMocks from '../../mocks/pictorial.mocks';
import eventMocks from '../../mocks/event.mocks';
import mentorMocks from '../../mocks/mentor.mocks';
import Heading from '../shared/heading';
import { useNewsList } from '../hooks/news';


export interface MainProps {
}

const Main: FunctionComponent<MainProps> = (props) => {
    // 处理向下滚动一屏的事件
    const handleScrollDownClick = useCallback(() => { window.scroll({ top: window.innerHeight, behavior: 'smooth' }); }, []);

    // 中心简介DOM node ref
    const overviewPurposeNodeRef = useRef<HTMLDivElement>(null);
    // 中心资源DOM node ref
    const overviewResourcesNodeRef = useRef<HTMLDivElement>(null);

    // 香蕉检测动画
    useIntersetionObserver([overviewPurposeNodeRef, overviewResourcesNodeRef],
        (entries, inOb) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('main--elem--visible');
                inOb.unobserve(entry.target);
            });
        });

    //* 导航栏样式及收起判定
    const carouselNodeRef = useRef<HTMLDivElement>(null);
    // 当前视图区顶部处于首屏内还是外部
    const isWithinSplash = useRef<boolean>(false);
    // 此前滚动位置
    const lastScrollY = useRef<number>(window.scrollY);

    const navbarNodeRef = useRef<HTMLElement>(null);
    const isNavbarWithinSplash = useRef<boolean>(true);

    // 处理导航栏样式改变事件
    const handleScrollThroughSplash = useCallback((isTopWithinSplash: boolean) => {
        if (isNavbarWithinSplash.current !== isTopWithinSplash) {
            navbarNodeRef.current.classList.toggle('navbar--outof-splash');
            navbarNodeRef.current.classList.toggle('navbar--within-splash');
        }
        isNavbarWithinSplash.current = isTopWithinSplash;
    }, []);

    const handleSwitchNavbarVisibility = useCallback((shouldVisible) => {
        navbarNodeRef.current.style.transform = shouldVisible ? 'none' : 'translate(0,-100%)';
    }, []);

    // 处理滚屏事件（在首屏前后切换导航栏样式）
    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > carouselNodeRef.current.offsetHeight) {  // 当前已滚动超过首屏
                if (isWithinSplash.current) // 之前在首屏内
                    handleScrollThroughSplash(false);
                isWithinSplash.current = false;
                // 下滑时收起导航栏，上滑时显示导航栏
                if (window.scrollY > lastScrollY.current) handleSwitchNavbarVisibility(false);
                else handleSwitchNavbarVisibility(true);
            } else {    // 当前还在首屏内
                if (isWithinSplash.current) //之前在首屏外
                    handleScrollThroughSplash(true);
                isWithinSplash.current = true;
            }
            lastScrollY.current = window.scrollY;
        };
        window.addEventListener('scroll', scrollListener);
        // 对导航栏的初始样式进行判断
        if (window.scrollY > carouselNodeRef.current.offsetHeight) handleScrollThroughSplash(false);
        else handleScrollThroughSplash(true);

        // 当组件unmount时清理listener
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, [handleScrollThroughSplash, handleSwitchNavbarVisibility]); // 该effect仅在首次渲染后触发

    // 请求新闻数据
    const news = useNewsList({ limit: 6 });

    return (
        <div className='main'>
            <NavBar innerRef={navbarNodeRef} className='navbar--within-splash' />
            {/* 首屏轮播图 */}
            <div className='main--carousel' ref={carouselNodeRef}>
                <Carousel autoplay={true} effect='fade' autoplaySpeed={5000}
                    dots={{ className: 'main--carousel--dots' }}
                    lazyLoad='progressive'>{
                        picMocks.map((elem) => (
                            <SplashPictorial className='main--carousel--splash' key={elem.id} {...elem} />))}
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
                    <Col xl={10} lg={12} md={24} className='main--overview--purpose' ref={overviewPurposeNodeRef}>
                        <ClubPurpose />
                    </Col>
                    {/* 中心资源详情区 */}
                    <Col xl={14} lg={12} md={24} className='main--overview--resources' ref={overviewResourcesNodeRef} >
                        <ClubResources />
                    </Col>
                </Row>
                {/* 新闻板块 */}
                <section className='main--news main--section' id='news'>
                    <Heading justify='center'>
                        <Text id='rs' />
                        <span className='main--section--heading--plus'>+</span>
                        <Text id='news' />
                    </Heading>
                    <Row className='main--news--row'>{
                        news.map((elem, idx) => (
                            <Col xl={8} lg={12} md={12} sm={24} key={elem.id} className='main--news--col'>
                                <NewsPictorial className='main--news--col--news-pic' {...elem}
                                    transitionDelay={idx * 100} />
                            </Col>
                        ))
                    }</Row>
                </section>
                {/* 活动板块 */}
                <section className='main--events main--section' id='events'>
                    <Heading justify='center'>
                        <Text id='rs' />
                        <span className='main--section--heading--plus'>+</span>
                        <Text id='events' />
                    </Heading>
                    <Row className='main--events--row'>
                        <Col xl={12} lg={12} md={24} sm={24} className='main--events--col'>
                            <EventPictorial {...eventMocks[0]} className='main--events--pic' />
                        </Col>
                        <Col xl={6} lg={6} md={12} sm={12} className='main--events--col'>
                            <EventCard {...eventMocks[1]} className='main--events--card' />
                        </Col>
                        <Col xl={6} lg={6} md={12} sm={12} className='main--events--col'>
                            <EventCard {...eventMocks[2]} className='main--events--card' />
                        </Col>
                    </Row>
                </section>
                {/* 导师板块和成员板块 */}
                <Row className='main--mentors-and-members'>
                    <Col xl={12} lg={24}>
                        <section className='main--mentors main--section'>
                            <Heading className='main--mentors--heading'>
                                <Text id='rs' />
                                <span className='main--section--heading--plus'>+</span>
                                <Text id='mentors' />
                            </Heading>
                            <Row className='main--mentors--row'>{
                                mentorMocks.map((elem, idx) => (
                                    <Col xl={12} lg={12} md={12} sm={24} key={elem.id} className='main--mentors--row--col'>
                                        <MentorPictorial transitionDelay={idx * 100}
                                            className='main--mentors--row--col--pic' {...elem} />
                                    </Col>))
                            }</Row>
                        </section>
                    </Col>
                    <Col xl={12} lg={24}>
                        <section className='main--members main--section'>
                            <Heading className='main--members--heading'>
                                <Text id='rs' />
                                <span className='main--section--heading--plus'>+</span>
                                <Text id='members' />
                            </Heading>
                        </section>
                    </Col>
                </Row>
                {/* 页尾 */}
                <Footer />
            </div>
        </div >
    );
};

export default Main;