import React, { useRef, FunctionComponent, useCallback, useEffect, Suspense, } from 'react';
import { SimpleScrollAnimationOption, useIntersectionObserver, useSimpleScrollAnimation } from '../hooks/many';
import { useNewsList } from '../hooks/news';
import { responsiveGutter33211, responsiveGutter44221 } from '../utils/responsive';
import { useDebounce } from '../hooks/d&t';

// Components
import { Col, Row, Carousel, Skeleton } from 'antd';
import { IconDown } from '../shared/icons';
import Container from '../shared/container';
import AnimatedHeading from './animatedHeading';
import NavBar from '../navbar';

const SplashPictorial = React.lazy(() => import('./splashPictorial'));
const ClubPurpose = React.lazy(() => import('./clubPurpose'));
const ClubResources = React.lazy(() => import('./clubResources'));
const NewsPictorial = React.lazy(() => import('../news/newsPictorial'));
const EventPictorial = React.lazy(() => import('./eventPictorial'));
const EventCard = React.lazy(() => import('./eventCard'));
const MentorPictorial = React.lazy(() => import('./mentorPictorial'));
const HeadNews = React.lazy(() => import('../news/headNews'));
const MoreMentors = React.lazy(() => import('./moreMentors'));
const MembersVideo = React.lazy(() => import('./membersVideo'));
const Footer = React.lazy(() => import('../footer'));


// Interfaces

// Stylesheet
import './main.scss';

// Mock data
import picMocks from '../../mocks/pictorial.mocks';
import eventMocks from '../../mocks/event.mocks';
import { useMentors } from '../hooks/mentors';

export interface MainProps {
}

//* 板块分割线滚动触发动画配置
const sepLineScrollAnimiationOptions: SimpleScrollAnimationOption = {
    ruleName: 'transform',
    ruleValTemplate: 'scale({}%,100%)',
    ruleValMin: 100,
    ruleValMax: 350,
    scrollTrigStartOffsetFromTargetTop: -window.innerHeight,
    scrollTrigEndOffsetFromTargetBottom: -window.innerHeight / 4,
    interpMethod: 'ease-in-out',
    direction: 'vertical',
    throttle: 10
};

