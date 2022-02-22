/**
 * * 新闻根路由
 * @author shepard
 */
import React, { useState, FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import Footer from '../footer';
import NavBar from '../navbar';

// Interfaces

// Stylesheet
import './news.scss';

export interface NewsProps {

}

const News: FunctionComponent<NewsProps> = (props) => {

    return (
        <div className='news'>
            <NavBar className='navbar--outof-splash' />
            <Outlet />
            <Footer />
        </div>
    );
};

export default News;