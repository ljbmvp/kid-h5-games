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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.m_state = Game.GAME_INIT;
        //正确的数量
        _this.m_rightCount = 0;
        return _this;
    }
    Game.prototype.run = function () {
        var _this = this;
        Game.instance = this;
        var json = RES.getRes("config_json");
        this.m_qList = json.list;
        this.m_laveList = new Array();
        this.m_bgSound = new SoundPlayer();
        this.m_qSound = new SoundPlayer();
        this.m_effSound = new SoundPlayer();
        //场景层
        this.m_sceneLayer = new egret.Sprite();
        this.addChild(this.m_sceneLayer);
        //UI层
        this.m_uiLayer = new egret.Sprite();
        this.m_uiLayer.touchEnabled = this.m_uiLayer.touchChildren = true;
        this.addChild(this.m_uiLayer);
        //卡牌
        this.m_birdManager = new BirdManager();
        this.m_birdManager.init(json);
        this.m_birdManager.addEventListener("TOUCH_CARD", this.onTouchCard, this);
        //游戏场景
        this.m_gameScene = new GameScene();
        this.m_sceneLayer.addChild(this.m_gameScene);
        //角色
        this.m_role1 = new RoleView("role1");
        this.m_role1.x = 576;
        this.m_role1.y = 735;
        this.m_sceneLayer.addChild(this.m_role1);
        //计分板
        this.m_scoreBoard = new ScoreBoard();
        this.m_scoreBoard.show(false, BoxAlign.right_top, new egret.Point(-50, 50));
        //倒计时班
        this.m_clockBoard = new ClockBoard();
        this.m_clockBoard.show(false, BoxAlign.left_top, new egret.Point(50, 50));
        this.m_clockBoard.text = "" + Game.GAME_TIME;
        //音乐按钮
        this.m_musicBtn = new MusicBtn();
        this.m_musicBtn.show(false, BoxAlign.right_bottom, new egret.Point(-50, -50));
        this.m_musicBtn.addEventListener(egret.Event.CHANGE, this.updateBgMusic, this);
        //repeat按钮
        this.m_repeatBtn = DisplayUtil.createBitmapByName("repatBtn_png");
        this.m_repeatBtn.touchEnabled = true;
        this.m_repeatBtn.x = this.m_musicBtn.x;
        this.m_repeatBtn.y = this.m_musicBtn.y - 120;
        this.uiLayer.addChild(this.m_repeatBtn);
        this.m_repeatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (_this.m_curQuestion != null) {
                //this.m_qSound.playSync(this.m_curQuestion.audio);
                _this.m_qSound.clear();
                _this.m_qSound.playRes(_this.m_curQuestion.audio);
            }
        }, this);
        //playAgain按钮
        this.m_playAgainBtn = DisplayUtil.createBitmapByName("playAgainBtn_png");
        this.m_playAgainBtn.touchEnabled = true;
        this.m_playAgainBtn.x = this.m_repeatBtn.x;
        this.m_playAgainBtn.y = this.m_repeatBtn.y;
        this.m_playAgainBtn.visible = false;
        this.uiLayer.addChild(this.m_playAgainBtn);
        this.m_playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.gamePlay();
        }, this);
        this.m_tryAgainBtn = DisplayUtil.createBitmapByName("tryAgainBtn_png");
        this.m_tryAgainBtn.touchEnabled = true;
        this.m_tryAgainBtn.x = this.m_repeatBtn.x;
        this.m_tryAgainBtn.y = this.m_repeatBtn.y;
        this.m_tryAgainBtn.visible = false;
        this.uiLayer.addChild(this.m_tryAgainBtn);
        this.m_tryAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.gamePlay();
        }, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onRender, this);
        //游戏初始状态
        this.m_state = Game.GAME_INIT;
        //显示开始按钮
        this.m_gameStartBox = new GameStartBox();
        this.m_gameStartBox.once("START", this.gamePlay, this);
        this.m_gameStartBox.show(true);
    };
    Game.prototype.onRender = function () {
        if (this.m_state == Game.GAME_PLAY) {
            this.m_gameScene.onRender();
            this.m_birdManager.onRender();
        }
    };
    //开始游戏
    Game.prototype.gamePlay = function () {
        this.m_state = Game.GAME_PLAY;
        //隐藏开始按钮
        this.m_gameStartBox.hide();
        //人物设置为空闲状态
        this.m_role1.state = RoleState.idle;
        //隐藏刮风
        if (this.m_wind) {
            this.m_wind.hide();
        }
        //播放背景音乐
        this.updateBgMusic();
        //重置分数
        this.m_rightCount = 0;
        this.m_scoreBoard.setScore(0);
        //开始倒计时
        this.startTimer();
        //重置题目
        this.m_laveList = this.m_qList.concat();
        ArrayUtil.randomSort(this.m_laveList);
        //提问
        this.question();
        //发射卡牌
        this.m_birdManager.reset();
        this.m_birdManager.start();
    };
    //提问一个新问题
    Game.prototype.question = function () {
        this.m_answering = false;
        this.m_repeatBtn.visible = true;
        this.m_playAgainBtn.visible = false;
        this.m_tryAgainBtn.visible = false;
        if (this.m_laveList.length == 0) {
            this.m_laveList = this.m_qList.concat();
            ArrayUtil.randomSort(this.m_laveList);
        }
        this.m_curQuestion = this.m_laveList.shift();
        //播放题目语音
        this.m_qSound.playRes(this.m_curQuestion.audio);
    };
    //点击了卡牌
    Game.prototype.onTouchCard = function (e) {
        if (this.m_answering) {
            return;
        }
        this.m_answering = true;
        this.m_repeatBtn.visible = false;
        this.m_qSound.clear();
        var birdView = e.data;
        this.m_curCardView = birdView.cardView;
        //回答正确
        if (birdView.cardName == this.m_curQuestion.name) {
            this.answerRight();
        }
        else {
            this.answerWrong();
        }
    };
    //回答正确
    Game.prototype.answerRight = function () {
        var _this = this;
        //正确数+1
        this.m_rightCount += 1;
        //添加星星
        this.m_scoreBoard.setScore(this.m_rightCount);
        //开心
        this.m_role1.state = RoleState.happy;
        this.m_curCardView.right();
        //答对音效（叮咚）
        this.m_effSound.clear();
        this.m_effSound.playRes("U1VOC03_mp3");
        this.m_effSound.exec(function () {
            //全部答对
            if (_this.m_rightCount >= Game.WIN_NUM) {
                _this.stopTimer();
                //游戏结束
                _this.m_state = Game.GAME_OVER;
                _this.m_birdManager.hideCard();
                _this.m_role1.state = RoleState.celebrate_hand; //拍手
                _this.m_effSound.playRes("U1VOC05_mp3"); //庆祝音效
                _this.m_effSound.exec(function () {
                    _this.m_role1.state = RoleState.celebrate_mouth; //庆祝表情 + 说话
                }, _this);
                _this.m_effSound.playRes("U1VOC-OS01_mp3").playRes("U1VOC-OS02_mp3");
                _this.m_effSound.exec(function () {
                    _this.m_role1.state = RoleState.celebrate;
                    _this.m_playAgainBtn.visible = true;
                    _this.submit(true);
                }, _this);
            }
            else {
                //继续答题
                _this.question();
                _this.m_role1.state = RoleState.idle;
            }
        }, this);
    };
    //回答错误
    Game.prototype.answerWrong = function () {
        var _this = this;
        this.m_role1.state = RoleState.sad; //难过
        this.m_curCardView.wrong();
        this.m_effSound.clear();
        this.m_effSound.playRes("U1VOC04_mp3"); //答错音效
        this.m_effSound.exec(function () {
            //继续答题，重新朗读题目
            _this.m_role1.state = RoleState.idle;
            _this.m_qSound.playRes(_this.m_curQuestion.audio).exec(function () {
                _this.m_repeatBtn.visible = true;
            }, self);
            _this.m_answering = false;
        }, this);
    };
    //点击音乐按钮
    Game.prototype.updateBgMusic = function () {
        if (this.m_musicBtn.state == 0) {
            Println("停止背景音乐");
            this.m_bgSound.clear();
        }
        else {
            Println("播放背景音乐");
            // this.m_bgSound.playSync("bgmusic_mp3",null,0);
            this.m_bgSound.playRes("bgmusic_mp3", 0);
        }
    };
    Game.prototype.stopTimer = function () {
        if (this.m_timer) {
            this.m_timer.stop();
            this.m_timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.m_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        }
        this.m_timer = null;
    };
    Game.prototype.startTimer = function () {
        this.stopTimer();
        this.m_timer = new egret.Timer(1000, Game.GAME_TIME);
        this.m_timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.m_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.m_timer.start();
        this.onTimer(null); //首次更新一下文本框
    };
    Game.prototype.onTimer = function (e) {
        this.m_clockBoard.text = "" + (this.m_timer.repeatCount - this.m_timer.currentCount);
    };
    Game.prototype.onTimerComplete = function (e) {
        var _this = this;
        this.stopTimer();
        //游戏结束
        this.m_state = Game.GAME_OVER;
        this.m_effSound.clear();
        this.m_qSound.clear();
        this.m_birdManager.wrong();
        //刮风
        if (this.m_wind == null) {
            this.m_wind = new WindView();
        }
        this.m_wind.show(this.sceneLayer);
        this.m_role1.state = RoleState.sad;
        //刮风音效
        this.m_effSound.clear();
        this.m_effSound.playRes("U1VOC06_mp3").playRes("U1VOC07_mp3");
        this.m_effSound.exec(function () {
            _this.m_role1.state = RoleState.sad_mouth;
        }, this);
        this.m_effSound.playRes("U1VOC-OS03_mp3");
        this.m_effSound.exec(function () {
            _this.m_role1.state = RoleState.sad;
        }, this);
        //弹出失败窗口
        this.submit(false);
        this.m_tryAgainBtn.visible = true;
    };
    //提交游戏结果
    Game.prototype.submit = function (isComplete) {
        var theRequest = GetRequestObject();
        GameOver(isComplete, function () {
            //入口是任务中心，不需要显示任何UI
            if (theRequest.taskId != 0) {
                return;
            }
            if (isComplete) {
                SetSuccessPanelVisible(true); //显示成功UI
            }
            else {
                SetFailPanelVisible(true); //显示失败UI
            }
        });
    };
    Object.defineProperty(Game.prototype, "uiLayer", {
        get: function () { return this.m_uiLayer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "sceneLayer", {
        get: function () { return this.m_sceneLayer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "stageW", {
        get: function () { return this.stage.stageWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "stageH", {
        get: function () { return this.stage.stageHeight; },
        enumerable: true,
        configurable: true
    });
    Game.WIN_NUM = 6;
    Game.GAME_TIME = 60;
    Game.GAME_INIT = "game_init";
    Game.GAME_PLAY = "game_play";
    Game.GAME_OVER = "game_over";
    return Game;
}(egret.Sprite));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map