const Main: FunctionComponent<MainProps> = (props) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    // 处理向下滚动一屏的事件
    const handleScrollDownClick = useCallback(() => { window.scroll({ top: window.innerHeight + 1, behavior: 'smooth' }); }, []);

    //* 香蕉检测动画
    // 中心简介DOM node ref
    const overviewPurposeNodeRef = useRef<HTMLDivElement>(null);
    // 中心资源DOM node ref
    const overviewResourcesNodeRef = useRef<HTMLDivElement>(null);

    const inOb = useIntersectionObserver(
        (entries, inOb) => {
            entries.forEach((entry: any) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('main--elem--visible');
                inOb.unobserve(entry.target);
            });
        });
    useEffect(() => {
        [overviewPurposeNodeRef, overviewResourcesNodeRef].
            forEach((elem) => inOb.observe(elem.current));
        return () => inOb.disconnect();
    }, [inOb]);

    //* 滚动触发动画
    const eventSepLineRef = useSimpleScrollAnimation<HTMLDivElement>(sepLineScrollAnimiationOptions);

    //* 导航栏样式及收起判定
    const carouselNodeRef = useRef<HTMLDivElement>(null);
    // 当前视图区顶部处于首屏内还是外部
    const isWithinSplash = useRef<boolean>(false);
    // 此前滚动位置
    const lastScrollY = useRef<number>(window.scrollY);

    const navbarNodeRef = useRef<HTMLElement>(null);
    const isMenuOverlayVisibleRef = useRef<boolean>(false);
    const isNavbarWithinSplash = useRef<boolean>(true);

    const handleMenuOverlayVisibleChange = useCallback((visible: boolean) => {
        isMenuOverlayVisibleRef.current = visible;
    }, []);

    // 处理导航栏样式改变事件
    const handleScrollThroughSplash = useCallback((isTopWithinSplash: boolean) => {
        if (isNavbarWithinSplash.current !== isTopWithinSplash) {
            navbarNodeRef.current.classList.toggle('navbar--outof-splash');
            navbarNodeRef.current.classList.toggle('navbar--within-splash');
        }
        isNavbarWithinSplash.current = isTopWithinSplash;
    }, []);

    // 处理导航栏展开/收起事件
    const isNavbarVisible = useRef<boolean>(true);
    const hideNavbar = useDebounce((shouldVisible: boolean) => {
        if (!shouldVisible && !isMenuOverlayVisibleRef.current) navbarNodeRef.current.style.transform = 'translate(0,-100%)';
    }, 500);
    const handleSwitchNavbarVisibility = useCallback((shouldVisible: boolean) => {
        if (shouldVisible === isNavbarVisible.current) return;
        if (shouldVisible) navbarNodeRef.current.style.transform = 'none';
        hideNavbar(shouldVisible);
        isNavbarVisible.current = shouldVisible;
    }, [hideNavbar]);

    // 处理滚屏事件（在首屏前后切换导航栏样式）
    useEffect(() => {
        const scrollListener = () => {
            if (!carouselNodeRef.current) return;
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
    const [headNews, ...otherNews] = useNewsList({ limit: 5 });
    // 请求导师数据
    const mentors = useMentors();

    return (
        <div className='main'>
            <NavBar className='navbar--within-splash' innerRef={navbarNodeRef}
                onMenuOverlayVisibleChange={handleMenuOverlayVisibleChange} />
            {/* 首屏轮播图 */}
            <div className='main--carousel' ref={carouselNodeRef}>
                <Carousel autoplay={true} effect='fade' autoplaySpeed={5000} accessibility
                    dots={{ className: 'main--carousel--dots' }}
                    lazyLoad='progressive'>{
                        picMocks.map((elem) => (
                            <Suspense fallback={<Skeleton.Image />} key={elem.id}>
                                <SplashPictorial className='main--carousel--splash' {...elem} />
                            </Suspense>
                        ))
                    }
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
                <Row className='main--overview main--section' gutter={{ xl: 48, lg: 36 }}>
                    {/* 中心简介 */}
                    <Col xl={10} lg={12} md={24} className='main--overview--purpose' ref={overviewPurposeNodeRef}>
                        <Suspense fallback={<Skeleton />}>
                            <ClubPurpose />
                        </Suspense>
                    </Col>
                    {/* 中心资源详情区 */}
                    <Col xl={14} lg={12} md={24} className='main--overview--resources' ref={overviewResourcesNodeRef} >
                        <Suspense fallback={<Skeleton />}>
                            <ClubResources />
                        </Suspense>
                    </Col>
                </Row>
                {/* 新闻板块 */}
                <section className='main--news main--section' id='news'>
                    <AnimatedHeading msgId='news' justify='center' className='main--section--heading' />
                    <Suspense fallback={<Skeleton><Skeleton.Image /></Skeleton>}>
                        <HeadNews className='main--news--head-news' {...headNews} />
                    </Suspense>
                    <Row className='main--news--row' gutter={responsiveGutter33211}>{
                        otherNews.map((elem, idx) => (
                            <Col xl={8} lg={8} md={12} sm={24} xs={24} key={elem.id} className='main--news--col'>
                                <Suspense fallback={<Skeleton />}>
                                    <NewsPictorial className='main--news--news-pic' {...elem}
                                        transitionDelay={idx * 100} />
                                </Suspense>
                            </Col>
                        ))
                    }</Row>
                </section>
                {/* 活动板块 */}
                <section className='main--events main--section' id='events'>
                    <AnimatedHeading msgId='events' justify='center' className='main--section--heading' />
                    <div className='main--section--sep-line' ref={eventSepLineRef}></div>
                    <Row className='main--events--row' gutter={{ xl: 36, lg: 32, md: 32, sm: 32, xs: 0 }}>
                        <Col xl={12} lg={12} md={24} sm={24} className='main--events--col'>
                            <Suspense fallback={<Skeleton />}>
                                <EventPictorial {...eventMocks[0]} className='main--events--pic' />
                            </Suspense>
                        </Col>
                        <Col xl={6} lg={6} md={12} sm={12} className='main--events--col'>
                            <Suspense fallback={<Skeleton />}>
                                <EventCard {...eventMocks[1]} className='main--events--card' />
                            </Suspense>
                        </Col>
                        <Col xl={6} lg={6} md={12} sm={12} className='main--events--col'>
                            <Suspense fallback={<Skeleton />}>
                                <EventCard {...eventMocks[2]} className='main--events--card' />
                            </Suspense>
                        </Col>
                    </Row>
                </section>
                {/* 导师板块和成员板块 */}
                <Row className='main--mentors-and-members'>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                        <section className='main--mentors main--section'>
                            <AnimatedHeading msgId='mentors' className='main--section--heading main--mentors--heading' />
                            <Row className='main--mentors--row' gutter={responsiveGutter44221}>{
                                mentors.slice(0, 3).map((elem, idx) => (
                                    <Col xl={12} lg={12} md={12} sm={12} xs={24} key={elem.id} className='main--mentors--col'>
                                        <Suspense fallback={<Skeleton />}>
                                            <MentorPictorial transitionDelay={idx * 100}
                                                className='main--mentors--pic' {...elem} />
                                        </Suspense>
                                    </Col>)
                                )}
                                <Col xl={12} lg={12} md={12} sm={12} xs={24} key={-1} className='main--mentors--col'>
                                    <Suspense fallback={<Skeleton />}>
                                        <MoreMentors mentors={mentors.slice(3)} className='main--mentors--more' />
                                    </Suspense>
                                </Col>
                            </Row>
                        </section>
                    </Col>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                        <section className='main--members main--section'>
                            <AnimatedHeading msgId='members' className='main--section--heading main--members--heading' />
                            <Suspense fallback={<Skeleton.Image />}>
                                <MembersVideo className='main--members--video'
                                    videoUrl={require('../../assets/flash.webm')}
                                    videoUrlAlt={require('../../assets/flash.mp4')} />
                            </Suspense>
                        </section>
                    </Col>
                </Row>
                {/* Footer */}
                <Suspense fallback={<Skeleton />}>
                    <Footer />
                </Suspense>
            </div>
        </div >
    );
};

export default Main;