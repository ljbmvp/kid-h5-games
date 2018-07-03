class HandComponent extends egret.Sprite {
	private _handSP:egret.Sprite;
	private _hand_bottomSP:egret.Sprite;
	private _hand_mid:egret.Bitmap;
	private _hand2:egret.Bitmap;
	public hitTestFun:Function;
	public endGraspFun:Function;
	public isTweening:boolean=false;
	public constructor() {
		super();
		this.initContent();
	}

	private initContent()
	{
		let bar:egret.Bitmap=PublicTool.createBitmapByName("bar_png");
		bar.x=66;
		bar.y=160;
		this.addChild(bar);

		this._handSP=new egret.Sprite();
		this._handSP.x=170;
		this._handSP.y=140;
		this.addChild(this._handSP);
		

		this._hand_mid=PublicTool.createBitmapByName("hand1_png");
		this._hand_mid.x=40
		this._hand_mid.y=30;
		this._handSP.addChild(this._hand_mid);

		this._hand_bottomSP=new egret.Sprite();
		this._handSP.addChild(this._hand_bottomSP);
		let hand3:egret.Bitmap=PublicTool.createBitmapByName("hand3_png");
		hand3.x=-33;
		hand3.y=50;
		this._hand_bottomSP.addChild(hand3);
		this._hand2=PublicTool.createBitmapByName("hand2_png");
		this._hand_bottomSP.addChild(this._hand2);

		let hand0:egret.Bitmap=PublicTool.createBitmapByName("hand0_png");
		this._handSP.addChild(hand0);

		this.updata();

	}

	public rigth():void
	{
		this._handSP.x+=6;
		if(this._handSP.x>1170){
			this._handSP.x=1170;
		}
	}
	public left():void
	{
		this._handSP.x-=6;
		if(this._handSP.x<90){
			this._handSP.x=90;
		}
	}

	public startGrab():void
	{
		if(this.isTweening){
			return;
		}
		this.isTweening=true;
		var onComplete: Function = function () {
			if(this.hitTestFun){
				var p:egret.Point=this._hand_bottomSP.localToGlobal(this._hand2.x+this._hand2.width*0.5 ,this._hand2.y+this._hand2.height*0.5);
				this.hitTestFun.apply(this.parent,[p.x,p.y]);
			}
			egret.Tween.get(this._hand_mid,{onChange:this.updata,onChangeObj:this }).to({height: 200 }, 1000, egret.Ease.quadInOut).call(this.endGrab, this);
		}

		egret.Tween.get(this._hand_mid,{onChange:this.updata,onChangeObj:this}).to({height: 400}, 1000, egret.Ease.quadOut).call(onComplete, this);
		
	}
	public endGrab():void
	{
		this.isTweening=false;
		if(this.endGraspFun){
			this.endGraspFun.apply(this.parent);
		}
	}

	public reset():void
	{
		this.isTweening=false;
	}

	private updata():void
	{
		
		this._hand_bottomSP.x=this._hand_mid.x-33;
		this._hand_bottomSP.y=this._hand_mid.y+this._hand_mid.height-20;
	}
}