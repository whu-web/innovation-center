import React, { FunctionComponent } from 'react';

// Components
import Container from './container';

// Interfaces
import { ContainerProps } from './container';

// Stylesheet
import './subHeading.scss';

export interface SubHeadingProps extends ContainerProps {
    className?: string;
}

const SubHeading: FunctionComponent<SubHeadingProps> = (props) => {
    const { className, children, ...containerProps } = props;

    return (
        <Container className={`sub-heading ${className || ''}`} {...containerProps}>
            {children}
        </Container>
    );
};

export default SubHeading;