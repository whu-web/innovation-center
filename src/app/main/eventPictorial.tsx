import React, { useState, FunctionComponent, useRef, useCallback } from 'react';

// Components
import Pictorial from '../shared/pictorial';
import Container from '../shared/container';
import { IconLocation } from '../shared/icons';
import FormattedDateTimeRangeBrief from '../shared/formattedDateTimeRangeBrief';
import Amap from '../shared/amap';

// Interfaces
import { EventType } from '../../types';

// Stylesheet
import './eventPictorial.scss';

export interface EventPictorialProps extends Omit<EventType, 'id'> {
    className?: string;
}

const EventPictorial: FunctionComponent<EventPictorialProps> = (props) => {
    const {
        className,
        imgUrl,
        location,
        title,
        link,
        startTime,
        endTime,
        lonLat
    } = props;

    const infoNodeRef = useRef<HTMLDivElement>(null);
    const mapNodeRef = useRef<HTMLDivElement>(null);

    const [showMap, setShowMap] = useState(false);

    const handleToggleMap = useCallback(() => {
        setShowMap(!showMap);
        infoNodeRef.current.classList.toggle('event-pic--elem-hidden');
        mapNodeRef.current.classList.toggle('event-pic--elem-visible');
    }, [showMap]);

    return (
        <Pictorial className={`event-pic ${className || ''}`} layerClass='event-pic--layer'
            imgAlt={title} imgUrl={imgUrl}>
            <a href={link} target='_blank' className='event-pic--layer--link-wrapper container-column-center'>
                <div className='event-pic--layer--info-wrapper' ref={infoNodeRef}>
                    <p className='event-pic--layer--title text-line-clamp-2'>{title}</p>
                    <Container className='event-pic--layer--time' justify='center'>
                        <div className='event-pic--layer--time--line' />
                        <span className='event-pic--layer--time--text'>
                            <FormattedDateTimeRangeBrief from={startTime} to={endTime} />
                        </span>
                        <div className='event-pic--layer--time--line' />
                    </Container>
                </div>
                <Amap markerLonLat={lonLat} markerName={location} innerRef={mapNodeRef}
                    onGoBack={handleToggleMap} load={showMap} className='event-pic--layer--map' />
                <Container className='event-pic--layer--location' onClick={handleToggleMap}>
                    <IconLocation className='event-pic--layer--location--icon' />
                    <span className='event-pic--layer--location--text'>{location}</span>
                </Container>
            </a>
        </Pictorial>
    );
};

export default EventPictorial;

