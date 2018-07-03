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
    function CardView(image, audio, cardName) {
        var _this = _super.call(this) || this;
        _this.image = image;
        _this.audio = audio;
        _this.cardName = cardName;
        _this.m_mc = DisplayUtil.createMovieClipByName("card");
        _this.addChild(_this.m_mc);
        _this.m_mc.gotoAndStop("none");
        _this.m_content = DisplayUtil.createBitmapByName(_this.image);
        _this.m_content.x = -108.5;
        _this.m_content.y = 89;
        _this.m_content.width = _this.m_content.height = 180;
        _this.addChild(_this.m_content);
        return _this;
    }
    //重置
    CardView.prototype.reset = function () {
        this.m_mc.gotoAndStop("none");
    };
    //答错
    CardView.prototype.wrong = function () {
        this.m_mc.gotoAndPlay("wrong", 1);
        egret.Tween.get(this).wait(1000).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 300);
        var matrix = [
            0.212671, 0.71516, 0.072169, 0, 0,
            0.212671, 0.71516, 0.072169, 0, 0,
            0.212671, 0.71516, 0.072169, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.filters = [new egret.ColorMatrixFilter(matrix)];
    };
    //答对
    CardView.prototype.right = function () {
        this.m_mc.gotoAndPlay("right", 1);
        egret.Tween.get(this).wait(1000).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 300);
    };
    return CardView;
}(egret.Sprite));
__reflect(CardView.prototype, "CardView");
//# sourceMappingURL=CardView.js.map