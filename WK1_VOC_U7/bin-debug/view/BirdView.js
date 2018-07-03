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
var BirdView = (function (_super) {
    __extends(BirdView, _super);
    function BirdView() {
        var _this = _super.call(this) || this;
        _this.m_bird = DisplayUtil.createMovieClipByName("bird");
        _this.addChild(_this.m_bird);
        return _this;
    }
    BirdView.prototype.fly = function () {
        this.m_bird.gotoAndPlay("fly", -1);
    };
    BirdView.prototype.fail = function () {
        //随机一个失败的状态
        var state = MathUtil.random(1, 2, 1);
        this.m_bird.gotoAndPlay("fail" + state, -1);
    };
    BirdView.prototype.jump = function () {
        this.m_bird.gotoAndPlay("jump");
    };
    //给小鸟添加一个口袋
    BirdView.prototype.addCard = function (cardData) {
        var card = new CardView(cardData.image, cardData.audio, cardData.name);
        card.touchEnabled = true;
        card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
        this.m_card = card;
        this.m_card.x = -266;
        this.m_card.y = -133;
        this.addChildAt(this.m_card, 0);
    };
    BirdView.prototype.onTouchCard = function (e) {
        var evt = new egret.Event("TOUCH_CARD");
        this.dispatchEvent(evt);
    };
    BirdView.prototype.dispose = function () {
        DisplayUtil.remove(this.m_bird);
        this.m_bird = null;
        this.m_card.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
        DisplayUtil.remove(this.m_card);
        this.m_card = null;
    };
    Object.defineProperty(BirdView.prototype, "cardName", {
        get: function () {
            return this.m_card.cardName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BirdView.prototype, "cardView", {
        get: function () {
            return this.m_card;
        },
        enumerable: true,
        configurable: true
    });
    return BirdView;
}(egret.Sprite));
__reflect(BirdView.prototype, "BirdView");
//# sourceMappingURL=BirdView.js.map