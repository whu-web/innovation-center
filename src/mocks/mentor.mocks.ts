import { MentorInfo } from "../types";

const mentorMocks: MentorInfo[] = [{
    id: '1',
    name: '孟小亮',
    department: '武汉大学遥感信息工程学院',
    imgUrl: require('./resources/mentor-mocks-1.webp'),
    intro: '孟小亮，教授，博士生导师，珞珈青年学者，遥感信息大学生创新创业中心主任、空间信息与数字技术系副主任、中国地理信息产业协会教育与科普工作委员会副主任。主要研究方向为智能空间感知网。留美三年，曾于美国东密歇根大学空间信息科学与教育研究所进行访问学者交流；并作为博士后研究人员参与美国航天航空局ICCaRS（探索气候变化与遥感）项目。主持国家自然科学基金、国家重点研发计划项目课题和国家重大专项课题等多个国家级项目；编撰《空间信息与传感器网络》、《时空大数据的技术与方法》等教材与专著；开创并负责国家首批本科一流课程、国家精品在线开放课程“空间信息工程技术”；作为第一作者或通讯作者发表SCI等三大检索与核心级别以上文章二十余篇。曾获国际摄影测量与遥感协会（ISPRS）最佳青年作者奖；指导中国国际“互联网+”大学生创新创业大赛金奖、中国青年志愿者公益创业大赛金奖等多项国家级创新创业与学科竞赛奖励。',
    titles: '教授 中心主任',
    link: 'http://jszy.whu.edu.cn/mengxiaoliang/'
}, {
    id: '2',
    name: '王少华',
    department: '武汉大学遥感信息工程学院',
    imgUrl: require('./resources/mentor-mocks-2.webp'),
    intro: '王少华，武汉大学遥感信息工程学院副教授、武汉大学国家文化发展研究院文化数据中心主任，湖北省文化大数据应用工程技术研究中心常务副主任，武汉市黄鹤英才计划入选者，全国重点文物保护工程方案审核专家库专家。研究方向为空间信息与数字技术在文化遗产领域的交叉应用研究，并长期致力相关研究成果的产业化推广，先后主持和参与国家重点研发计划课题、国家科技支撑计划课题、国家文化创新工程项目、国家文物局文化遗产保护科学与技术研究课题以及国家现代服务业示范项目等各类科研和产业化项目10余项。',
    titles: '副教授',
    link: 'http://jszy.whu.edu.cn/wangshaohua1'
}, {
    id: '3',
    name: '张昌平',
    department: '武汉大学历史学院',
    imgUrl: require('./resources/mentor-mocks-3.webp'),
    intro: '张昌平，武汉大学历史学院教授、长江文明考古研究院副院长，国家级人才计划入选者。曾任职于湖北省文物考古研究所及湖北省博物馆，普林斯顿大学、哈佛大学、法国高等实验研究院等多个学术机构的访问学者或客座教授。研究方向为商周考古和中国青铜时代青铜器，目前负责盘龙城大遗址考古。著有《方国的青铜与文化》、《曾国青铜器研究》、《商周时期南方青铜器研究》、《吉金类系——海外及港台地区收藏的中国青铜器研究》等。',
    titles: '教授',
    link: 'http://www.history.whu.edu.cn/info/1097/1689.htm'
}, {
    id: '4',
    name: '张昌平',
    department: '武汉大学历史学院',
    imgUrl: require('./resources/mentor-mocks-3.webp'),
    intro: '张昌平，武汉大学历史学院教授、长江文明考古研究院副院长，国家级人才计划入选者。曾任职于湖北省文物考古研究所及湖北省博物馆，普林斯顿大学、哈佛大学、法国高等实验研究院等多个学术机构的访问学者或客座教授。研究方向为商周考古和中国青铜时代青铜器，目前负责盘龙城大遗址考古。著有《方国的青铜与文化》、《曾国青铜器研究》、《商周时期南方青铜器研究》、《吉金类系——海外及港台地区收藏的中国青铜器研究》等。',
    titles: '教授',
    link: 'http://www.history.whu.edu.cn/info/1097/1689.htm'
}, {
    id: '5',
    name: '孟小亮',
    department: '武汉大学遥感信息工程学院',
    imgUrl: require('./resources/mentor-mocks-1.webp'),
    intro: '孟小亮，教授，博士生导师，珞珈青年学者，遥感信息大学生创新创业中心主任、空间信息与数字技术系副主任、中国地理信息产业协会教育与科普工作委员会副主任。主要研究方向为智能空间感知网。留美三年，曾于美国东密歇根大学空间信息科学与教育研究所进行访问学者交流；并作为博士后研究人员参与美国航天航空局ICCaRS（探索气候变化与遥感）项目。主持国家自然科学基金、国家重点研发计划项目课题和国家重大专项课题等多个国家级项目；编撰《空间信息与传感器网络》、《时空大数据的技术与方法》等教材与专著；开创并负责国家首批本科一流课程、国家精品在线开放课程“空间信息工程技术”；作为第一作者或通讯作者发表SCI等三大检索与核心级别以上文章二十余篇。曾获国际摄影测量与遥感协会（ISPRS）最佳青年作者奖；指导中国国际“互联网+”大学生创新创业大赛金奖、中国青年志愿者公益创业大赛金奖等多项国家级创新创业与学科竞赛奖励。',
    titles: '教授 中心主任',
    link: 'http://jszy.whu.edu.cn/mengxiaoliang/'
}, {
    id: '6',
    name: '王少华',
    department: '武汉大学遥感信息工程学院',
    imgUrl: require('./resources/mentor-mocks-2.webp'),
    intro: '王少华，武汉大学遥感信息工程学院副教授、武汉大学国家文化发展研究院文化数据中心主任，湖北省文化大数据应用工程技术研究中心常务副主任，武汉市黄鹤英才计划入选者，全国重点文物保护工程方案审核专家库专家。研究方向为空间信息与数字技术在文化遗产领域的交叉应用研究，并长期致力相关研究成果的产业化推广，先后主持和参与国家重点研发计划课题、国家科技支撑计划课题、国家文化创新工程项目、国家文物局文化遗产保护科学与技术研究课题以及国家现代服务业示范项目等各类科研和产业化项目10余项。',
    titles: '副教授',
    link: 'http://jszy.whu.edu.cn/wangshaohua1'
}, {
    id: '7',
    name: '孟小亮',
    department: '武汉大学遥感信息工程学院',
    imgUrl: require('./resources/mentor-mocks-1.webp'),
    intro: '孟小亮，教授，博士生导师，珞珈青年学者，遥感信息大学生创新创业中心主任、空间信息与数字技术系副主任、中国地理信息产业协会教育与科普工作委员会副主任。主要研究方向为智能空间感知网。留美三年，曾于美国东密歇根大学空间信息科学与教育研究所进行访问学者交流；并作为博士后研究人员参与美国航天航空局ICCaRS（探索气候变化与遥感）项目。主持国家自然科学基金、国家重点研发计划项目课题和国家重大专项课题等多个国家级项目；编撰《空间信息与传感器网络》、《时空大数据的技术与方法》等教材与专著；开创并负责国家首批本科一流课程、国家精品在线开放课程“空间信息工程技术”；作为第一作者或通讯作者发表SCI等三大检索与核心级别以上文章二十余篇。曾获国际摄影测量与遥感协会（ISPRS）最佳青年作者奖；指导中国国际“互联网+”大学生创新创业大赛金奖、中国青年志愿者公益创业大赛金奖等多项国家级创新创业与学科竞赛奖励。',
    titles: '教授 中心主任',
    link: 'http://jszy.whu.edu.cn/mengxiaoliang/'
}, {
    id: '8',
    name: '王少华',
    department: '武汉大学遥感信息工程学院',
    imgUrl: require('./resources/mentor-mocks-2.webp'),
    intro: '王少华，武汉大学遥感信息工程学院副教授、武汉大学国家文化发展研究院文化数据中心主任，湖北省文化大数据应用工程技术研究中心常务副主任，武汉市黄鹤英才计划入选者，全国重点文物保护工程方案审核专家库专家。研究方向为空间信息与数字技术在文化遗产领域的交叉应用研究，并长期致力相关研究成果的产业化推广，先后主持和参与国家重点研发计划课题、国家科技支撑计划课题、国家文化创新工程项目、国家文物局文化遗产保护科学与技术研究课题以及国家现代服务业示范项目等各类科研和产业化项目10余项。',
    titles: '副教授',
    link: 'http://jszy.whu.edu.cn/wangshaohua1'
}, {
    id: '9',
    name: '张昌平',
    department: '武汉大学历史学院',
    imgUrl: require('./resources/mentor-mocks-3.webp'),
    intro: '张昌平，武汉大学历史学院教授、长江文明考古研究院副院长，国家级人才计划入选者。曾任职于湖北省文物考古研究所及湖北省博物馆，普林斯顿大学、哈佛大学、法国高等实验研究院等多个学术机构的访问学者或客座教授。研究方向为商周考古和中国青铜时代青铜器，目前负责盘龙城大遗址考古。著有《方国的青铜与文化》、《曾国青铜器研究》、《商周时期南方青铜器研究》、《吉金类系——海外及港台地区收藏的中国青铜器研究》等。',
    titles: '教授',
    link: 'http://www.history.whu.edu.cn/info/1097/1689.htm'
},
]

export default mentorMocks;