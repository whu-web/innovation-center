/**
 * * 新闻列表页面
 * @author shepard
 */
import React, { FunctionComponent, useEffect } from 'react';
import { useNewsList } from '../hooks/news';
import { responsiveGutter22211, responsiveGutter3, responsiveGutter33211 } from '../utils/responsive';

// Components
import Text from '../shared/text';
import Heading from '../shared/heading';
import SectionHeading from './sectionHeading';
import { Row, Col } from 'antd';
import NewsPictorial from './newsPictorial';
import NewsCard from './newsCard';
import Button from '../shared/button';
import { FormattedMessage } from 'react-intl';
import Container from '../shared/container';

// Interfaces
import { NewsType } from '../../types';

// Stylesheet
import './newsList.scss';

export interface NewsListProps {
}


const NewsList: FunctionComponent<NewsListProps> = (props) => {

    const competitionNews = useNewsList({ tag: 'competition', limit: 6 });
    const researchNews = useNewsList({ tag: 'research', limit: 4 });
    const centerNews = useNewsList({ tag: 'center', limit: 2 });
    const moreNews = useNewsList({ limit: 8, excludeIds: getIdsFromNewsArray(competitionNews, researchNews, centerNews) });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className='news-list'>
            <Heading className='news-list--heading' justify='center'>
                <Text id='newsList.heading' />
            </Heading>
            <section className='news-list--section'>
                {/* 学科竞赛新闻 */}
                <SectionHeading msgId='newsList.competition' showMoreBtn />
                <Row gutter={responsiveGutter33211}>{
                    competitionNews.map(elem => (
                        <Col xl={8} lg={12} md={12} sm={24} xs={24} key={elem.id} className='news-list--pic-col'>
                            <NewsPictorial className='news-list--pic' showTag={false} {...elem} />
                        </Col>
                    ))
                }</Row>
                <Button className='news-list--section--more-btn'>
                    <FormattedMessage id='newsList.more__news' values={{
                        tag: <FormattedMessage id='newsList.competition' />
                    }} />
                </Button>
            </section>
            <Row gutter={responsiveGutter33211}>
                {/* 学术科研新闻 */}
                <Col xl={16} lg={24} md={24} sm={24} xs={24} className='news-list--section'>
                    <SectionHeading msgId='newsList.research' showMoreBtn />
                    <Row gutter={responsiveGutter33211}>{
                        researchNews.map(elem => (
                            <Col xl={12} lg={12} md={12} sm={24} xs={24} key={elem.id} className='news-list--pic-col'>
                                <NewsPictorial className='news-list--pic' showTag={false} {...elem} />
                            </Col>
                        ))
                    }</Row>
                    <Button className='news-list--section--more-btn'>
                        <FormattedMessage id='newsList.more__news' values={{
                            tag: <FormattedMessage id='newsList.research' />
                        }} />
                    </Button>
                </Col>
                {/* 中心建设新闻 */}
                <Col xl={8} lg={24} md={24} sm={24} xs={24} className='news-list--section'>
                    <SectionHeading msgId='newsList.center' showMoreBtn />
                    <Row gutter={responsiveGutter33211}>{
                        centerNews.map(elem => (
                            <Col xl={24} lg={12} md={12} sm={24} xs={24} key={elem.id} className='news-list--pic-col'>
                                <NewsPictorial className='news-list--pic' showTag={false} {...elem} />
                            </Col>
                        ))
                    }</Row>
                    <Button className='news-list--section--more-btn'>
                        <FormattedMessage id='newsList.more__news' values={{
                            tag: <FormattedMessage id='newsList.center' />
                        }} />
                    </Button>
                </Col>
            </Row>
            {/* 更多新闻 */}
            <Row className='news-list--section news-list--section-more' gutter={responsiveGutter22211}>{
                moreNews.map((elem) => (
                    <Col xl={12} lg={12} md={24} sm={24} xs={24} key={elem.id} className='news-list--card-col'>
                        <NewsCard className='news-list--card' {...elem} />
                    </Col>
                ))
            }</Row>
            <Container justify='end' className='news-list--section-more--more-btn-wrapper'>
                <Button className='news-list--section-more--more-btn'>
                    <FormattedMessage id='newsList.more' />
                </Button>
            </Container>
        </div >

    );
};

export default NewsList;

function getIdsFromNewsArray(...newsArrays: NewsType[][]) {
    const ids: string[] = [];
    for (const newsArray of newsArrays) {
        ids.concat(newsArray.map(elem => elem.id));
    }
    return ids;
}