import React, { FunctionComponent } from 'react';

// Components
import Container from '../shared/container';
import Text from '../shared/text';
import { FormattedMessage } from 'react-intl';

// Interfaces

// Stylesheet
import './clubPurpose.scss';

export interface ClubPurposeProps {
    innerRef?: React.LegacyRef<HTMLDivElement>;
    className?: string;
}

const ClubPurpose: FunctionComponent<ClubPurposeProps> = (props) => {
    const { innerRef, className } = props;

    return (
        <Container direction='column' justify='center' innerRef={innerRef}
            className={`purpose ${className || ''}`}>
            <Text id='rsClub' className='purpose--title' />
            <div className='purpose--sep-line' />
            <Text id='clubOverview' className='purpose--descrip' />
            <Text id='clubFunction' className='purpose--function-heading' />
            <ol className='purpose--functions'>
                {Array(6).fill(0).map((e, idx) => (
                    <li className='purpose--functions--item' key={idx}>
                        <FormattedMessage id={`clubFunction${idx}`} />
                    </li>
                ))}
            </ol>
        </Container>
    );
};

export default ClubPurpose;