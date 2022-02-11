import React, { useState, FunctionComponent, useRef, useMemo, useCallback, useEffect } from 'react';
import themeCtx from './shared/theme';

// Components
import Main, { MainProps } from './main/main';
import { IntlProvider } from 'react-intl';
import NavBar from './navbar';

// Messages
import en from '../i18n/en';
import zhCN from '../i18n/zh-CN';
import zhHK from '../i18n/zh-HK';
import { Locale } from '../types';

// Interfaces
import { NavBarProps } from './navbar';

// Stylesheet
import './app.scss';

export interface AppProps { // eslint-disable-line

}

// 支持的语言/地区
const availableLocales: Locale[] = ['en', 'zh-CN', 'zh-HK'];

const App: FunctionComponent<AppProps> = (props) => { // eslint-disable-line
    const [locale, setLocale] = useState<Locale>((availableLocales.includes(navigator.language as Locale) ? navigator.language : 'zh-CN') as Locale);
    const [theme, setTheme] = useState<'light' | 'dark'>(getCurrentTheme());

    const navbarNodeRef = useRef<HTMLElement>(null);
    const isNavbarWithinSplash = useRef<boolean>(true);

    // 颜色主题
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            setTheme(event.matches ? "dark" : "light");
        });
    });

    // 国际化翻译文本
    const message = useMemo(() => locale2Message(locale), [locale]);

    // 处理语言/地区切换事件
    const handleLocaleChange = useCallback<NavBarProps['onLocaleChange']>((current) => { setLocale(current) }, []);

    // 处理导航栏样式改变事件
    const handleScrollThroughSplash = useCallback<MainProps['onScrollSplash']>((isTopWithinSplash: boolean) => {
        if (isNavbarWithinSplash.current !== isTopWithinSplash) {
            navbarNodeRef.current.classList.toggle('app--navbar--outof-splash');
            navbarNodeRef.current.classList.toggle('app--navbar--within-splash');
        }
        isNavbarWithinSplash.current = isTopWithinSplash;
    }, []);

    const handleSwitchNavbarVisibility = useCallback<MainProps['onSwitchNavbarVisibility']>((shouldVisible) => {
        navbarNodeRef.current.style.transform = shouldVisible ? 'none' : 'translate(0,-100%)';
    }, []);

    return (
        <IntlProvider locale={locale}
            key={locale} messages={message}
            defaultLocale='zh-CN'>
            <themeCtx.Provider value={theme}>
                <NavBar onLocaleChange={handleLocaleChange} locale={locale} innerRef={navbarNodeRef}
                    availableLocales={availableLocales} className='app--navbar--within-splash' />
                <Main onScrollSplash={handleScrollThroughSplash} onSwitchNavbarVisibility={handleSwitchNavbarVisibility} />
            </themeCtx.Provider>
        </IntlProvider>
    );

};

export default App;

function locale2Message(locale: Locale) {
    switch (locale) {
        case 'en': return en;
        case 'zh-CN': return zhCN;
        case 'zh-HK': return zhHK
    }
}

function getCurrentTheme(): 'light' | 'dark' {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        return 'dark';
    return 'light';
}