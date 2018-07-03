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
//刮风
var WindView = (function (_super) {
    __extends(WindView, _super);
    function WindView() {
        var _this = _super.call(this) || this;
        _this.m_view = DisplayUtil.createBitmapByName("wind_png");
        _this.addChild(_this.m_view);
        return _this;
    }
    WindView.prototype.show = function (layer) {
        layer.addChild(this);
        this.playTween();
    };
    WindView.prototype.playTween = function () {
        var _this = this;
        this.m_view.alpha = 0;
        this.m_view.x = 398;
        this.m_view.y = 120;
        egret.Tween.get(this.m_view).to({ x: 288.15, y: 244.05, alpha: 1 }, 600).wait(300).to({ x: 206.2, y: 356, alpha: 0 }, 400).call(function () {
            _this.playTween();
        }, this);
    };
    WindView.prototype.hide = function () {
        egret.Tween.removeTweens(this.m_view);
        DisplayUtil.remove(this);
    };
    return WindView;
}(egret.Sprite));
__reflect(WindView.prototype, "WindView");
//# sourceMappingURL=WindView.js.map