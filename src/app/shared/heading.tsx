import React, { FunctionComponent } from 'react';

// Components
import Container from './container';

// Interfaces
import { ContainerProps } from './container';

// Stylesheet
import './heading.scss';

export interface HeadingProps extends ContainerProps {
    className?: string;
}

const Heading: FunctionComponent<HeadingProps> = (props) => {
    const { className, children, ...containerProps } = props;

    return (
        <Container className={`heading ${className || ''}`} {...containerProps}>
            {children}
        </Container>
    );
};

export default Heading;