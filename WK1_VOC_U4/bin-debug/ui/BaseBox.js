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
var BoxAlign;
(function (BoxAlign) {
    BoxAlign[BoxAlign["left_top"] = 0] = "left_top";
    BoxAlign[BoxAlign["top"] = 1] = "top";
    BoxAlign[BoxAlign["right_top"] = 2] = "right_top";
    BoxAlign[BoxAlign["right"] = 3] = "right";
    BoxAlign[BoxAlign["right_bottom"] = 4] = "right_bottom";
    BoxAlign[BoxAlign["bottom"] = 5] = "bottom";
    BoxAlign[BoxAlign["left_bottom"] = 6] = "left_bottom";
    BoxAlign[BoxAlign["left"] = 7] = "left";
    BoxAlign[BoxAlign["center"] = 8] = "center";
})(BoxAlign || (BoxAlign = {}));
var BaseBox = (function (_super) {
    __extends(BaseBox, _super);
    function BaseBox() {
        return _super.call(this) || this;
    }
    BaseBox.prototype.show = function (mode, align, offset) {
        if (align === void 0) { align = BoxAlign.center; }
        if (offset === void 0) { offset = new egret.Point(0, 0); }
        if (mode) {
            Game.instance.uiLayer.addChild(this.maskUI);
        }
        Game.instance.uiLayer.addChild(this);
        switch (align) {
            case BoxAlign.left_top:
                this.x = 0;
                this.y = 0;
                break;
            case BoxAlign.top:
                this.x = (Game.instance.stageW - this.width) / 2;
                this.y = 0;
                break;
            case BoxAlign.right_top:
                this.x = Game.instance.stageW - this.width;
                this.y = 0;
                break;
            case BoxAlign.right:
                this.x = Game.instance.stageW - this.width;
                this.y = (Game.instance.stageH - this.height) / 2;
                break;
            case BoxAlign.right_bottom:
                this.x = Game.instance.stageW - this.width;
                this.y = Game.instance.stageH - this.height;
                break;
            case BoxAlign.bottom:
                this.x = (Game.instance.stageW - this.width) / 2;
                this.y = Game.instance.stageH - this.height;
                break;
            case BoxAlign.left_bottom:
                this.x = 0;
                this.y = Game.instance.stageH - this.height;
                break;
            case BoxAlign.left:
                this.x = 0;
                this.y = (Game.instance.stageH - this.height) / 2;
                break;
            case BoxAlign.center:
                this.x = (Game.instance.stageW - this.width) / 2;
                this.y = (Game.instance.stageH - this.height) / 2;
                break;
        }
        this.x += offset.x;
        this.y += offset.y;
    };
    BaseBox.prototype.hide = function (dispose) {
        if (dispose === void 0) { dispose = false; }
        DisplayUtil.remove(this);
        DisplayUtil.remove(this.m_mask);
        if (dispose) {
            this.dispose();
        }
    };
    BaseBox.prototype.dispose = function () {
        this.m_mask = null;
    };
    Object.defineProperty(BaseBox.prototype, "maskUI", {
        get: function () {
            if (this.m_mask == null) {
                this.m_mask = new egret.Sprite();
                this.m_mask.touchEnabled = true;
            }
            this.m_mask.graphics.clear();
            this.m_mask.graphics.beginFill(0x000000, 0.5);
            this.m_mask.graphics.drawRect(0, 0, Game.instance.stageW, Game.instance.stageH);
            this.m_mask.graphics.endFill();
            return this.m_mask;
        },
        enumerable: true,
        configurable: true
    });
    return BaseBox;
}(egret.Sprite));
__reflect(BaseBox.prototype, "BaseBox");
//# sourceMappingURL=BaseBox.js.map