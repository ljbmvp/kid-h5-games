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
var GraspTheDoll = (function (_super) {
    __extends(GraspTheDoll, _super);
    function GraspTheDoll() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.initContent();
        }
        else {
            var timer = new egret.Timer(100, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
            timer.start();
        }
        return _this;
    }
    GraspTheDoll.prototype.timerFunc = function (event) {
        var _this = this;
        if (this.stage) {
            event.currentTarget.stop();
            RES.getResAsync('bgmusic_mp3', function (data) {
                _this._bgSound = data;
                _this.initContent();
            }, this);
        }
    };
    GraspTheDoll.prototype.initContent = function () {
        PublicTool.stageWidth = this.stage.stageWidth;
        PublicTool.stageHeight = this.stage.stageHeight;
        this._bg = PublicTool.createBitmapByName("bg_png");
        this._bg.width = PublicTool.stageWidth;
        this._bg.height = PublicTool.stageHeight;
        this.addChild(this._bg);
        this._hand = new HandComponent();
        this.addChild(this._hand);
        this._loves = new CountLoves();
        this.addChild(this._loves);
        this._loves.x = 200;
        this._loves.y = 16;
        this._stars = new CountStars();
        this.addChild(this._stars);
        this._stars.x = 755;
        this._stars.y = 24;
        this._question = new QuestionCompoment();
        this.addChild(this._question);
        this._leftBtn = new EButton(this, "leftBtn_png", this.onLeftBtnBegin, this.onLeftBtnEnd, "", 30, 3, null);
        PublicTool.setXY(this._leftBtn, 345, 864);
        this.addChild(this._leftBtn);
        this._rightBtn = new EButton(this, "rightBtn_png", this.onRightBtnBegin, this.onRightBtnEnd, "", 30, 3, null);
        PublicTool.setXY(this._rightBtn, 850, 864);
        this.addChild(this._rightBtn);
        this._getBtn = new EButton(this, "getBtn_png", this.onGetBtnClick, null, "", 30, 3, null);
        PublicTool.setXY(this._getBtn, 605, 828);
        this.addChild(this._getBtn);
        this._startBG = new egret.Sprite();
        this._startBG.graphics.beginFill(0, 0.5);
        this._startBG.graphics.drawRect(0, 0, PublicTool.stageWidth, PublicTool.stageHeight);
        this._startBG.graphics.endFill();
        this._startBG.touchEnabled = true;
        this.addChild(this._startBG);
        this._next = new EButton(this, "next_png", null, null, "", 30, 3, null);
        this.addChild(this._next);
        this._next.$touchEnabled = true;
        this._next.x = this.stage.stageWidth - this._next.width - 50;
        this._next.y = 880;
        this._next.visible = false;
        this.m_repeatBtn = new EButton(this, "repeat_png", null, null, "", 30, 3, null);
        this.addChild(this.m_repeatBtn);
        this.m_repeatBtn.$touchEnabled = true;
        this.m_repeatBtn.x = this._next.x;
        this.m_repeatBtn.y = this._next.y;
        this.m_repeatBtn.visible = true;
        this.m_repeatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.repeat, this);
        this._startBtn = new EButton(this, "start_png", null, null, "", 30, 3, null);
        this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnClick, this);
        this._startBtn.x = (PublicTool.stageWidth - this._startBtn.width) * 0.5;
        this._startBtn.y = (PublicTool.stageHeight - this._startBtn.height) * 0.5;
        this._startBG.addChild(this._startBtn);
        this._gameDone = PublicTool.createBitmapByName("gameDone_png");
        this.addChild(this._gameDone);
        this._gameDone.visible = false;
        this._gameDone.touchEnabled = true;
        this._gameDone.alpha = 0;
        this._gameOver = new egret.Sprite();
        var overBG = PublicTool.createBitmapByName("gameOver_png");
        this._gameOver.addChild(overBG);
        var tryAgainBtn = new EButton(this, "tryAgain_png", null, this.resetCon, "", 30, 3, null);
        tryAgainBtn.x = (PublicTool.stageWidth - tryAgainBtn.width) * 0.5;
        tryAgainBtn.y = 580;
        this._gameOver.addChild(tryAgainBtn);
        this._gameOver.alpha = 0;
        this._gameOver.visible = false;
        this._gameOver.touchEnabled = true;
        this.addChild(this._gameOver);
        this._hand.hitTestFun = this.hitTest;
        this._hand.endGraspFun = this.endGrasp;
    };
    GraspTheDoll.prototype.onStartBtnClick = function (event) {
        if (!this._bgChannel) {
            this._bgChannel = this._bgSound.play(0, 0);
            this._bgChannel.volume = 0.5;
            //alert("playBGMusic"+this._bgSound+this._bgChannel);
        }
        var onComplete = function () {
            this.showQuestion();
        };
        if (this._startBG.visible) {
            egret.Tween.get(this._startBG).to({ alpha: 0, visible: false }, 800).call(onComplete, this);
        }
    };
    GraspTheDoll.prototype.showQuestion = function () {
        this._question.createQuestion();
    };
    GraspTheDoll.prototype.hitTest = function (pX, pY) {
        //console.log("***",this._question);		
        //console.log("???",pX,pY);
        var isTrue = this._question.hitTestFun(pX, pY);
        //console.log(isTrue);
        if (isTrue) {
            this._stars.add();
        }
        else {
            this._loves.cut();
        }
        if (this._loves.count <= 0) {
            this._isOver = true;
            egret.Tween.get(this._gameOver).to({ alpha: 1, visible: true }, 1000);
            //提交失败
            console.log("提交失败... ...");
            GameOver(false, function () {
                console.log("提交失败complete");
            });
            this.m_repeatBtn.visible = false;
        }
        if (this._stars.count >= 10) {
            this._isOver = true;
            egret.Tween.get(this._gameDone).to({ alpha: 1, visible: true }, 1000);
            //提交胜利
            console.log("提交胜利... ...");
            GameOver(true, function () {
                console.log("提交胜利complete");
            });
            this._next.visible = GetRequestObject().taskId == 0;
            this.m_repeatBtn.visible = false;
        }
    };
    GraspTheDoll.prototype.endGrasp = function () {
        if (this._isOver) {
            return;
        }
        egret.setTimeout(this.showQuestion, this, 2000);
        //this._question.createQuestion();
    };
    GraspTheDoll.prototype.onLeftBtnBegin = function (event) {
        //console.log("leftBegin");
        if (this._hand.isTweening) {
            return;
        }
        this._isRight = false;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onHandMove, this);
    };
    GraspTheDoll.prototype.onLeftBtnEnd = function (event) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onHandMove, this);
    };
    GraspTheDoll.prototype.onRightBtnBegin = function (event) {
        if (this._hand.isTweening) {
            return;
        }
        this._isRight = true;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onHandMove, this);
    };
    GraspTheDoll.prototype.onRightBtnEnd = function (event) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onHandMove, this);
    };
    GraspTheDoll.prototype.onHandMove = function (e) {
        if (this._isRight) {
            this._hand.rigth();
        }
        else {
            this._hand.left();
        }
    };
    GraspTheDoll.prototype.onGetBtnClick = function (event) {
        this._hand.startGrab();
    };
    GraspTheDoll.prototype.resetCon = function () {
        this._stars.reset();
        this._loves.reset();
        this._question.createQuestion();
        this._isOver = false;
        if (this._gameOver.visible) {
            egret.Tween.get(this._gameOver).to({ alpha: 0, visible: false }, 1000);
        }
        this.m_repeatBtn.visible = true;
    };
    GraspTheDoll.prototype.repeat = function (e) {
        this._question.repeat();
    };
    return GraspTheDoll;
}(egret.Sprite));
__reflect(GraspTheDoll.prototype, "GraspTheDoll");
//# sourceMappingURL=GraspTheDoll.js.map