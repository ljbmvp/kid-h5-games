var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     * 将弧度转换成角度
     * @param radian	弧度
     * @return 角度
     */
    MathUtil.R2D = function (radian) {
        return radian * 180 / Math.PI;
    };
    /**
     * 将角度转换成弧度
     * @param degress		角度
     * @return  弧度
     */
    MathUtil.D2R = function (degress) {
        return degress * Math.PI / 180;
    };
    MathUtil.random = function (nMinimum, nMaximum, nRoundToInterval) {
        if (nMaximum === void 0) { nMaximum = 0; }
        if (nRoundToInterval === void 0) { nRoundToInterval = 1; }
        if (nMinimum > nMaximum) {
            var nTemp = nMinimum;
            nMinimum = nMaximum;
            nMaximum = nTemp;
        }
        var nDeltaRange = (nMaximum - nMinimum) + (1 * nRoundToInterval);
        var nRandomNumber = Math.random() * nDeltaRange;
        nRandomNumber += nMinimum;
        return MathUtil.floor(nRandomNumber, nRoundToInterval);
    };
    MathUtil.floor = function (nNumber, nRoundToInterval) {
        if (nRoundToInterval === void 0) { nRoundToInterval = 1; }
        return Math.floor(nNumber / nRoundToInterval) * nRoundToInterval;
    };
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
//# sourceMappingURL=MathUtil.js.map