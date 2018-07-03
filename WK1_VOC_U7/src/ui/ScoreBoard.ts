class ScoreBoard extends BaseBox{
	
	private scoreMax = 6;

	private touchCount = 0;

	public constructor() {
		super();

		for(let i=0; i<this.scoreMax; i++)
		{
			let star = DisplayUtil.createBitmapByName("starDark_png");
			star.name = "star"+(this.scoreMax-i-1);
			star.y = 0;
			star.x =  i * (star.width + 5);
			this.addChild(star);
			
			//隐藏log功能
			if(i==0){
				star.touchEnabled = true;
				star.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
					this.touchCount++;
					if(this.touchCount%20==0){
						SetLogPanelVisible(false);
					}
					else if(this.touchCount%10==0){
						SetLogPanelVisible(true);
					}
				},this);
			}
		}
	}

	//设置分数
	public setScore(value:number)
	{
		for(let i=0; i<this.scoreMax; i++)
		{
			let star = this.getChildByName("star"+i) as egret.Bitmap;
			let texture: egret.Texture;
			if(value >= i+1)
			{
				texture = RES.getRes("starLight_png");
			}
			else{
				texture = RES.getRes("starDark_png");
			}
			star.texture = texture;
		}
	}


}