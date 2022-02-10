import { EventType } from "../types";

const eventMocks: EventType[] = [{
    id: '1',
    title: '遥感+文化遗产专题活动',
    descrip: '武汉大学遥感信息大学生创新创业中心俱乐部沙龙第一期',
    imgUrl: require('./resources/event-mocks-1.jpg'),
    location: '遥感信息工程学院附3-202',
    lonLat: [114.3599, 30.526033],
    startTime: new Date('2021-12-16T14:30:00'),
}, {
    id: '2',
    title: '一位考古专家看当代社会',
    descrip: '武汉大学遥感信息大学生创新创业中心俱乐部沙龙第一期',
    imgUrl: require('./resources/event-mocks-2.png'),
    location: '遥感信息工程学院附3-202',
    lonLat: [114.3599, 30.526033],
    startTime: new Date('2021-12-16T14:30:00'),
}, {
    id: '3',
    title: '遥感+文化遗产科技成果产业化',
    descrip: '武汉大学遥感信息大学生创新创业中心俱乐部沙龙第一期',
    imgUrl: require('./resources/event-mocks-3.png'),
    location: '遥感信息工程学院附3-202',
    lonLat: [114.3599, 30.526033],
    startTime: new Date('2021-12-16T14:30:00'),
}
];

export default eventMocks;