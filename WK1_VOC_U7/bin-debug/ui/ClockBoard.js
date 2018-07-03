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
var ClockBoard = (function (_super) {
    __extends(ClockBoard, _super);
    function ClockBoard() {
        var _this = _super.call(this) || this;
        var bg = DisplayUtil.createBitmapByName("clock_png");
        _this.addChild(bg);
        _this.m_tf = new egret.TextField();
        _this.m_tf.textColor = 0xff0000;
        _this.m_tf.size = 56;
        _this.m_tf.bold = true;
        _this.m_tf.textAlign = egret.HorizontalAlign.CENTER;
        _this.m_tf.width = 104;
        _this.m_tf.height = 66;
        _this.m_tf.x = 26;
        _this.m_tf.y = 80;
        _this.addChild(_this.m_tf);
        return _this;
    }
    Object.defineProperty(ClockBoard.prototype, "text", {
        get: function () {
            return this.m_tf.text;
        },
        set: function (value) {
            this.m_tf.text = value;
        },
        enumerable: true,
        configurable: true
    });
    return ClockBoard;
}(BaseBox));
__reflect(ClockBoard.prototype, "ClockBoard");
//# sourceMappingURL=ClockBoard.js.map