export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
    return function (x: number): number {
        // 从x估计t
        let tLeft = 0, tRight = 1;
        let t = 0, tg = 0;
        let err = 0;
        do {
            t = (tLeft + tRight) / 2;

            tg = 3 * (1 - t) * t;
            err = tg * (1 - t) * x1 + tg * t * x2 + t * t * t - x;

            if (err > 0) tRight = t;
            else tLeft = t;

        } while (Math.abs(err) > 0.0005);
        // 从t计算y
        return tg * (1 - t) * y1 + tg * t * y2 + t * t * t;
    }
}
