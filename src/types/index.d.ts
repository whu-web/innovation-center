
export interface ContentBase {
    id: string;
    title: string;
    descrip: string;
    imgUrl: string;
}

export interface EventType extends ContentBase {

}

export interface NewsType extends ContentBase {

}

// 支持的语言/地区
export type Locale =
    'en'
    | 'zh-CN'
    | 'zh-HK'
    ;