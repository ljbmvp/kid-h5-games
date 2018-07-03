class PaoPaoView extends egret.Bitmap{
	public speedX:number;
	public speedY:number;
	public constructor() {
		super();
		if(Math.random()>0.5)
		{
			this.texture = RES.getRes("paopao1_png");
		}
		else{
			this.texture = RES.getRes("paopao2_png");
		}
	}
}