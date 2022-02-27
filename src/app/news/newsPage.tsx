import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
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

export interface NewsPageProps {
}

const NewsPage: FunctionComponent<NewsPageProps> = (props) => {

    const [expanded, setExpanded] = useState<boolean>(false);

    const newsId = useParams().newsId;
    const news = useNews(newsId, !expanded);
    const { content, imgUrl, publishTime, title, author } = news;

    const moreNews = useNewsList({ excludeIds: [newsId], limit: 10 });
    // 处理查看更多单击时间
    const handleShowMore = useCallback(() => {
        setExpanded(true);
    }, []);

    const newsContentMd = useMemo(() => (
        <ReactMarkdown skipHtml={true} remarkPlugins={[
            [remarkGfm]
        ]}
            className='news-page--news--markdown' >
            {content}
        </ReactMarkdown >
    ), [expanded]);

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
                <Col xl={8} lg={8} md={24} sm={24} xs={24} className='news-page--more'>{
                    moreNews.map((elem) => (
                        <NewsCard key={elem.id} {...elem} className='news-page--more--card' />
                    ))
                }</Col>
            </Row>
        </div>
    );
};

export default NewsPage;