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
//开始按钮
var GameStartBox = (function (_super) {
    __extends(GameStartBox, _super);
    function GameStartBox() {
        var _this = _super.call(this) || this;
        _this.m_startBtn = DisplayUtil.createBitmapByName("start_png");
        _this.m_startBtn.$touchEnabled = true;
        _this.addChild(_this.m_startBtn);
        _this.m_startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.start, _this);
        return _this;
    }
    GameStartBox.prototype.start = function () {
        this.hide();
        this.dispatchEvent(new egret.Event("START"));
    };
    GameStartBox.prototype.dispose = function () {
        this.m_startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
        this.m_startBtn = null;
        _super.prototype.dispose.call(this);
    };
    return GameStartBox;
}(BaseBox));
__reflect(GameStartBox.prototype, "GameStartBox");
//# sourceMappingURL=GameStartBox.js.map