class CountLoves extends egret.Sprite {
    private static MOVEDIS:number=74;
    private static NUM:number=3;
    public count:any=3;
    private _topMask:egret.Shape;
    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {

      
        let love_panel = this.createBitmapByName("heartBarBG_png");
        this.addChild(love_panel);
        let love= this.createBitmapByName("heartBar_png");
        this.addChild(love);
        love.name="love";
        //love.anchorOffsetX = -25;
        //love.anchorOffsetY = -14;

        this._topMask = new egret.Shape();
        this.addChild( this._topMask);
         this._topMask.name="mask";
         this._topMask.graphics.beginFill(0x000000, 1);
         this._topMask.graphics.drawRect(0, 0, CountLoves.MOVEDIS*CountLoves.NUM, 51);
         this._topMask.graphics.endFill();
         this._topMask.anchorOffsetX = -25;
         this._topMask.anchorOffsetY = -14;
       

        love.mask = this._topMask;

         this._topMask.x=(this.count-CountLoves.NUM)*CountLoves.MOVEDIS;
     
        
       
    }

    public add():void {
        
        if(this.count>=CountLoves.NUM)return;
        this.count++;
         this._topMask.x=(this.count-CountLoves.NUM)*CountLoves.MOVEDIS;
    }

     public cut():void {
        
        if(this.count<=0)return;
        this.count--;
         this._topMask.x=(this.count-CountLoves.NUM)*CountLoves.MOVEDIS;
    }

    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private createDisobj(array: Array<egret.DisplayObject>): egret.Sprite {
        let result = new egret.Sprite();
        for(var i:number=0;i<array.length;i++)
        {
            result.addChild(array[i])
        }
        return result;
    }

    public reset()
    {
        this.count=CountLoves.NUM;
        this._topMask.x=(this.count-CountLoves.NUM)*CountLoves.MOVEDIS;
    }
}
