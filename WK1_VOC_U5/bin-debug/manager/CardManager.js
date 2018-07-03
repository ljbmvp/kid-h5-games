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
        _this.m_speedY = 0;
        _this.m_speedX = -8;
        _this.m_minX = 1420;
        _this.canMove = true;
        return _this;
    }
    CardManager.prototype.init = function (json) {
        this.m_json = json;
        this.m_cardArr = Array();
        this.m_touchSound = new SoundPlayer();
    };
    CardManager.prototype.onRender = function () {
        var maxX = 0;
        for (var i = 0; i < this.m_cardArr.length; i++) {
            maxX = Math.max(this.m_cardArr[i].x, maxX);
        }
        if (maxX < this.m_minX) {
            this.addCard();
        }
        if (this.canMove) {
            this.moveCard();
        }
    };
    CardManager.prototype.addCard = function () {
        //添加一个卡片，保证这个卡片在界面中没有重复
        var arr = this.m_json.list.concat();
        for (var i = arr.length - 1; i >= 0; i--) {
            var item = arr[i];
            for (var j = 0; j < this.m_cardArr.length; j++) {
                if (item.name == this.m_cardArr[j].cardName) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        if (arr.length == 0) {
            Println("当前没有可以添加的卡牌");
            return;
        }
        var idx = MathUtil.random(0, arr.length - 1);
        var data = arr[idx];
        var card = new CardView(data.image, data.audio, data.name);
        card.touchEnabled = true;
        card.x = Game.instance.stageW + 200;
        card.y = 850;
        card.roll();
        card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
        Game.instance.sceneLayer.addChild(card);
        this.m_cardArr.push(card);
        this.m_count++;
    };
    CardManager.prototype.start = function () {
        this.canMove = true;
        this.reset();
        this.addCard();
    };
    CardManager.prototype.moveCard = function () {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            card.x += this.m_speedX;
            if (card.x <= -400) {
                this.m_cardArr.splice(i, 1);
                card.dispose();
            }
        }
    };
    CardManager.prototype.onTouchCard = function (e) {
        //播放点击卡片音效
        this.m_touchSound.playRes("U2VOC01_mp3");
        var evt = new egret.Event("TOUCH_CARD");
        evt.data = e.currentTarget;
        this.dispatchEvent(evt);
    };
    CardManager.prototype.reset = function () {
        //移除全部
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            DisplayUtil.remove(card);
            card.dispose();
        }
        this.m_cardArr.length = 0;
        this.m_count = 0;
    };
    CardManager.prototype.wrong = function () {
    };
    CardManager.prototype.hideCard = function () {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            card.visible = false;
        }
    };
    return CardManager;
}(egret.EventDispatcher));
__reflect(CardManager.prototype, "CardManager");
//# sourceMappingURL=CardManager.js.map