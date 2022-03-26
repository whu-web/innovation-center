/**
 * *和样式相关的函数
 * @author shepard
 */

export function getComputerStyleValues(styleNames: string[], elt: Element, pseudoElt?: string) {
    const computedStyles = getComputedStyle(elt, pseudoElt);
    if (!computedStyles) throw new Error(`Unable to get computed styles of ${elt}${pseudoElt ? ':' + pseudoElt : ''}`);
    return styleNames.map((style) => Number.parseFloat(computedStyles.getPropertyValue(style)));
}

/**
 * 获取元素在页面中的绝对位置矩形。
 * 
 * 坐标起始处位于文档的左上角点
 * @param elt 元素
 * @returns DOMAbsRect
 */
export function getAbsoluteBoundingRect(elt: Element) {
    if (!elt) return;
    const rect = elt.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX,
        height: rect.height,
        width: rect.width,
    };
}

export type DOMAbsRect = ReturnType<typeof getAbsoluteBoundingRect>;