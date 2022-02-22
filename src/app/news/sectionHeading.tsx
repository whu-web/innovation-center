import React, { FunctionComponent } from 'react';

// Components
import SubHeading from '../shared/subHeading';
import Text from '../shared/text';

// Interfaces

// Stylesheet
import './sectionHeading.scss';

export interface SectionHeadingProps {
    msgId: string;
    showMoreBtn?: boolean;
}

const SectionHeading: FunctionComponent<SectionHeadingProps> = (props) => {
    const { msgId, showMoreBtn } = props;

    return (
        <SubHeading className='section-heading' align='center'>
            <Text id={msgId} />
            {showMoreBtn
                ? <>
                    <div className='section-heading--line' />
                    <Text id='newsList.more' className='section-heading--more' />
                </>
                : null
            }
        </SubHeading>
    );
};

export default SectionHeading;