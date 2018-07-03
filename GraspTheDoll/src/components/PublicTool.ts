class PublicTool {
	public static stageWidth:number;
	public static stageHeight:number;

	public static resWidth:number=1366;
	public static resHeight:number=1024;
	public static topSP:egret.Sprite;
	//全局字体颜色表--可以扩展
    public static TextColors = {
        white: 0xFFFFFF,//白色
        milkWhite: 0xfbf1af,//乳白色 
        grayWhite: 0xceb6a2,//灰白色
        yellow: 0xffff00,//金黄色 
        lightYellow: 0xffd375,//淡黄色
        orangeYellow: 0xff9900,//橘黄色//道具名称 //玩家姓名
        red: 0xf11300,//红色
        green: 0x00e500,//绿色 
        blue: 0x1a94d7,//蓝色 
        grayBlue: 0x2f5177,//墨蓝色 
        purple: 0xe938f2,//紫色 
        pink: 0xFF3030,//粉色 
        black: 0x2e2d2d,//黑色
        golden: 0xFFD700 //金色
    }

	public constructor() {
	}

	public static createBitmapByName(name: string): egret.Bitmap {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}

	/**
	*更改显示对象的坐标，按照舞台UI设计的比例，根据当前stage的宽高自适应
	* @param disObj 
	* @param x 
	* @param y 
	*/	
	public static setXY(disObj:egret.DisplayObject,x:number,y:number):void
	{
		disObj.x=x/this.resWidth*this.stageWidth;
		disObj.y=y/this.resHeight*this.stageHeight;
	}
}