var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    ArrayUtil.randomSort = function (array) {
        var tempArr = array.concat();
        array.length = 0;
        while (tempArr.length > 0) {
            var outIdx = MathUtil.random(0, tempArr.length - 1);
            var obj = tempArr.splice(outIdx, 1)[0];
            array.push(obj);
        }
    };
    return ArrayUtil;
}());
__reflect(ArrayUtil.prototype, "ArrayUtil");
//# sourceMappingURL=ArrayUtil.js.map