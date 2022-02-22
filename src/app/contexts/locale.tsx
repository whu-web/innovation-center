import { createContext } from "react";
import { Locale } from '../../types';

const localeCtx = createContext<{
    locale: Locale,
    setLocale: (current: Locale, before: Locale) => void;
    availableLocales: Locale[];
}>({ locale: 'zh-CN', availableLocales: ['en', 'zh-CN', 'zh-HK'], setLocale: null });

export default localeCtx;