import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, HashRouter } from 'react-router-dom';

import 'antd/dist/antd.less';
import './index.scss';

import Main from './app/main/main';
import News from './app/news/news';

import App from './app/app';
import NewsList from './app/news/newsList';
import NewsPage from './app/news/newsPage';

ReactDOM.render(
    <HashRouter basename=''>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/' element={<Main />} />
                <Route path='/news' element={<News />}>
                    <Route path='/news/' element={<NewsList />} />
                    <Route path='/news/:newsId' element={<NewsPage />} />
                </Route>
            </Route>
        </Routes>
    </HashRouter>
    , document.getElementById('root')
);
