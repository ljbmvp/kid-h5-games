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
    function CardView(color, image, audio, cardName) {
        var _this = _super.call(this) || this;
        _this.image = image;
        _this.audio = audio;
        _this.cardName = cardName;
        _this.m_BG = DisplayUtil.createMovieClipByName("circular2");
        _this.m_BG.gotoAndStop("color" + color);
        _this.addChild(_this.m_BG);
        _this.m_FG = DisplayUtil.createMovieClipByName("circular");
        _this.m_FG.gotoAndStop("color" + color);
        _this.addChild(_this.m_FG);
        _this.m_content = DisplayUtil.createBitmapByName(_this.image);
        _this.m_content.width = _this.m_content.height = 180;
        _this.m_content.x = -_this.m_content.width / 2;
        _this.m_content.y = -_this.m_content.height / 2;
        _this.addChild(_this.m_content);
        _this.m_shakeLine = DisplayUtil.createBitmapByName("shakeLine_png");
        _this.m_shakeLine.x = -143;
        _this.m_shakeLine.y = -139;
        _this.addChild(_this.m_shakeLine);
        _this.m_shakeLine.visible = false;
        _this.m_love = DisplayUtil.createMovieClipByName("love");
        _this.addChild(_this.m_love);
        _this.m_love.stop();
        _this.m_love.visible = false;
        _this.m_love.y = -140;
        return _this;
    }
    CardView.prototype.dispose = function () {
        egret.Tween.removeTweens(this.m_FG);
        this.m_FG = null;
        this.m_BG = null;
        this.m_content = null;
    };
    CardView.prototype.roll = function () {
        egret.Tween.get(this.m_FG).to({ rotation: -360 }, 1000).call(this.roll, this);
    };
    //答错
    CardView.prototype.wrong = function () {
        this.m_shakeLine.visible = true;
        this.m_FG.visible = false;
        var self = this;
        EffectUtils.shakeObj(self, function () {
            EffectUtils.shakeObj(self, function () {
                egret.Tween.get(self).to({ alpha: 0 }, 500);
            });
        });
        this.touchEnabled = false;
    };
    //答对
    CardView.prototype.right = function () {
        this.m_love.visible = true;
        this.m_love.play();
        egret.Tween.removeTweens(this.m_FG);
        egret.Tween.get(this).wait(1000).to({ alpha: 0 }, 500);
        this.touchEnabled = false;
    };
    return CardView;
}(egret.Sprite));
__reflect(CardView.prototype, "CardView");
//# sourceMappingURL=CardView.js.map