/**
 * * 导师数据钩子
 * @author shepard
 */
import mentorMock from '../../mocks/mentor.mocks';

interface MentorsHookOptions {
    limit?: number,
    excludeIds?: string[],
}

/**
 * 获取导师数据钩子
 * @param options 导师数据钩子配置
 */
export function useMentors(options?: MentorsHookOptions) {
    const { limit, excludeIds } = options || {};

    const filteredMentors = excludeIds ? mentorMock.filter((elem) => !excludeIds.includes(elem.id)) : mentorMock;
    return filteredMentors.slice(0, limit || mentorMock.length);
}