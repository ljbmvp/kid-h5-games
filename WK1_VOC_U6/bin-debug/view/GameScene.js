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
        _this.m_bg2 = DisplayUtil.createBitmapByName("scene2_jpg");
        _this.m_spark = DisplayUtil.createBitmapByName("spark_png");
        _this.m_snow = DisplayUtil.createBitmapByName("snow_png");
        return _this;
    }
    GameScene.prototype.reset = function () {
        this.addChild(this.m_bg);
        DisplayUtil.remove(this.m_bg2);
        egret.Tween.removeTweens(this.m_spark);
        DisplayUtil.remove(this.m_spark);
        egret.Tween.removeTweens(this.m_snow);
        DisplayUtil.remove(this.m_snow);
    };
    //显示胜利背景
    GameScene.prototype.victory = function () {
        this.addChild(this.m_bg2);
        DisplayUtil.remove(this.m_bg);
    };
    //放烟花
    GameScene.prototype.spark = function () {
        this.addChild(this.m_spark);
        this.m_spark.y = 200;
        this.m_spark.alpha = 0;
        egret.Tween.get(this.m_spark).to({ alpha: 1, y: 0 }, 2000).wait(1000).to({ alpha: 0, y: 200 }, 1500);
    };
    //下雪
    GameScene.prototype.snow = function () {
        Game.instance.screenLayer.addChild(this.m_snow);
        this.m_snow.blendMode = egret.BlendMode.ADD;
        this.m_snow.alpha = 0.5;
        egret.Tween.get(this.m_snow).to({ x: -100 }, 0).wait(200).to({ x: 0 }, 0).wait(200).call(this.snow, this);
    };
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map