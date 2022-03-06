import React, { useState, FunctionComponent, useRef, useCallback, useEffect } from 'react';

// Components
import Card from '../shared/card';

// Interfaces
import { EventType } from '../../types';

// Stylesheet
import './eventCard.scss';
import Container from '../shared/container';
import { IconLocation, IconTime } from '../shared/icons';
import FormattedDateTimeRangeBrief from '../shared/formattedDateTimeRangeBrief';
import Amap from '../shared/amap';
import { FormattedMessage } from 'react-intl';
import { useIntersectionObserver } from '../hooks/many';

export interface EventCardProps extends Omit<EventType, 'id'> {
    className?: string;
}

const EventCard: FunctionComponent<EventCardProps> = (props) => {
    const {
        title,
        descrip,
        startTime,
        endTime,
        imgUrl,
        location,
        link,
        className,
        lonLat
    } = props;

    const [showMap, setShowMap] = useState(false);
    const [showMapHint, setShowMapHint] = useState(false);

    const contentNodeRef = useRef<HTMLDivElement>(null);
    const mapNodeRef = useRef<HTMLDivElement>(null);
    const locationTextNodeRef = useRef<HTMLDivElement>(null);

    const handleShowMap = useCallback(() => {
        setShowMap(!showMap);
        const transformDelay = 200;
        mapNodeRef.current.classList.toggle('event-card--map--transform');
        setTimeout(() => mapNodeRef.current.classList.toggle('event-card--map--visible'), transformDelay);
        contentNodeRef.current.classList.toggle('event-card--content--hidden');
    }, [showMap]);

    // 香蕉检测特效
    const inOb = useIntersectionObserver((entries, inOb) => {
        const entry = entries[0];
        const animationTime = 6000;
        if (!entry.isIntersecting) return;
        entry.target.classList.add('event-card--content--location--text-animation');
        setTimeout(() => {
            setShowMapHint(true);
            setTimeout(() => {
                setShowMapHint(false);
            }, animationTime / 2);
        }, animationTime / 4);
        inOb.disconnect();
    }, { disabled: false, threshold: 0.9 });

    // TODO：已暂时停用，恢复或删除
    // useEffect(() => { inOb.observe(locationTextNodeRef.current); return () => inOb.disconnect(); }, [inOb]);

    return (
        <Card imgSrc={imgUrl} className={`event-card ${className || ''}`} imgPreview={false}>
            <a href={link} target='_blank' className='event-card--link-wrapper'>
                <Container className='event-card--content'
                    onClick={handleShowMap} innerRef={contentNodeRef} direction='column' align='start'>
                    <p className='event-card--content--title text-line-clamp-2'>{title}</p>
                    <p className='event-card--content--descrip text-line-clamp-2'>{descrip}</p>
                    <Container className='event-card--content--time'>
                        <IconTime />
                        <span>
                            <FormattedDateTimeRangeBrief from={startTime} to={endTime} />
                        </span>
                    </Container>
                    <Container className='event-card--content--location'>
                        <IconLocation />
                        <span ref={locationTextNodeRef}>
                            {showMapHint ? <FormattedMessage id='event.mapHint' /> : location}
                        </span>
                    </Container>
                </Container>
                <Amap className='event-card--map' load={showMap} innerRef={mapNodeRef}
                    onGoBack={handleShowMap} markerLonLat={lonLat} markerName={location} />
            </a>
        </Card>
    );
};

export default EventCard;