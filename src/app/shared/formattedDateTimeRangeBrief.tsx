/**
 * * 简略时间范围国际化组件
 * 例：从 2020-12-30 12:00:00 到 2020-12-31 12:00:00
 * 将显示为 2020年12月30日 12:00 ~ 31日 12:00
 */
import React, { useMemo, FunctionComponent } from 'react';

// Components
import { FormattedDate } from 'react-intl';

// Interfaces

// Stylesheet

export interface FormattedDateTimeRangeBriefProps {
    from: Date;
    to: Date;
}

const FormattedDateTimeRangeBrief: FunctionComponent<FormattedDateTimeRangeBriefProps> = (props) => {
    const { from, to } = props;

    const diffResult = useMemo(() => diffDateTimeRange(from, to), [from, to]);

    return (
        <>
            <FormattedDate value={from}
                year={from.getFullYear() === new Date().getFullYear() ? null : 'numeric'}
                month='short' day='2-digit' hour='2-digit' minute='2-digit' />
            {(to && to.getTime() > from.getTime())
                ? <>
                    {" - "}
                    <FormattedDate value={to}
                        year={diffResult.year
                            ? null
                            : to.getFullYear() === new Date().getFullYear()
                                ? null
                                : 'numeric'}
                        month={diffResult.month ? null : 'short'}
                        day={diffResult.day ? null : '2-digit'}
                        hour={diffResult.hour ? null : '2-digit'}
                        minute={diffResult.minute ? null : '2-digit'}
                        second={to.getTime() - from.getTime() < 600 * 1000 ? '2-digit' : null}
                    />
                </>
                : null
            }
        </>
    );
};

export default FormattedDateTimeRangeBrief;

//* 比较起止时间，确定to相较于from的不同部分，注意不同部分从第一个不同的值开始
//* 例如 2020-12-30 12:00:00 和 2020-12-31 12:00:00 的不同部分为 day, hour, minute, second
interface DiffResult {
    year: boolean;  // 不同则为false，相同则为true
    month: boolean;
    day: boolean;
    hour: boolean;
    minute: boolean;
    second: boolean;
}
function diffDateTimeRange(from: Date, to: Date): DiffResult | null {
    if (!to) return;
    if (to.getTime() < from.getTime()) return null;
    const res: DiffResult = { year: true, month: true, day: true, hour: true, minute: true, second: true };
    if (to.getFullYear() === from.getFullYear())
        res.year = false; else return res;
    if (to.getMonth() === from.getMonth())
        res.month = false; else return res;
    if (to.getDay() === from.getDay())
        res.day = false; else return res;
    if (to.getHours() === from.getHours())
        res.hour = false; else return res;
    if (to.getMinutes() === from.getMinutes())
        res.minute = false; else return res;
    if (to.getSeconds() === from.getSeconds())
        res.second = false; else return res;
}