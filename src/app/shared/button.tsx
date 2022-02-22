import React, { FunctionComponent, HTMLAttributes } from 'react';

// Components

// Interfaces

// Stylesheet
import './button.scss';

export interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    type?: 'solid' | 'hollow';
}

const btnCssClassMap: Record<ButtonProps['type'], string> = {
    solid: 'btn-solid',
    hollow: 'btn-hollow'
}
const Button: FunctionComponent<ButtonProps> = (props) => {
    const { className, type, children, ...otherProps } = props;

    return (
        <span className={`btn ${btnCssClassMap[type || 'solid']} ${className || ''}`} {...otherProps}>
            {children}
        </span>
    );
};

export default Button;