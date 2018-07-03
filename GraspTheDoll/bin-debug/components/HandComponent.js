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
var HandComponent = (function (_super) {
    __extends(HandComponent, _super);
    function HandComponent() {
        var _this = _super.call(this) || this;
        _this.isTweening = false;
        _this.initContent();
        return _this;
    }
    HandComponent.prototype.initContent = function () {
        var bar = PublicTool.createBitmapByName("bar_png");
        bar.x = 66;
        bar.y = 160;
        this.addChild(bar);
        this._handSP = new egret.Sprite();
        this._handSP.x = 170;
        this._handSP.y = 140;
        this.addChild(this._handSP);
        this._hand_mid = PublicTool.createBitmapByName("hand1_png");
        this._hand_mid.x = 40;
        this._hand_mid.y = 30;
        this._handSP.addChild(this._hand_mid);
        this._hand_bottomSP = new egret.Sprite();
        this._handSP.addChild(this._hand_bottomSP);
        var hand3 = PublicTool.createBitmapByName("hand3_png");
        hand3.x = -33;
        hand3.y = 50;
        this._hand_bottomSP.addChild(hand3);
        this._hand2 = PublicTool.createBitmapByName("hand2_png");
        this._hand_bottomSP.addChild(this._hand2);
        var hand0 = PublicTool.createBitmapByName("hand0_png");
        this._handSP.addChild(hand0);
        this.updata();
    };
    HandComponent.prototype.rigth = function () {
        this._handSP.x += 6;
        if (this._handSP.x > 1170) {
            this._handSP.x = 1170;
        }
    };
    HandComponent.prototype.left = function () {
        this._handSP.x -= 6;
        if (this._handSP.x < 90) {
            this._handSP.x = 90;
        }
    };
    HandComponent.prototype.startGrab = function () {
        if (this.isTweening) {
            return;
        }
        this.isTweening = true;
        var onComplete = function () {
            if (this.hitTestFun) {
                var p = this._hand_bottomSP.localToGlobal(this._hand2.x + this._hand2.width * 0.5, this._hand2.y + this._hand2.height * 0.5);
                this.hitTestFun.apply(this.parent, [p.x, p.y]);
            }
            egret.Tween.get(this._hand_mid, { onChange: this.updata, onChangeObj: this }).to({ height: 200 }, 1000, egret.Ease.quadInOut).call(this.endGrab, this);
        };
        egret.Tween.get(this._hand_mid, { onChange: this.updata, onChangeObj: this }).to({ height: 400 }, 1000, egret.Ease.quadOut).call(onComplete, this);
    };
    HandComponent.prototype.endGrab = function () {
        this.isTweening = false;
        if (this.endGraspFun) {
            this.endGraspFun.apply(this.parent);
        }
    };
    HandComponent.prototype.reset = function () {
        this.isTweening = false;
    };
    HandComponent.prototype.updata = function () {
        this._hand_bottomSP.x = this._hand_mid.x - 33;
        this._hand_bottomSP.y = this._hand_mid.y + this._hand_mid.height - 20;
    };
    return HandComponent;
}(egret.Sprite));
__reflect(HandComponent.prototype, "HandComponent");
//# sourceMappingURL=HandComponent.js.map