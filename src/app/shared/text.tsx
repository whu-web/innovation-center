/**
 * * 图标文字
 * 图标为可选项
 * 1. 带有图标时，外层会被封装一层Container，此时className会被赋给外层Container
 * 2. 不带图标时，该组件等同于span
 * 
 * @author shepard
 */

import React, { ReactNode, FunctionComponent, CSSProperties } from 'react';

// Components
import { FormattedMessage } from 'react-intl';
import Container from './container';

// Interfaces
import { ContainerProps } from './container';
import { Props as FormattedMessageProps } from 'react-intl/lib/src/components/message';

export interface IconTextProps extends
    Omit<FormattedMessageProps, 'chilren'>,
    Omit<ContainerProps, 'className' | 'children'> {
    className?: string; // The className of the container
    textClass?: string; // The className of the span element
    icon?: ReactNode;   // Icon. if null, Container will not be rendered
    style?: CSSProperties
    textStyle?: CSSProperties,
}

const Text: FunctionComponent<IconTextProps> = (props) => {
    const { className, textClass, icon, style, textStyle, justify, align, direction, innerRef, ...msgProps } = props;

    const textFinalClass = icon ? textClass : textClass || className;
    const textFinalStyle = icon ? textStyle : textStyle || style;
    const textComponent = (<span className={textFinalClass} style={textFinalStyle} ref={icon ? null : innerRef}>
        <FormattedMessage {...msgProps} />
    </span >);


    return icon ? (
        <Container className={className} justify={justify}
            align={align} direction={direction} innerRef={innerRef}>
            {icon}
            {textComponent}
        </Container>
    ) : textComponent;
};

export default Text;