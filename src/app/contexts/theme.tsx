import { createContext } from "react";

type ColorTheme = 'light' | 'dark';
const themeCtx = createContext<ColorTheme>('light');


export default themeCtx;