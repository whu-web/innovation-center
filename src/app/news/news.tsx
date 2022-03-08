/**
 * * 新闻根路由
 * @author shepard
 */
import { Skeleton } from 'antd';
import React, { FunctionComponent, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import NavBar from '../navbar';
const Footer = React.lazy(() => import('../footer'));

// Interfaces

// Stylesheet
import './news.scss';

export interface NewsProps {

}

const News: FunctionComponent<NewsProps> = (props) => { // eslint-disable-line @typescript-eslint/no-unused-vars

    return (
        <div className='news'>
            <NavBar className='navbar--outof-splash' />
            <Outlet />
            <Suspense fallback={<Skeleton />}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default News;