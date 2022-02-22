/**
 * * 一些被封装的共享逻辑
 * @author shepard
 */

import { MutableRefObject, useEffect, useContext } from "react";

/**
 * 香蕉检测钩子
 * @param target 检测对象
 * @param cb 检测状态改变回调函数
 * @param threshold 检测阈值，默认为0.1
 */
export function useIntersetionObserver(
    target: MutableRefObject<HTMLElement>[] | MutableRefObject<HTMLElement>,
    cb: IntersectionObserverCallback,
    disabled?: boolean,
    threshold?: number,
) {
    // 控制香蕉过渡动画
    useEffect(() => {
        if (!target || disabled === true) return;
        const inOb = new IntersectionObserver(cb, { threshold: threshold || 0.1 });
        for (const nodeRef of Array.isArray(target) ? target : [target])
            inOb.observe(nodeRef.current);

        // 清理此前的检测器
        return () => inOb.disconnect();
    }, [target, disabled]); // eslint-disable-line
}

/**
 * 一次性香蕉检测过渡动画钩子
 * @param target 检测对象
 * @param toggleClass 与目标香蕉时toggle的CSS类
 * @param transitionDelay 过渡延迟时间
 */
export function useTransition(
    target: MutableRefObject<HTMLElement>[] | MutableRefObject<HTMLElement>,
    classToRemove: string,
    disabled?: boolean,
    transitionDelay?: number
) {
    useIntersetionObserver(target, (entries, inOb) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) return;
            setTimeout(() => {
                entry.target.classList.remove(classToRemove);
                inOb.unobserve(entry.target);
            }, transitionDelay ? transitionDelay : 0);
        }
    }, disabled);
}

//* 颜色主题狗子
import themeCtx from "../contexts/theme";
export function useTheme() {
    return useContext(themeCtx);
}