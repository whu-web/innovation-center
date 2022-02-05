/**
 * * FlexBox容器
 * 默认样式(由class指定):
 * align-items:center;
 * justify-content:flex-start;
 * 如果通过属性指定Container的flex行为，将使用inline-style
 * @author shepard
 */
import React, { FunctionComponent } from 'react';
import './container.scss';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    justify?: 'center' | 'start' | 'end';
    align?: 'center' | 'start' | 'end';
    direction?: 'row' | 'column';
    innerRef?: React.LegacyRef<HTMLDivElement>;
}

const Container: FunctionComponent<ContainerProps> = (props) => {
    const { className, justify, align, children, innerRef, direction, ...otherProps } = props;

    return (
        <div className={`container ${className || ''}`} {...otherProps}
            style={{
                justifyContent: prefixFlex(justify),
                alignItems: prefixFlex(align),
                flexDirection: direction
            }}
            ref={innerRef} >
            {children}
        </div>
    );
};

export default Container;

function prefixFlex(str: string) {
    if (str === 'start' || str === 'end')
        return 'flex-' + str;
    return str;
}