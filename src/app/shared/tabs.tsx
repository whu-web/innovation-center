/**
 * * 多标签页组件
 * 该组件用来替换antd中的Tabs组件，因其无法满足设计要求
 * @author shepard
 */

import React, { useState, useMemo, FunctionComponent, ReactElement, useCallback, LegacyRef, Key } from 'react';

// Components

// Interfaces
import { TabPanelProps } from './tabPanel';

// Stylesheet
import './tabs.scss';

interface TabIdentifier { idx: number, key: Key }
export interface TabsProps {
    className?: string;
    children?: ReactElement<TabPanelProps>[] | ReactElement<TabPanelProps>;
    tabNavClass?: string;

    tabWrapperClass?: string;
    activeTabWrapperClass?: string;

    contentWrapperClass?: string;

    defaultActiveIdx?: number;
    innerRef?: LegacyRef<HTMLDivElement>;
    /**
     * 激活的页签改变时回调，可通过返回值控制是否完成切换
     * @param current   当前页签
     * @param before    此前激活的页签
     * @returns boolean 是否进行切换
     */
    onActiveChange?: (current: { idx: number, key: Key }, before: { idx: number, key: Key }) => boolean;
}

const Tabs: FunctionComponent<TabsProps> = (props) => {
    const {
        className,
        tabNavClass,
        children,
        defaultActiveIdx,
        innerRef,
        onActiveChange,
        tabWrapperClass,
        contentWrapperClass,
        activeTabWrapperClass,
    } = props;

    // 获取数组化的children
    const tabPanels: React.ReactElement<TabPanelProps>[] = useMemo(() =>
        Array.isArray(children) ? children : [children]
        , [children]
    );

    const validDefaultIdx = defaultActiveIdx ? defaultActiveIdx : 0;
    const [activeTab, setActiveTab] = useState<TabIdentifier>({
        idx: validDefaultIdx,
        key: validDefaultIdx < tabPanels.length
            ? tabPanels[validDefaultIdx]?.key
            : null
    });

    // 切换激活页签事件处理
    const handleClickTabWrapper = useCallback((which: TabIdentifier) => {
        if (onActiveChange && !onActiveChange(which, activeTab)) return;
        setActiveTab(which);
    }, [activeTab, onActiveChange]);

    // 从TabPanel的props中收集页签
    const tabList: React.ReactNode[] = useMemo(() =>
        tabPanels.map((panel, idx) => (
            <div className={`tabs--tab-nav--tab-wrapper ${activeTab.idx === idx ? activeTabWrapperClass || '' : ''} ${tabWrapperClass || ''}`}
                key={panel?.key}
                onClick={() => { handleClickTabWrapper({ idx, key: panel?.key }); }}>
                {panel?.props.tab}
            </div>
        )), [tabPanels, handleClickTabWrapper, tabWrapperClass, activeTabWrapperClass, activeTab]);

    // 防止children越界
    const validActiveTabIdx = useMemo(() => {
        const len = tabPanels.length;
        if (activeTab.idx < len) return activeTab.idx;
        if (defaultActiveIdx < len) return defaultActiveIdx;
        return len === 0 ? null : 0;
    }, [activeTab, defaultActiveIdx, tabPanels]);

    return (
        <div className={`tabs container-column-center ${className || ''} `} ref={innerRef}>
            <div className={`tabs--tab-nav container-center ${tabNavClass || ''} `}>
                {tabList}
            </div>
            <div className={`tabs--content-wrapper ${contentWrapperClass || ''}`}>
                {validActiveTabIdx !== null ? tabPanels[validActiveTabIdx] : null}
            </div>
        </div >
    );
};

export default Tabs;