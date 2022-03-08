/**
 * *标签组件
 * @author shepard
 */
import React, { FunctionComponent } from 'react';
import Container from './container';

// Stylesheet
import './tag.scss';

type TagColor =
    'white'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'black'
    | 'gray'
    | 'megenta';
export interface TagProps {
    color?: TagColor;
    className?: string;
}

const colorMap: Record<TagColor, { backgroundColor: string, color: string }> = {
    'white': { backgroundColor: '#ffffff', color: '#3f3f3f' },
    'red': { backgroundColor: '#ec4242', color: 'white' },
    'orange': { backgroundColor: '#ea9f4d', color: 'white' },
    'yellow': { backgroundColor: '#f4cf0d', color: 'white' },
    'green': { backgroundColor: '#4dd01c', color: 'white' },
    'blue': { backgroundColor: 'var(--clr-blue-u)', color: 'white' },
    'purple': { backgroundColor: '#b841da', color: 'white' },
    'black': { backgroundColor: 'black', color: 'white' },
    'megenta': { backgroundColor: 'var(--clr-megenta-u)', color: 'white' },
    'gray': { backgroundColor: '#2f2f2f', color: 'white' }
}

const Tag: FunctionComponent<TagProps> = (props) => {
    const {
        color,
        className,
        children,
    } = props;

    return (
        <Container style={{ ...colorMap[color] }}
            className={`tag ${className || ''}`}>
            {children}
        </Container>
    );
};

export default Tag;