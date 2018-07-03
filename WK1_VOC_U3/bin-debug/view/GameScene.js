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
//游戏场景
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        //背景
        _this.m_bg = DisplayUtil.createBitmapByName("scene_jpg");
        _this.addChild(_this.m_bg);
        //云1
        _this.m_cloud1 = DisplayUtil.createBitmapByName("cloud1_png");
        _this.m_cloud1.x = 115;
        _this.m_cloud1.y = 104;
        _this.addChild(_this.m_cloud1);
        //云2
        _this.m_cloud2 = DisplayUtil.createBitmapByName("cloud2_png");
        _this.m_cloud2.x = 500;
        _this.m_cloud2.y = 77;
        _this.addChild(_this.m_cloud2);
        //云3
        _this.m_cloud3 = DisplayUtil.createBitmapByName("cloud3_png");
        _this.m_cloud3.x = 1360;
        _this.m_cloud3.y = 110;
        _this.addChild(_this.m_cloud3);
        //泡泡
        _this.m_paopaoArr = Array();
        for (var i = 0; i < 10; i++) {
            var paopao = new PaoPaoView();
            paopao.x = 700 + Math.random() * 300;
            paopao.y = 750 + Math.random() * 150;
            paopao.scaleX = paopao.scaleY = Math.random() * 0.7 + 0.3;
            paopao.speedX = (Math.random() > 0.5 ? 1 : -1) * (1 - paopao.scaleX) * 4;
            paopao.speedY = (1 - paopao.scaleX) * 8;
            _this.m_paopaoArr.push(paopao);
        }
        return _this;
    }
    GameScene.prototype.onRender = function () {
        this.moveCloud(this.m_cloud1, 1);
        this.moveCloud(this.m_cloud2, 2);
        this.moveCloud(this.m_cloud3, 2.2);
        this.movePaopao();
    };
    //移动云彩
    GameScene.prototype.moveCloud = function (obj, speed) {
        obj.x += speed;
        if (obj.x > Game.instance.stageW) {
            obj.x = -obj.width;
        }
    };
    GameScene.prototype.movePaopao = function () {
        for (var i = 0; i < this.m_paopaoArr.length; i++) {
            var paopao = this.m_paopaoArr[i];
            paopao.y -= paopao.speedY;
            paopao.x += paopao.speedX;
            if (paopao.y <= -10) {
                paopao.x = 700 + Math.random() * 300;
                paopao.y = 750 + Math.random() * 150;
            }
        }
    };
    GameScene.prototype.showPaoPao = function () {
        for (var i = 0; i < this.m_paopaoArr.length; i++) {
            var paopao = this.m_paopaoArr[i];
            this.addChild(paopao);
        }
    };
    GameScene.prototype.hidePaoPao = function () {
        for (var i = 0; i < this.m_paopaoArr.length; i++) {
            var paopao = this.m_paopaoArr[i];
            DisplayUtil.remove(paopao);
        }
    };
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map