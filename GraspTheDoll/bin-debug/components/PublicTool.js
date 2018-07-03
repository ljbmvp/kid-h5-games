var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PublicTool = (function () {
    function PublicTool() {
    }
    PublicTool.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
    *更改显示对象的坐标，按照舞台UI设计的比例，根据当前stage的宽高自适应
    * @param disObj
    * @param x
    * @param y
    */
    PublicTool.setXY = function (disObj, x, y) {
        disObj.x = x / this.resWidth * this.stageWidth;
        disObj.y = y / this.resHeight * this.stageHeight;
    };
    PublicTool.resWidth = 1366;
    PublicTool.resHeight = 1024;
    //全局字体颜色表--可以扩展
    PublicTool.TextColors = {
        white: 0xFFFFFF,
        milkWhite: 0xfbf1af,
        grayWhite: 0xceb6a2,
        yellow: 0xffff00,
        lightYellow: 0xffd375,
        orangeYellow: 0xff9900,
        red: 0xf11300,
        green: 0x00e500,
        blue: 0x1a94d7,
        grayBlue: 0x2f5177,
        purple: 0xe938f2,
        pink: 0xFF3030,
        black: 0x2e2d2d,
        golden: 0xFFD700 //金色
    };
    return PublicTool;
}());
__reflect(PublicTool.prototype, "PublicTool");
//# sourceMappingURL=PublicTool.js.map