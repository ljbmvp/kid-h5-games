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
var BirdManager = (function (_super) {
    __extends(BirdManager, _super);
    function BirdManager() {
        var _this = _super.call(this) || this;
        _this.m_speedY = 2.5; //卡牌下落速度
        _this.m_speedX = -7;
        _this.m_intervalTime = 3500; //添加一只鸟的间隔时间
        _this.m_lastTime = 0; //上一次添加的时间
        return _this;
    }
    BirdManager.prototype.init = function (json) {
        this.m_json = json;
        this.m_birdArr = Array();
        this.m_lastTime = 0;
        this.m_touchSound = new SoundPlayer();
    };
    BirdManager.prototype.onRender = function () {
        if (egret.getTimer() - this.m_lastTime > this.m_intervalTime) {
            this.addBird();
        }
        this.moveBrid();
        this.moveCard();
    };
    //添加一只鸟
    BirdManager.prototype.addBird = function () {
        this.m_lastTime = egret.getTimer();
        //添加一个卡片，保证这个卡片在界面中没有重复
        var arr = this.m_json.list.concat();
        for (var i = arr.length - 1; i >= 0; i--) {
            var item = arr[i];
            for (var j = 0; j < this.m_birdArr.length; j++) {
                if (item.name == this.m_birdArr[j].cardName) {
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
        var bird = new BirdView();
        bird.addCard(data);
        bird.x = Game.instance.stageW + 100;
        bird.y = 150 + this.m_count % 2 * 150;
        bird.fly();
        bird.addEventListener("TOUCH_CARD", this.onTouchCard, this);
        Game.instance.sceneLayer.addChild(bird);
        this.m_birdArr.push(bird);
        this.m_count++;
    };
    BirdManager.prototype.start = function () {
        this.reset();
        this.addBird();
    };
    BirdManager.prototype.moveBrid = function () {
        for (var i = this.m_birdArr.length - 1; i >= 0; i--) {
            var bird = this.m_birdArr[i];
            bird.x += this.m_speedX;
            if (bird.x <= -400) {
                this.m_birdArr.splice(i, 1);
                bird.dispose();
            }
        }
    };
    BirdManager.prototype.moveCard = function () {
        for (var i = this.m_birdArr.length - 1; i >= 0; i--) {
            var bird = this.m_birdArr[i];
            if (bird.x < Game.instance.stageW - 200) {
                bird.cardView.y += this.m_speedY;
            }
        }
    };
    BirdManager.prototype.onTouchCard = function (e) {
        //播放点击卡片音效
        // this.m_touchSound.playSync("U1VOC02_mp3");
        this.m_touchSound.playRes("U1VOC02_mp3");
        var evt = new egret.Event("TOUCH_CARD");
        evt.data = e.currentTarget;
        this.dispatchEvent(evt);
    };
    BirdManager.prototype.reset = function () {
        //移除全部鸟
        for (var i = this.m_birdArr.length - 1; i >= 0; i--) {
            var bird = this.m_birdArr[i];
            DisplayUtil.remove(bird);
            bird.dispose();
        }
        this.m_birdArr.length = 0;
        this.m_count = 0;
    };
    BirdManager.prototype.wrong = function () {
        for (var i = this.m_birdArr.length - 1; i >= 0; i--) {
            var bird = this.m_birdArr[i];
            bird.fail();
            bird.cardView.visible = false;
        }
    };
    BirdManager.prototype.hideCard = function () {
        for (var i = 0; i < this.m_birdArr.length; i++) {
            var bird = this.m_birdArr[i];
            bird.cardView.visible = false;
        }
    };
    return BirdManager;
}(egret.EventDispatcher));
__reflect(BirdManager.prototype, "BirdManager");
//# sourceMappingURL=BirdManager.js.map