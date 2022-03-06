/**
 * * 标签页面板组件
 * @author shepard
 */
import React, { FunctionComponent, LegacyRef } from 'react';

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
    const { children, className, innerRef, tab, ...otherProps } = props;

    return (
        <div {...otherProps} ref={innerRef} className={`tab-panel ${className || ''}`}>
            {children}
        </div>
    );
};

export default TabPanel;