/**
 * * 标签页面板组件
 * @author shepard
 */
import React, { useState, FunctionComponent, LegacyRef } from 'react';

// Components

// Interfaces

// Stylesheet
import './tabPanel.scss';

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    tab: React.ReactNode;
    className?: string;
    innerRef?: LegacyRef<HTMLDivElement>;
}

const TabPanel: FunctionComponent<TabPanelProps> = (props) => {
    const { children, tab, className, innerRef, ...otherProps } = props;

    return (
        <div {...otherProps} ref={innerRef} className={`tab-panel ${className || ''}`}>
            {children}
        </div>
    );
};

export default TabPanel;