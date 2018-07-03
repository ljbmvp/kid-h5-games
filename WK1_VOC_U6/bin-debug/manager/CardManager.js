//负责卡牌的管理
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
var CardManager = (function (_super) {
    __extends(CardManager, _super);
    function CardManager() {
        var _this = _super.call(this) || this;
        _this.m_speedY = 6; //卡牌下落速度
        _this.m_cardArr = Array();
        return _this;
    }
    CardManager.prototype.init = function (json) {
        for (var i = 0; i < json.list.length; i++) {
            var cardView = new CardView(i, json.list[i].image, json.list[i].audio, json.list[i].name);
            cardView.name = "card" + i;
            this.m_cardArr.push(cardView);
            cardView.touchEnabled = true;
            cardView.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchCard, this);
        }
    };
    CardManager.prototype.start = function () {
        for (var i = 0; i < this.m_cardArr.length; i++) {
            var card = this.m_cardArr[i];
            Game.instance.uiLayer.addChild(card);
            card.x = 480 + 380 * i;
            card.y = -200 - 400 * i;
            card.visible = true;
            card.touchEnabled = true;
            card.reset();
        }
    };
    CardManager.prototype.move = function () {
        for (var i = 0; i < this.m_cardArr.length; i++) {
            var card = this.m_cardArr[i];
            card.y += this.m_speedY;
            if (card.y >= 1300) {
                card.y = -200;
                card.reset();
            }
        }
    };
    CardManager.prototype.hide = function () {
        for (var i = 0; i < this.m_cardArr.length; i++) {
            var card = this.m_cardArr[i];
            DisplayUtil.remove(card);
        }
    };
    CardManager.prototype.onTouchCard = function (e) {
        var cardView = e.currentTarget;
        var evt = new egret.Event("TOUCH_CARD");
        evt.data = cardView;
        this.dispatchEvent(evt);
    };
    return CardManager;
}(egret.EventDispatcher));
__reflect(CardManager.prototype, "CardManager");
//# sourceMappingURL=CardManager.js.map