class CardView extends egret.Sprite{

	private m_mc:egret.MovieClip;
	private m_content:egret.Bitmap;

	public image:string;
	public audio:string;
	public cardName:string;

	public constructor( image:string, audio:string, cardName:string) {
		super();
		this.image = image;
		this.audio = audio;
		this.cardName = cardName;

		this.m_mc = DisplayUtil.createMovieClipByName("card")
		this.addChild(this.m_mc);
		this.m_mc.gotoAndStop("none");
		
		this.m_content = DisplayUtil.createBitmapByName(this.image);
		this.m_content.x = 40;
		this.m_content.y = 50;
		this.m_content.width = this.m_content.height = 180;
		this.addChild(this.m_content);
	}

	//重置
	public reset(){
		this.m_mc.gotoAndStop("none");
	}

	//答错
	public wrong(){
		this.m_mc.gotoAndPlay("wrong",1);
		egret.Tween.get(this).wait(1000).to({alpha:0, scaleX:0, scaleY:0}, 300);

		let matrix = [
			0.212671, 0.71516, 0.072169, 0, 0, 
			0.212671, 0.71516, 0.072169, 0, 0, 
			0.212671, 0.71516, 0.072169, 0, 0, 
			0, 0, 0, 1, 0
			];
		this.filters = [new egret.ColorMatrixFilter(matrix)];
	}

	//答对
	public right(){
		this.m_mc.gotoAndPlay("right",1);
		egret.Tween.get(this).wait(1000).to({alpha:0, scaleX:0, scaleY:0}, 300);
	}
}