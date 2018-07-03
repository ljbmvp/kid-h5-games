class CountStars extends egret.Sprite {

     private static NUM:number=10;
     private static MOVEDIS:number=60;
	public count:any=0;
	private _topMask:egret.Shape;
	public constructor() {
		super();
		this.initContent();
	}

	private initContent()
	{

	    let gstars = PublicTool.createBitmapByName("startBarBG_png");
        this.addChild(gstars);
        let stars= PublicTool.createBitmapByName("startBar_png");
        this.addChild(stars);
        

        this._topMask = new egret.Shape();
        this.addChild( this._topMask);
        
         this._topMask.graphics.beginFill(0x000000, 1);
         this._topMask.graphics.drawRect(0, 0, CountStars.MOVEDIS*CountStars.NUM, 51);
         this._topMask.graphics.endFill();
        
       

        stars.mask = this._topMask;
     
	  	this._topMask.x=(this.count-CountStars.NUM)*CountStars.MOVEDIS;
        
       
    }

    public add():void {
        
        if(this.count>=10)return;
        this.count++;
         this._topMask.x=(this.count-CountStars.NUM)*CountStars.MOVEDIS;
    }

     public cut():void {
        
        if(this.count<=0)return;
        this.count--;
         this._topMask.x=(this.count-CountStars.NUM)*CountStars.MOVEDIS;
    }


    public reset()
    {
        this.count=0;
        this._topMask.x=(this.count-CountStars.NUM)*CountStars.MOVEDIS;
    }
}