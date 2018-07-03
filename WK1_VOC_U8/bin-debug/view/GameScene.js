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
        _this.m_bg = DisplayUtil.createBitmapByName("scene_png");
        _this.addChild(_this.m_bg);
        //云1
        _this.m_cloud1 = DisplayUtil.createBitmapByName("yun1_png");
        _this.m_cloud1.x = 87;
        _this.m_cloud1.y = 172;
        _this.addChild(_this.m_cloud1);
        //云2
        _this.m_cloud2 = DisplayUtil.createBitmapByName("yun2_png");
        _this.m_cloud2.x = 556;
        _this.m_cloud2.y = 103;
        _this.addChild(_this.m_cloud2);
        //云3
        _this.m_cloud3 = DisplayUtil.createBitmapByName("yun3_png");
        _this.m_cloud3.x = 887;
        _this.m_cloud3.y = 236;
        _this.addChild(_this.m_cloud3);
        _this.m_cloud4 = DisplayUtil.createBitmapByName("yun4_png");
        _this.m_cloud4.x = 1268;
        _this.m_cloud4.y = 115;
        _this.addChild(_this.m_cloud4);
        _this.m_cloud5 = DisplayUtil.createBitmapByName("yun5_png");
        _this.m_cloud5.x = 1739;
        _this.m_cloud5.y = 160;
        _this.addChild(_this.m_cloud5);
        //前景
        _this.addChild(DisplayUtil.createBitmapByName("sceneFront_png"));
        return _this;
    }
    GameScene.prototype.onRender = function () {
        this.moveCloud(this.m_cloud1, 1);
        this.moveCloud(this.m_cloud2, 1);
        this.moveCloud(this.m_cloud3, 1);
        this.moveCloud(this.m_cloud4, 1);
        this.moveCloud(this.m_cloud5, 1);
    };
    //移动云彩
    GameScene.prototype.moveCloud = function (obj, speed) {
        obj.x += speed;
        if (obj.x > Game.instance.stageW) {
            obj.x = -obj.width;
        }
    };
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map