import React, { FunctionComponent } from 'react';
import Pictorial from '../shared/pictorial';

// Components
import Container from '../shared/container';
import Text from '../shared/text';
import Tag from '../shared/tag';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { IconArrowRight } from '../shared/icons';
import { Link } from 'react-router-dom';

// Interfaces
import { NewsType } from '../../types';

// Stylesheet
import './newsPictorial.scss';

export interface NewsPictorialProps extends NewsType {
    className?: string;
    // 香蕉检测过渡动画
    disableTransition?: boolean;
    // 香蕉检测过渡动画延时(ms)
    transitionDelay?: number;
    // 显示新闻类别标签
    showTag?: boolean;
}

const NewsPictorial: FunctionComponent<NewsPictorialProps> = (props) => {
    const {
        imgUrl,
        className,
        title,
        descrip,
        publishTime,
        disableTransition,
        transitionDelay,
        tag,
        showTag,
        id
    } = props;

    return (
        <Pictorial className={`news-pic ${className || ''}`} disableTransition={disableTransition}
            layerClass='news-pic--layer' transitionDelay={transitionDelay} imageClass='news-pic--image'
            imgUrl={imgUrl} imgAlt={title}>
            <Link to={`/news/${id}`} className='news-pic--link-wrapper container-column-end'>
                <p className='news-pic--layer--title text-line-clamp-2'>{title}</p>
                <p className='news-pic--layer--descrip text-line-clamp-3'>{descrip}</p>
                <Container className='news-pic--layer--info'>
                    <span className='news-pic--layer--info--time'>
                        <FormattedDate value={publishTime}
                            year={publishTime.getFullYear() === new Date().getFullYear() ? null : 'numeric'}
                            month='short'
                            day='2-digit' />
                    </span>{showTag === false ? null :
                        (<Container className='news-pic--layer--info--tag' justify='end'>
                            <Tag color='blue'>
                                <FormattedMessage id={`newsPic.tag.${tag}`} />
                            </Tag>
                        </Container>)
                    }
                </Container>
                <Container className='news-pic--layer--more-wrapper' justify='end'>
                    <Text id='newsPic.more' icon={<IconArrowRight />}
                        direction='row-reverse' className='news-pic--layer--more' />
                </Container>
            </Link>
        </Pictorial >
    );
};

export default NewsPictorial;