class CardComponent extends egret.Sprite {
	/**
	 * 本卡片在题目中的索引；用以判断答题是否正确；
	 */
	public qID:number;
	private _bg:egret.Bitmap;
	private _img:egret.Bitmap;
	public hitObj:egret.Sprite;
	private _conSP:egret.Bitmap;

	/**
	*生成题目卡片，卡片背景有4种。
	* @param id		卡片背景索引，0--3；
	* @param bitmap	卡片题目的图片；
	* @param qID	本卡片在题目中的索引；用以判断答题是否正确；
	*/
	public constructor(id:number,bitmap:egret.Bitmap,qID:number) {
		super();
		this.qID=qID;
		this.initContent(id,bitmap);
		this.once(egret.Event.REMOVED_FROM_STAGE,this.onREMOVED_FROM_STAGE,this);
	}

	private initContent(id:number,bitmap:egret.Bitmap)
	{
		this._bg=PublicTool.createBitmapByName("card"+id+"_png");
		this.addChild(this._bg);
		this._img=bitmap;
		this._img.x=(this._bg.width-this._img.width)*0.5;
		this._img.y=(this._bg.height-this._img.height)*0.5;
		this.addChild(this._img);
		var rt:egret.RenderTexture = new egret.RenderTexture;
		let rectClip:egret.Rectangle=new egret.Rectangle(0,0,this._bg.width,this._bg.height);
        rt.drawToTexture( this,rectClip );
		this._conSP=new egret.Bitmap();
        this._conSP.texture = rt;
		this.removeChild(this._bg);
		this.removeChild(this._img);
		this.addChild(this._conSP);

		this.hitObj=new egret.Sprite;
		this.hitObj.graphics.beginFill(0,0);
		this.hitObj.graphics.drawRect(0,0,this._bg.width*0.5,this._bg.height*0.5);
		this.hitObj.graphics.endFill();		
		this.hitObj.x=this._bg.width*0.25;
		this.hitObj.y=this._bg.height*0.25;
		this.hitObj.cacheAsBitmap=true;
		this.addChild(this.hitObj);
	}
	
	private onREMOVED_FROM_STAGE(e:egret.Event):void
	{
		//this=null;
		if(this._bg){
			//this.removeChild(this._bg);
			//this._bg.texture.dispose();
		}
		if(this._img){
			//this.removeChild(this._img);
			//this._img.texture.dispose();
		}
		this.removeChild(this.hitObj);
	}
}