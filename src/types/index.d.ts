
export interface ContentBase {
    id: string;
    title: string;
    descrip?: string;
    imgUrl: string;
    link?: string;
}

export interface EventType extends ContentBase {
    location: string;
    startTime: Date;
    endTime?: Date;
    lonLat?: [number, number];
}

export interface NewsType extends ContentBase {
    publishTime: Date;
    author: string;
    tag: 'competition' | 'center' | 'research';
}

// 包含内容的新闻对象
export interface NewsContent extends NewsType {
    content: string;
}

export interface MentorInfo {
    id: string;
    name: string;
    titles: string;
    department: string;
    intro: string;
    imgUrl: string;
    link?: string;
}

// 支持的语言/地区
export type Locale =
    'en'
    | 'zh-CN'
    | 'zh-HK'
    ;
