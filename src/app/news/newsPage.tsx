import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useNews, useNewsList } from '../hooks/news';
import remarkGfm from 'remark-gfm';

// Components
import Container from '../shared/container';
import { FormattedDate, FormattedMessage } from 'react-intl'; import { Col, Row } from 'antd';
import ReactMarkdown from 'react-markdown';
import ShareBar from './shareBar';
import Button from '../shared/button';
import { IconMoreArrow } from '../shared/icons';
import NewsCard from './newsCard';

// Interfaces

// Stylesheet
import './newsPage.scss';
import { breakPoints } from '../utils/responsive';
import { getAbsoluteBoundingRect, getComputerStyleValues } from '../utils/style';
import { useThrottleSync } from '../hooks/d&t';

export interface NewsPageProps {
}

const NewsPage: FunctionComponent<NewsPageProps> = (props) => {

    const [expanded, setExpanded] = useState<boolean>(false);

    // 更多新闻的Col和wrapper
    const moreNodeRef = useRef<HTMLDivElement>(null);
    const moreWrapperNodeRef = useRef<HTMLDivElement>(null);

    const transfromMoreWrapper = useThrottleSync<(offset: number) => void>((offset) => {
        moreWrapperNodeRef.current.style.transform = `translate(0, ${Math.floor(offset)}px)`;
    }, 5);

    const newsId = useParams().newsId;
    const news = useNews(newsId, !expanded);
    const { content, imgUrl, publishTime, title, author } = news;

    const moreNews = useNewsList({ excludeIds: [newsId], limit: 10 });

    // 处理查看更多单击事件
    const handleShowMore = useCallback(() => {
        setExpanded(true);
        window.scrollBy(0, 1);  // 激活滚动事件，重新计算更多新闻滚动位置
    }, []);

    const newsContentMd = useMemo(() => (
        <ReactMarkdown skipHtml={true} remarkPlugins={[
            [remarkGfm]
        ]}
            className='news-page--news--markdown' >
            {content}
        </ReactMarkdown >
    ), [expanded, content]);    // eslint-disable-line

    // 首次渲染触发
    useEffect(() => {
        // 首次渲染时滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 非同步滚动的更多新闻区域
        const scrollListener = () => {
            // 确定是否处于medium及以下
            if (window.innerWidth < breakPoints.large) return;

            const moreNode = moreNodeRef.current;
            const wrapperNode = moreWrapperNodeRef.current;

            // 计算更多新闻列的内容区顶部、底部位置和宽度
            const [moreNodePaddingTop, moreNodePaddingBottom] = getComputerStyleValues(['padding-top', 'padding-bottom'], moreNode);
            const { top: moreTop, bottom: moreBottom, } = getAbsoluteBoundingRect(moreNode);
            const moreContentTop = moreTop + moreNodePaddingTop;
            const moreContentBottom = moreBottom - moreNodePaddingBottom;
            const moreContentHeight = moreContentBottom - moreContentTop;

            const scrollY = window.scrollY;
            const innerHeight = window.innerHeight;

            // 计算偏移量
            const wrapperHeight = wrapperNode.offsetHeight;
            let wrapperTransformY = 0;
            if (scrollY <= moreContentTop) wrapperTransformY = 0;
            else if (scrollY >= moreContentBottom - innerHeight) wrapperTransformY = moreContentHeight - wrapperHeight;
            else wrapperTransformY = (scrollY - moreContentTop) / (moreContentHeight - innerHeight) * (moreContentHeight - wrapperHeight);

            transfromMoreWrapper(wrapperTransformY);
        }
        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, [newsId, transfromMoreWrapper]);

    return (
        <div className='news-page'>
            <img className='news-page--bg'
                src={imgUrl} alt={require('../../assets/image-fallback.svg')} />
            <Row className='news-page--main'>
                <Col xl={16} lg={16} md={24} sm={24} xs={24} className='news-page--news container'>
                    {/* 分享栏 */}
                    <ShareBar className='news-page--news--share-bar--docked' direction='column' />
                    {/* 新闻主内容栏 */}
                    <div className='news-page--news--content'>
                        {/* 新闻文章标题 */}
                        <div className='news-page--news--heading'>{title}</div>
                        {/* 新闻发布时间、作者 */}
                        <Container className='news-page--news--info'>
                            <span>
                                <FormattedDate value={publishTime}
                                    year='numeric' month='short' day='2-digit' />
                            </span>
                            <Container justify='end' style={{ flex: '1' }}>
                                <span><FormattedMessage id='newsPage.author' /></span>
                                <span>{author}</span>
                            </Container>
                        </Container>
                        {/* 分享栏「仅在large以下出现」 */}
                        <ShareBar justify='end' align='start' type='solid' className='news-page--news--share-bar--inline' />
                        {/* 新闻文章内容 */}
                        {newsContentMd}
                        {/* 查看更多 */}
                        <Button onClick={handleShowMore} style={{ display: expanded ? 'none' : null }}
                            type='hollow' className='news-page--news--more-btn'>
                            <div><FormattedMessage id='newsPage.more' /></div>
                            <IconMoreArrow />
                        </Button>
                    </div>
                </Col>
                {/* 其他新闻 */}
                <Col xl={8} lg={8} md={24} sm={24} xs={24} className='news-page--more' ref={moreNodeRef}>
                    <div className='news-page--more-wrapper' ref={moreWrapperNodeRef}>{
                        moreNews.map((elem) => (
                            <NewsCard key={elem.id} {...elem} className='news-page--more--card' />
                        ))
                    }</div>
                </Col>
            </Row>
        </div>
    );
};

export default NewsPage;