var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DisplayUtil = (function () {
    function DisplayUtil() {
    }
    DisplayUtil.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    DisplayUtil.createMovieClipByName = function (name) {
        var data = RES.getRes(name + "_json");
        var txtr = RES.getRes(name + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        return new egret.MovieClip(mcFactory.generateMovieClipData(name));
    };
    DisplayUtil.remove = function (obj) {
        if (obj != null && obj.parent != null) {
            obj.parent.removeChild(obj);
        }
    };
    return DisplayUtil;
}());
__reflect(DisplayUtil.prototype, "DisplayUtil");
//# sourceMappingURL=DisplayUtil.js.map