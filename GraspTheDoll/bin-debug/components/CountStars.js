var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CountStars = (function (_super) {
    __extends(CountStars, _super);
    function CountStars() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.initContent();
        return _this;
    }
    CountStars.prototype.initContent = function () {
        var gstars = PublicTool.createBitmapByName("startBarBG_png");
        this.addChild(gstars);
        var stars = PublicTool.createBitmapByName("startBar_png");
        this.addChild(stars);
        this._topMask = new egret.Shape();
        this.addChild(this._topMask);
        this._topMask.graphics.beginFill(0x000000, 1);
        this._topMask.graphics.drawRect(0, 0, CountStars.MOVEDIS * CountStars.NUM, 51);
        this._topMask.graphics.endFill();
        stars.mask = this._topMask;
        this._topMask.x = (this.count - CountStars.NUM) * CountStars.MOVEDIS;
    };
    CountStars.prototype.add = function () {
        if (this.count >= 10)
            return;
        this.count++;
        this._topMask.x = (this.count - CountStars.NUM) * CountStars.MOVEDIS;
    };
    CountStars.prototype.cut = function () {
        if (this.count <= 0)
            return;
        this.count--;
        this._topMask.x = (this.count - CountStars.NUM) * CountStars.MOVEDIS;
    };
    CountStars.prototype.reset = function () {
        this.count = 0;
        this._topMask.x = (this.count - CountStars.NUM) * CountStars.MOVEDIS;
    };
    CountStars.NUM = 10;
    CountStars.MOVEDIS = 60;
    return CountStars;
}(egret.Sprite));
__reflect(CountStars.prototype, "CountStars");
//# sourceMappingURL=CountStars.js.map