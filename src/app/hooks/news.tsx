/**
 * * 新闻请求钩子
 * @author shepard
 */
import newsMocks from "../../mocks/news.mocks";
import { NewsType } from "../../types";

/**
 * 请求新闻列表数据钩子
 * @param filter 过滤条件
 */
export function useNewsList(filter: {
    tag?: NewsType['tag'];  // 标签
    limit?: number;         // 数量限制
    excludeIds?: string[]          // 排除的id
}) {
    const { tag, limit, excludeIds } = filter;
    //!当前使用mock数据
    const matchTag = tag ? newsMocks.filter((elem) => (elem.tag === tag)) : newsMocks;
    const matchLimit = limit ? matchTag.slice(0, limit) : matchTag;
    const matchExclude = excludeIds ? matchLimit.filter(elem => !excludeIds.includes(elem.id)) : matchLimit;
    const sorted = matchExclude.sort((a, b) => b.publishTime.getTime() - a.publishTime.getTime());

    return sorted;
}

/**
 * * 请求新闻内容钩子
 * @param id 新闻id
 * @param overviewOnly 是否仅请求一页
 */
export function useNews(id: string, overviewOnly: boolean) {
    const news = newsMocks.find(elem => elem.id === id);
    const finalNews = overviewOnly ? Object.assign({}, news, { content: getContentOverview(news.content) }) : news;

    return finalNews;
}

// overview大致的字数
const overviewApproxLength = 500;
function getContentOverview(content: string) {
    return content.slice(0, content.indexOf('\n', overviewApproxLength - 1));
}