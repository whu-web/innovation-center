import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, HashRouter } from 'react-router-dom';

// * StyleSheets
import 'antd/dist/antd.less';
import './index.scss';

// * Routed Components

import App from './app/app';
import { Skeleton } from 'antd';
const Main = React.lazy(() => import('./app/main/main'));
const News = React.lazy(() => import('./app/news/news'));
const NewsList = React.lazy(() => import('./app/news/newsList'));
const NewsPage = React.lazy(() => import('./app/news/newsPage'));


const fallback = (<>
    <Skeleton />
    <Skeleton.Image style={{ height: '50vh' }} />
</>);

ReactDOM.render(
    <HashRouter basename=''>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/' element={
                    <Suspense fallback={fallback}>
                        <Main />
                    </Suspense>
                } />
                <Route path='/news' element={<Suspense fallback={fallback}>
                    <News />
                </Suspense>}>
                    <Route path='/news/' element={
                        <Suspense fallback={fallback}>
                            <NewsList />
                        </Suspense>} />
                    <Route path='/news/:newsId' element={
                        <Suspense fallback={fallback}>
                            <NewsPage />
                        </Suspense>} />
                </Route>
            </Route>
        </Routes>
    </HashRouter>
    , document.getElementById('root')
);
