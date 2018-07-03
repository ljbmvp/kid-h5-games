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
var QuestionCompoment = (function (_super) {
    __extends(QuestionCompoment, _super);
    function QuestionCompoment() {
        var _this = _super.call(this) || this;
        _this._allList = new Array();
        _this._imgList = new Array();
        _this._qIDArr = new Array();
        _this._nowIDArr = new Array();
        _this._itemArr = new Array();
        _this._answerID = -1;
        _this.root = "data/";
        /**
        * 对应要加载的资源组名称
        */
        _this.resGroupName = "unit1";
        _this.isResourceLoadEnd = false;
        _this._isStart = false;
        _this.initContent();
        return _this;
    }
    QuestionCompoment.prototype.initContent = function () {
        this._gameData = RES.getRes("conf_json");
        this.loadImg();
        this.m_tipsSound = new SoundPlayer();
    };
    QuestionCompoment.prototype.loadImg = function () {
        for (var i = 0; i < this._gameData.items.length; i++) {
            var imgKey = this._gameData.items[i].img;
            var bitmap = new egret.Bitmap(RES.getRes(imgKey));
            bitmap.width = bitmap.height = 150;
            bitmap.name = String(i);
            this._imgList.push(bitmap);
            this._qIDArr.push(i);
        }
        if (this._isStart) {
            this.createQuestion();
        }
        // var count=0;
        // let imgLoader:egret.ImageLoader = new egret.ImageLoader;					 	
        // imgLoader.addEventListener( egret.Event.COMPLETE,(e)=>{
        // 	let texture = new egret.Texture();
        // 	texture._setBitmapData(e.currentTarget.data);
        // 	let bitmap:egret.Bitmap = new egret.Bitmap(texture);
        // 	//bitmap.anchorOffsetX=bitmap.width*0.5;
        // 	//bitmap.anchorOffsetY=bitmap.height*0.5;
        // 	bitmap.name=String(count);
        // 	this._imgList.push(bitmap);
        // 	this._qIDArr.push(count);
        // 	count++;
        // 	if(count>=this._gameData.items.length)
        // 	{
        // 		if(this._isStart){
        // 			this.createQuestion();
        // 		}
        // 	}else
        // 	{
        // 		load(this.root+this._gameData.items[count].img);
        // 	}
        // },this);
        // function load(url)
        // {
        // 	imgLoader.load(url);
        // }
        // load(this.root+this._gameData.items[count].img);
    };
    QuestionCompoment.prototype.createQuestion = function () {
        this._isStart = true;
        var tim = 250 * this.numChildren;
        for (var j = 0; j < this.numChildren; j++) {
            egret.Tween.get(this.getChildAt(j)).to({ y: 514 + 50, alpha: 0 }, 1000, egret.Ease.quadInOut);
        }
        egret.setTimeout(this.newQuestion, this, tim);
    };
    QuestionCompoment.prototype.newQuestion = function () {
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
        //this._itemArr.length=0;
        //egret.log("numChildren---",this.numChildren,this._itemArr.length);
        var copyArr = this._qIDArr.slice();
        this._nowIDArr.length = 0;
        var _loop_1 = function (i) {
            this_1._nowIDArr.push(this_1.getRandomArr(copyArr));
            var qid = this_1._nowIDArr[i];
            var bmp = this_1._imgList[qid];
            var item = new CardComponent(i, bmp, qid);
            item.name = "item_" + qid;
            item.x = 120 + 308 * i;
            item.y = 514;
            item.alpha = 0;
            item.y = 514 + 50;
            this_1.addChild(item);
            egret.setTimeout(function (a) {
                egret.Tween.get(item).to({ y: 514, alpha: 1 }, 1000, egret.Ease.quadInOut);
            }, this_1, 100 * i);
            //egret.log("----",item.x);
            //this._itemArr.push(item);
        };
        var this_1 = this;
        //egret.log("----",this._qIDArr.length);
        for (var i = 0; i < 4 && i < this._qIDArr.length; i++) {
            _loop_1(i);
        }
        copyArr = this._nowIDArr.slice();
        if (copyArr.indexOf(this._answerID) != -1) {
            copyArr.splice(copyArr.indexOf(this._answerID), 1);
        }
        this._answerID = this.getRandomArr(copyArr);
        this.repeat();
    };
    QuestionCompoment.prototype.repeat = function () {
        this.m_tipsSound.clear();
        this.m_tipsSound.playRes(this._gameData.items[this._answerID].audio);
    };
    QuestionCompoment.prototype.hitTestFun = function (pX, pY) {
        var isTrue = false;
        for (var i = 0; i < this._qIDArr.length; i++) {
            var item_1 = this.getChildByName("item_" + this._qIDArr[i]);
            var isHit = item_1.hitObj.hitTestPoint(pX, pY, false);
            if (isHit) {
                if (item_1.name == ("item_" + this._answerID)) {
                    isTrue = true;
                }
                egret.Tween.get(item_1).to({ y: 314 }, 1000, egret.Ease.quadInOut);
            }
        }
        var item = this.getChildByName("item_" + this._qIDArr[this._answerID]);
        EffectUtils.blinkEffect(item, 2000);
        //var p:egret.Point=item.globalToLocal(pX,pY);		
        //isTrue= item.hitObj.hitTestPoint( pX, pY, false );
        if (isTrue) {
            EffectUtils.showTips("回答正確", 4, true);
        }
        else {
            EffectUtils.showTips("回答錯誤", 4);
        }
        return isTrue;
    };
    QuestionCompoment.prototype.getRandomArr = function (arr) {
        return arr.splice(Math.random() * arr.length, 1)[0];
    };
    return QuestionCompoment;
}(egret.Sprite));
__reflect(QuestionCompoment.prototype, "QuestionCompoment");
//# sourceMappingURL=QuestionCompoment.js.map