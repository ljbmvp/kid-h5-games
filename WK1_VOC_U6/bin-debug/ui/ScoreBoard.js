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
var ScoreBoard = (function (_super) {
    __extends(ScoreBoard, _super);
    function ScoreBoard() {
        var _this = _super.call(this) || this;
        _this.scoreMax = 5;
        _this.touchCount = 0;
        for (var i = 0; i < _this.scoreMax; i++) {
            var star = DisplayUtil.createBitmapByName("starDark_png");
            star.name = "star" + (_this.scoreMax - i - 1);
            star.y = 0;
            star.x = i * (star.width + 5);
            _this.addChild(star);
            //隐藏log功能
            if (i == 0) {
                star.touchEnabled = true;
                star.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.touchCount++;
                    if (_this.touchCount % 20 == 0) {
                        SetLogPanelVisible(false);
                    }
                    else if (_this.touchCount % 10 == 0) {
                        SetLogPanelVisible(true);
                    }
                }, _this);
            }
        }
        return _this;
    }
    //设置分数
    ScoreBoard.prototype.setScore = function (value) {
        for (var i = 0; i < this.scoreMax; i++) {
            var star = this.getChildByName("star" + i);
            var texture = void 0;
            if (value >= i + 1) {
                texture = RES.getRes("starLight_png");
            }
            else {
                texture = RES.getRes("starDark_png");
            }
            star.texture = texture;
        }
    };
    return ScoreBoard;
}(BaseBox));
__reflect(ScoreBoard.prototype, "ScoreBoard");
//# sourceMappingURL=ScoreBoard.js.map