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
var CountLoves = (function (_super) {
    __extends(CountLoves, _super);
    function CountLoves() {
        var _this = _super.call(this) || this;
        _this.count = 3;
        _this.createView();
        return _this;
    }
    CountLoves.prototype.createView = function () {
        var love_panel = this.createBitmapByName("heartBarBG_png");
        this.addChild(love_panel);
        var love = this.createBitmapByName("heartBar_png");
        this.addChild(love);
        love.name = "love";
        //love.anchorOffsetX = -25;
        //love.anchorOffsetY = -14;
        this._topMask = new egret.Shape();
        this.addChild(this._topMask);
        this._topMask.name = "mask";
        this._topMask.graphics.beginFill(0x000000, 1);
        this._topMask.graphics.drawRect(0, 0, CountLoves.MOVEDIS * CountLoves.NUM, 51);
        this._topMask.graphics.endFill();
        this._topMask.anchorOffsetX = -25;
        this._topMask.anchorOffsetY = -14;
        love.mask = this._topMask;
        this._topMask.x = (this.count - CountLoves.NUM) * CountLoves.MOVEDIS;
    };
    CountLoves.prototype.add = function () {
        if (this.count >= CountLoves.NUM)
            return;
        this.count++;
        this._topMask.x = (this.count - CountLoves.NUM) * CountLoves.MOVEDIS;
    };
    CountLoves.prototype.cut = function () {
        if (this.count <= 0)
            return;
        this.count--;
        this._topMask.x = (this.count - CountLoves.NUM) * CountLoves.MOVEDIS;
    };
    CountLoves.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    CountLoves.prototype.createDisobj = function (array) {
        var result = new egret.Sprite();
        for (var i = 0; i < array.length; i++) {
            result.addChild(array[i]);
        }
        return result;
    };
    CountLoves.prototype.reset = function () {
        this.count = CountLoves.NUM;
        this._topMask.x = (this.count - CountLoves.NUM) * CountLoves.MOVEDIS;
    };
    CountLoves.MOVEDIS = 74;
    CountLoves.NUM = 3;
    return CountLoves;
}(egret.Sprite));
__reflect(CountLoves.prototype, "CountLoves");
//# sourceMappingURL=CountLoves.js.map