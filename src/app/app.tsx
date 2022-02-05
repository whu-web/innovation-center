import React, { useState, FunctionComponent, useRef, useMemo, useCallback, CSSProperties, useEffect } from 'react';

// Components
import Main from './main/main';
import { IntlProvider } from 'react-intl';
import NavBar from './navbar';

// Messages
import en from '../i18n/en';
import zhCN from '../i18n/zh-CN';
import { Locale } from '../types';

// Interfaces
import { NavBarProps } from './navbar';

// Stylesheet
import './app.scss';

export interface AppProps {

}

// 支持的语言/地区
const availableLocales: Locale[] = ['en', 'zh-CN', 'zh-HK'];

const App: FunctionComponent<AppProps> = (props) => {
    const [locale, setLocale] = useState<Locale>((availableLocales.includes(navigator.language as Locale) ? navigator.language : 'zh-CN') as Locale);

    // 导航栏当前CSS类名
    const [navbarClassName, setNavbarClassName] = useState<string>('app--navbar--within-splash');
    // 导航栏显示控制
    const [showNavbar, setShowNavbar] = useState<boolean>(true);

    const message = useMemo(() => locale2Message(locale), [locale]);

    // 处理语言/地区切换事件
    const handleLocaleChange = useCallback<NavBarProps['onLocaleChange']>((current) => { setLocale(current) }, []);

    // 当前视图区顶部处于首屏内还是外部
    const isWithinSplash = useRef<boolean>(false);
    // 此前滚动位置
    const lastScrollY = useRef<number>(window.scrollY);

    // 处理滚屏事件（在首屏前后切换导航栏样式）
    useEffect(() => {
        window.addEventListener('scroll', (ev) => {
            if (window.scrollY > window.innerHeight) {  // 当前已滚动超过首屏
                if (isWithinSplash.current) // 之前在首屏内
                    setNavbarClassName('app--navbar--outof-splash');
                isWithinSplash.current = false;
                // 下滑时收起导航栏，上滑时显示导航栏
                if (window.scrollY > lastScrollY.current) setShowNavbar(false);
                else setShowNavbar(true);
            } else {    // 当前还在首屏内
                if (isWithinSplash.current) //之前在首屏外
                    setNavbarClassName('app--navbar--within-splash');
                isWithinSplash.current = true;
            }
            lastScrollY.current = window.scrollY;
        })
    }, []); // 该effect仅在首次渲染后触发

    return (
        <IntlProvider locale={locale}
            key={locale} messages={message}
            defaultLocale='zh-CN'>
            <NavBar onLocaleChange={handleLocaleChange} locale={locale}
                availableLocales={availableLocales} className={navbarClassName}
                style={{ transform: showNavbar ? 'none' : 'translate(0,-100%)' }}
                logoAltText={message['rsClub']} />
            <Main />
        </IntlProvider>
    );

};

export default App;

function locale2Message(locale: Locale) {
    switch (locale) {
        case 'en': return en;
        case 'zh-CN': return zhCN;
    }
}