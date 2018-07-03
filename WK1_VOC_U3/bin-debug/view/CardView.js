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
var CardView = (function (_super) {
    __extends(CardView, _super);
    function CardView(id, image, audio, cardName) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.image = image;
        _this.audio = audio;
        _this.cardName = cardName;
        _this.m_mc = DisplayUtil.createMovieClipByName("card");
        _this.m_mc.x = -150;
        _this.m_mc.y = -150;
        _this.addChild(_this.m_mc);
        _this.m_mc.gotoAndStop("none");
        _this.m_content = DisplayUtil.createBitmapByName(_this.image);
        _this.m_content.x = _this.m_content.width / -2;
        _this.m_content.y = _this.m_content.height / -2;
        _this.addChild(_this.m_content);
        return _this;
    }
    //重置
    CardView.prototype.reset = function () {
        this.visible = true;
        this.m_mc.visible = true;
        this.m_mc.gotoAndStop("none");
        this.m_content.filters = [];
        this.m_content.x = this.m_content.width / -2;
        this.m_content.y = this.m_content.height / -2;
        this.m_content.visible = true;
    };
    //爆炸
    CardView.prototype.boom = function () {
        this.m_mc.visible = true;
        this.m_mc.gotoAndPlay("fail", 1);
        this.m_content.visible = false;
    };
    CardView.prototype.right = function (callback) {
        this.m_mc.visible = false;
        //图片发光
        this.m_content.filters = [new egret.GlowFilter(0xffff00, 1, 20, 20, 2)];
        egret.Tween.get(this.m_content).wait(500).to({ y: -300 }, 500).call(function () {
            if (callback != null) {
                callback();
            }
        });
    };
    return CardView;
}(egret.Sprite));
__reflect(CardView.prototype, "CardView");
//# sourceMappingURL=CardView.js.map