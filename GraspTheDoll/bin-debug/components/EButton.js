/**
  * 图片button类
  * by huanshi
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 可以有图片，文字，动画
  * todo:九宫格、多动画、图字等
  */
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
var EButton = (function (_super) {
    __extends(EButton, _super);
    /**
     * context      回调函数的作用域
    * imgName       图片
    * beginFun      Touch_Begin方法 如果需要在beginFun中使用this的，小心使用这个
    * endFun        Touch_End点击方法 如果需要在endFun中使用this的，小心使用这个
    * descStr       按钮描述
    * fontSize      字体大小
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    * 注意：如果有动画的话，只有动画结束才会触发click事件
    */
    function EButton(context, imgName, beginFun, endFun, descStr, fontSize, cartoonType, assetsName) {
        if (beginFun === void 0) { beginFun = null; }
        if (endFun === void 0) { endFun = null; }
        if (descStr === void 0) { descStr = ""; }
        if (fontSize === void 0) { fontSize = 30; }
        if (cartoonType === void 0) { cartoonType = 1; }
        if (assetsName === void 0) { assetsName = "assets"; }
        var _this = _super.call(this) || this;
        _this.assets = RES.getRes("assets"); //名称不一样的话需要修改
        _this.isPlayCartoon = false;
        _this.cartoonType = 1;
        _this.param = { context: null, data: null }; //回调参数
        _this.param.context = context;
        //console.log("backFun",backFun);
        _this.init(imgName, beginFun, endFun, descStr, fontSize, cartoonType, assetsName);
        return _this;
    }
    EButton.prototype.init = function (imgName, beginFun, endFun, descStr, fontSize, cartoonType, assetsName) {
        if (beginFun === void 0) { beginFun = null; }
        if (endFun === void 0) { endFun = null; }
        if (descStr === void 0) { descStr = ""; }
        if (fontSize === void 0) { fontSize = 30; }
        if (cartoonType === void 0) { cartoonType = 1; }
        if (assetsName === void 0) { assetsName = "assets"; }
        this.cartoonType = cartoonType;
        this.beginFun = beginFun;
        this.endFun = endFun;
        //console.log("init backFun",backFun);
        this.btnImg = new egret.Bitmap();
        if (assetsName == null) {
            this.btnImg.texture = RES.getRes(imgName);
        }
        else {
            if (assetsName != "assets") {
                this.assets = RES.getRes(assetsName);
            }
            this.btnImg.texture = this.assets.getTexture(imgName);
        }
        this.addChild(this.btnImg);
        if (descStr != "") {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.size = fontSize;
            this.textField.textAlign = "center";
            this.textField.stroke = 1;
            this.textField.strokeColor = 0x000000;
            this.textField.text = descStr;
            this.textField.width = this.btnImg.width;
            this.textField.x = this.btnImg.width / 2 - this.textField.width / 2;
            this.textField.y = this.btnImg.height / 2 - this.textField.height / 2;
        }
        this.touchEnabled = true;
        this.touchChildren = false;
        //this.$touchChildren=false;
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonBegin, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonTOUCH_TAP,this);
    };
    /*private onButtonTOUCH_TAP(e:egret.TouchEvent):void
    {

    }*/
    EButton.prototype.onButtonBegin = function (e) {
        if (this.isPlayCartoon) {
            return;
        }
        this.isPlayCartoon = true;
        if (!this.startX) {
            this.startX = this.x;
            this.startY = this.y;
        }
        var targetObj = e.target;
        //if (this.beginFun != null&&targetObj==this) {
        if (this.beginFun != null) {
            //console.log("endName",e.target,e.target==this);
            this.beginFun.apply(this.param.context, [this.param.data]);
        }
        //console.log(this.startX,this.startY);
        this.stage.once(egret.TouchEvent.TOUCH_END, this.onButtonTouchEnd, this);
        egret.Tween.get(this).to({ scaleX: 0.8, scaleY: 0.8, x: this.startX + this.btnImg.width * 0.1, y: this.startY + this.btnImg.height * 0.1 }, 100, egret.Ease.sineIn);
    };
    EButton.prototype.onButtonTouchEnd = function (e) {
        //console.log("endName",e.target,e.target==this);
        var targetObj = e.target;
        var onComplete2 = function () {
            this.isPlayCartoon = false;
            //if (this.endFun != null&&targetObj==this) {
            if (this.endFun != null) {
                //console.log("endName",e.target,e.target==this);
                this.endFun.apply(this.param.context, [this.param.data]);
            }
        };
        if (this.cartoonType == 1) {
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.startX, y: this.startY }, 500, egret.Ease.elasticOut).call(onComplete2, this);
        }
        else if (this.cartoonType == 2) {
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.startX, y: this.startY }, 500, egret.Ease.backOut).call(onComplete2, this);
        }
        else if (this.cartoonType == 3) {
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.startX, y: this.startY }, 100).call(onComplete2, this);
        }
    };
    EButton.prototype.onbuttonTouchTap = function (e) {
        if (this.isPlayCartoon) {
            return;
        }
        this.isPlayCartoon = true;
        var onComplete2 = function () {
            this.isPlayCartoon = false;
            if (this.backFun != null) {
                this.backFun.apply(this.param.context, [this.param.data]);
            }
        };
        var onComplete1 = function () {
            if (this.cartoonType == 1) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            }
            else if (this.cartoonType == 2) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            }
            else if (this.cartoonType == 3) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5, x: this.x + this.btnImg.width / 4, y: this.y + this.btnImg.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        /*//注意，用setTimeout后，引用不到this的域
        setTimeout(function() {
            console.log("click",this.backFun);
             if (this.backFun != null) {

                this.backFun.apply(this.param.context, [this.param.data]);
            }
        }, 300);*/
    };
    //设置绑定数据
    EButton.prototype.setBindData = function (data) {
        this.param.data = data;
    };
    //获取绑定数据
    EButton.prototype.getBindData = function () {
        return this.param.data;
    };
    EButton.prototype.getBitmap = function () {
        return this.btnImg;
    };
    return EButton;
}(egret.Sprite));
__reflect(EButton.prototype, "EButton");
//# sourceMappingURL=EButton.js.map