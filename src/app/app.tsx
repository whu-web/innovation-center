import React, { useState, FunctionComponent, useMemo, useCallback, useEffect } from 'react';
import themeCtx from './contexts/theme';
import localeCtx from './contexts/locale';

// Components
import { IntlProvider } from 'react-intl';
import { Outlet } from 'react-router-dom';

// Messages
import en from '../i18n/en';
import zhCN from '../i18n/zh-CN';
import zhHK from '../i18n/zh-HK';
import { Locale } from '../types';

// Interfaces

// Stylesheet
import './app.scss';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';

export interface AppProps { // eslint-disable-line

}

// 支持的语言/地区
const availableLocales: Locale[] = ['en', 'zh-CN', 'zh-HK'];

const App: FunctionComponent<AppProps> = (props) => { // eslint-disable-line
    const [locale, setLocale] = useState<Locale>((availableLocales.includes(navigator.language as Locale) ? navigator.language : 'zh-CN') as Locale);
    const [theme, setTheme] = useState<'light' | 'dark'>(getCurrentTheme());

    // 颜色主题
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            setTheme(event.matches ? "dark" : "light");
        });
    });

    // 国际化翻译文本
    const message = useMemo(() => locale2Message(locale), [locale]);

    // 处理由嵌套上下文切换语言/地区的事件
    const handleLocaleChange = useCallback((current: Locale) => {
        setLocale(current);
    }, []);

    return (
        <ErrorBoundary>
            <IntlProvider locale={locale}
                key={locale} messages={message}
                defaultLocale='zh-CN'>
                <localeCtx.Provider value={{ locale, availableLocales, setLocale: handleLocaleChange }}>
                    <themeCtx.Provider value={theme}>
                        {/* 路由出口 */}
                        <Outlet />
                    </themeCtx.Provider>
                </localeCtx.Provider>
            </IntlProvider>
        </ErrorBoundary>
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