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
var MusicBtn = (function (_super) {
    __extends(MusicBtn, _super);
    function MusicBtn() {
        var _this = _super.call(this) || this;
        _this.m_state = 1;
        _this.btn = DisplayUtil.createBitmapByName("musicBtn_png");
        _this.addChild(_this.btn);
        _this.btn.touchEnabled = true;
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
        return _this;
    }
    MusicBtn.prototype.onTouchTap = function () {
        this.m_state = (this.m_state + 1) % 2; //取值0,1
        this.btn.texture = this.m_state == 0 ? RES.getRes("muteBtn_png") : RES.getRes("musicBtn_png");
        this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    };
    Object.defineProperty(MusicBtn.prototype, "state", {
        get: function () { return this.m_state; },
        enumerable: true,
        configurable: true
    });
    return MusicBtn;
}(BaseBox));
__reflect(MusicBtn.prototype, "MusicBtn");
//# sourceMappingURL=MusicBtn.js.map