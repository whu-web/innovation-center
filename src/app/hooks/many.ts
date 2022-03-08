/**
 * * 一些被封装的共享逻辑
 * @author shepard
 */

import { useEffect, useContext, useRef, useCallback } from "react";
import { DOMAbsRect, getAbsoluteBoundingRect } from "../utils/style";
import _ from 'lodash';

interface InObHookOptions extends IntersectionObserverInit {
    disabled?: boolean;
    [index: string]: any;
}

/**
 * 香蕉检测钩子
 * @param target 检测对象
 * @param options 钩子配置
 */
export function useIntersectionObserver(
    cb: IntersectionObserverCallback,
    options?: InObHookOptions
) {
    options = options || { disabled: false };

    const paramsRef = useRef<{
        cb: IntersectionObserverCallback,
        options: InObHookOptions,
        inOb: IntersectionObserver
    }>({
        cb,
        options,
        inOb: null
    });

    const params = paramsRef.current;

    // 检测变化，决定是否重新初始化香蕉观察者
    const mutated = _.isEqual(options, paramsRef.current);

    // 如果有变化，则应用更改，并更新inOb
    if (mutated || !params.inOb) {
        const { disabled, ...inObInitOptions } = options;
        if (disabled && params.inOb) params.inOb.disconnect();
        Object.assign(params, {
            cb,
            options,
            inOb: disabled ? null : new IntersectionObserver(cb, inObInitOptions)
        });
    }
    return params.inOb;
}

/**
 * 一次性香蕉检测过渡动画钩子
 * @param target 检测对象
 * @param classToRemove 香蕉时移除的CSS类
 * @param disabled 是否停用
 * @param transitionDelay 过渡延迟时间
 */
export function useTransition(
    classToRemove: string,
    disabled?: boolean,
    transitionDelay?: number
) {
    return useIntersectionObserver((entries, inOb) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) return;
            setTimeout(() => {
                entry.target.classList.remove(classToRemove);
                inOb.unobserve(entry.target);
            }, transitionDelay ? transitionDelay : 0);
        }
    }, { disabled });
}

//* 颜色主题狗子
import themeCtx from "../contexts/theme";
import { useThrottle } from "./d&t";
import { cubicBezier } from "../utils/bezier";
export function useTheme() {
    return useContext(themeCtx);
}

/**
 * 滚动动画钩子
 * 
 * 采用规则内容模板字符串替换值，例如transform: scale({},{})，
 * 如果映射函数计算得到的值为0.25，则最终该样式规则为transform: scale(0.25, 0.25)
 * @param ruleName CSS规则名
 * @param ruleValTemplate CSS规则内容模板
 * @param mappingMethod 从scrollOffset映射到CSS规则数值的方法
 * @param direction 滚动方向
 * @param throttle 节流时间(ms)
 * @returns DOM元素Ref
 */
export function useScrollAnimation<T extends HTMLElement>(
    ruleName: string,
    ruleValTemplate: string,
    mappingMethod: (scrollOffset: number, targetRect: DOMAbsRect) => number,
    direction?: 'vertical' | 'horizontal',
    throttle?: number | false,
) {
    direction = direction || 'vertical';
    throttle = throttle || 10;

    const mappingMethodRef = useRef(mappingMethod);
    const targetRef = useRef<T>(null);

    const scrollListener = useCallback(() => {
        const elt = targetRef.current;
        if (!elt) return;

        const ruleVal = mappingMethodRef.current(
            direction === 'horizontal'
                ? window.scrollX
                : window.scrollY
            , getAbsoluteBoundingRect(targetRef.current));

        const ruleValStr = ruleValTemplate.replace(/\{\}/g, ruleVal.toString());
        elt.style.setProperty(ruleName, ruleValStr);
    }, [ruleValTemplate, direction, ruleName]);    // eslint-disable-line

    const optimizedListener = useThrottle(scrollListener, throttle);
    const finalListener = throttle ? optimizedListener : scrollListener;

    useEffect(() => {
        window.addEventListener('scroll', finalListener);
        return () => { window.removeEventListener('scroll', finalListener); }
    }, [ruleName, ruleValTemplate, direction, finalListener]);

    return targetRef;
}

export interface SimpleScrollAnimationOption {
    ruleName: string,   // CSS规则名称
    ruleValTemplate: string,  // CSS规则内容模板
    ruleValMin: number, // CSS规则最小值，在触发滚动动画开始位置时取得
    ruleValMax: number, // CSS规则最大值，在触发滚动动画结束位置时取得
    scrollTrigStartOffsetFromTargetTop: number,  // 目标元素顶部的页面坐标 到 滚动触发动画开始的滚动位置(客户区顶部) 的偏移量
    scrollTrigEndOffsetFromTargetBottom: number,  // 目标元素底部的页面坐标 到 滚动触发动画结束的滚动位置(客户区顶部) 的偏移量
    interpMethod?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out',
    direction?: 'vertical' | 'horizontal',
    throttle?: number | false,
}

/**
 * 简单滚动触发动画钩子
 * 
 * 该钩子为滚动触发动画提供了多种映射函数，并且设定滚动触发的范围。
 * @param options 
 * @returns 
 */
export function useSimpleScrollAnimation<T extends HTMLElement>(
    options: SimpleScrollAnimationOption
) {
    const {
        ruleName,
        ruleValTemplate,
        ruleValMin,
        ruleValMax,
        scrollTrigStartOffsetFromTargetTop,
        scrollTrigEndOffsetFromTargetBottom,
        interpMethod,
        direction,
        throttle
    } = options;

    let interpFunc: ReturnType<typeof cubicBezier> = null;
    switch (interpMethod || 'linear') {
        case 'linear':
            interpFunc = (x: number) => x;
            break;
        case 'ease':
            interpFunc = cubicBezier(0.25, 0.1, 0.25, 1.0);
            break;
        case 'ease-in':
            interpFunc = cubicBezier(0.42, 0, 1.0, 1.0);
            break;
        case 'ease-out':
            interpFunc = cubicBezier(0, 0, 0.58, 1.0);
            break;
        case 'ease-in-out':
            interpFunc = cubicBezier(0.42, 0, 0.58, 1.0);
            break;
    }

    return useScrollAnimation<T>(ruleName, ruleValTemplate, (scrollOffset, targetRect) => {
        const scrollTrigStart = targetRect.top + scrollTrigStartOffsetFromTargetTop;
        const scrollTrigEnd = targetRect.bottom + scrollTrigEndOffsetFromTargetBottom;

        let newRuleVal = ruleValMin;
        if (scrollOffset < scrollTrigStart) newRuleVal = ruleValMin;
        else if (window.scrollY > scrollTrigEnd) newRuleVal = ruleValMax;
        else newRuleVal = interpFunc(
            (scrollOffset - scrollTrigStart) / (scrollTrigEnd - scrollTrigStart))
            * (ruleValMax - ruleValMin) + ruleValMin;
        return newRuleVal;
    }, direction, throttle);
}