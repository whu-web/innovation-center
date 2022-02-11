import React, { useState, Key, FunctionComponent, LegacyRef, useMemo, ReactNode, useCallback } from 'react';

// Components
import Tabs from '../shared/tabs';
import TabPanel from '../shared/tabPanel';
import LocationCard from './locationCard';
import Text from '../shared/text';
import { FormattedMessage } from 'react-intl';
import { IconBuilding, IconRegulation } from '../shared/icons';

// Interfaces
import { TabsProps } from '../shared/tabs';

// Stylesheet
import './clubResources.scss';

interface ClubResourceInfo {
    tab: { msgId: string, icon: ReactNode },
    panel: { key: Key, content: ReactNode }
}
export interface ClubResourcesProps {
    innerRef?: LegacyRef<HTMLDivElement>
}

//* 环境建设内容源
const offices: { msgSubId: string, lonlat: [number, number], imgUrl: string }[] = [
    { msgSubId: 'mainOffice', lonlat: [114.361301, 30.527711], imgUrl: require('../../assets/overview/offices/main-office.webp') },
    { msgSubId: 'coffee', lonlat: [114.357219, 30.526007], imgUrl: require('../../assets/overview/offices/coffee.webp') }
];

//* 预渲染组件
const clubResourceInfoList: ClubResourceInfo[] = [{
    tab: { msgId: 'clubResources.offices', icon: <IconBuilding /> },
    panel: {
        key: 'offices',
        content: offices.map((elem, idx) => (
            <LocationCard className='resources--offices--loc-card'
                markerLonLat={elem.lonlat} key={elem.msgSubId} splash={idx === 0}
                locationIntlId={`clubResources.offices.${elem.msgSubId}.title`}
                imgSrc={elem.imgUrl} imgPreview={true}
                title={<FormattedMessage id={`clubResources.offices.${elem.msgSubId}.title`} />}
                descrip={<FormattedMessage id={`clubResources.offices.${elem.msgSubId}.descrip`} />}
                location={<FormattedMessage id={`clubResources.offices.${elem.msgSubId}.location`} />}
            />
        ))
    }
},
// {
//     tab: { msgId: 'clubResources.mentors', icon: <IconTeacher /> },
//     panel: {
//         key: 'mentors',
//         content: null
//     }
// },
{
    tab: { msgId: 'clubResources.regulations', icon: <IconRegulation /> },
    panel: {
        key: 'regulations',
        content: null
    }
}];

const ClubResources: FunctionComponent<ClubResourcesProps> = (props) => {

    const [curTabIdx, setCurTabIdx] = useState<number>(0);

    //* 标签页页签组件
    const tabPanels = useMemo(() => clubResourceInfoList.map((elem, idx) => {
        const { tab: { msgId, icon }, panel: { key, content } } = elem;
        const tab = (<Text className='resources--tab-wrapper--tab' justify='center'
            direction='column' icon={icon} id={msgId} />);
        return (
            <TabPanel key={key} tab={tab}
                className={`resources--tab-pane ${curTabIdx === idx ? 'resources--active-tab-pane' : ''}`}>
                {content}
            </TabPanel>
        );
    }), [curTabIdx]);

    //* 处理切换标签页事件
    const handleTabChange = useCallback<TabsProps['onActiveChange']>(({ idx }) => {
        setCurTabIdx(idx); return true;
    }, [])

    return (
        <Tabs className='resouces'
            tabWrapperClass='resources--tab-wrapper'
            activeTabWrapperClass='resources--active-tab-wrapper'
            contentWrapperClass='resources--content-wrapper'
            onActiveChange={handleTabChange}
            innerRef={props.innerRef}>
            {tabPanels}
        </Tabs>
    );
};

export default ClubResources;