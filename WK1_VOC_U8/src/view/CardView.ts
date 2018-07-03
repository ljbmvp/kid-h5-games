class CardView extends egret.Sprite{

	private m_FG:egret.MovieClip;
	private m_BG:egret.MovieClip;
	private m_content:egret.Bitmap;
	private m_shakeLine:egret.Bitmap;
	private m_love:egret.MovieClip;
	private m_container:egret.Sprite;

	public image:string;
	public audio:string;
	public cardName:string;

	public constructor(image:string, audio:string, cardName:string) {
		super();
		this.image = image;
		this.audio = audio;
		this.cardName = cardName;

		this.m_BG = DisplayUtil.createMovieClipByName("circular2");
		this.addChild(this.m_BG);

		this.m_container = new egret.Sprite();
		this.addChild(this.m_container);

		this.m_FG = DisplayUtil.createMovieClipByName("circular");
		this.m_container.addChild(this.m_FG);
		
		
		this.m_content = DisplayUtil.createBitmapByName(this.image);
		this.m_content.width = this.m_content.height = 240;
		this.m_content.x = -this.m_content.width/2;
		this.m_content.y = -this.m_content.height/2;
		this.m_container.addChild(this.m_content);

		this.m_shakeLine = DisplayUtil.createBitmapByName("shakeLine_png");
		this.m_shakeLine.x = -143;
		this.m_shakeLine.y = -139;
		this.addChild(this.m_shakeLine);
		this.m_shakeLine.visible = false;

		this.m_love = DisplayUtil.createMovieClipByName("love");
		this.addChild(this.m_love);
		this.m_love.stop();
		this.m_love.visible = false;
		this.m_love.y = -140;
	}

	public dispose(){
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.m_container);
		this.m_FG = null;
		this.m_BG = null;
		this.m_content = null;
	}

	public roll(){
		egret.Tween.get(this.m_container).to({rotation:-360}, 1000).call(this.roll,this);
	}

	//答错
	public wrong(){
		this.m_shakeLine.visible = true;
		this.m_FG.visible = false;
		let self = this;
		EffectUtils.shakeObj(self, ()=>{
			EffectUtils.shakeObj(self, ()=>{
				egret.Tween.get(self).to({alpha:0}, 500);
			});
		});
		this.touchEnabled = false;
	}

	//答对
	public right(){
		this.m_love.visible = true;
		this.m_love.play();
		egret.Tween.removeTweens(this.m_FG);
		egret.Tween.get(this).wait(1000).to({alpha:0}, 500);
		this.touchEnabled = false;
	}
}