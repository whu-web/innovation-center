/**
 * * 响应式相关的通用配置
 * @author shepard
 */

interface Gutter {
    xxl?: number;
    xl: number,
    lg: number,
    md: number,
    sm: number,
    xs: number,
}

export const responsiveGutter3: Gutter = { xl: 40, lg: 32, md: 28, sm: 24, xs: 15 };
export const responsiveGutter4: Gutter = { xl: 32, lg: 26, md: 20, sm: 20, xs: 14 };
export const responsiveGutter33211: Gutter = { xl: 40, lg: 32, md: 40, sm: 0, xs: 0 };
export const responsiveGutter44221: Gutter = { xl: 32, lg: 26, md: 32, sm: 26, xs: 0 };
export const responsiveGutter22211: Gutter = { xl: 48, lg: 40, md: 0, sm: 0, xs: 0 };

export const breakPoints = {
    small: 576,
    medium: 768,
    large: 992,
    xlarge: 1200,
    xxlarge: 1400
}