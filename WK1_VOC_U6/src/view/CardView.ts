class CardView extends egret.Sprite{

	private m_mc:egret.MovieClip;
	private m_content:egret.Bitmap;

	public id:number;
	public image:string;
	public audio:string;
	public cardName:string;

	public constructor(id:number, image:string, audio:string, cardName:string) {
		super();
		this.id = id;
		this.image = image;
		this.audio = audio;
		this.cardName = cardName;

		this.m_mc = DisplayUtil.createMovieClipByName("card")
		this.m_mc.x = - 150;
		this.m_mc.y = - 150;
		this.addChild(this.m_mc);
		this.m_mc.gotoAndStop("none");
		
		this.m_content = DisplayUtil.createBitmapByName(this.image);
		this.m_content.x = this.m_content.width / -2;
		this.m_content.y = this.m_content.height / -2;
		this.addChild(this.m_content);
	}

	//重置
	public reset(){
		this.visible = true;
		this.m_mc.visible = true;
		this.m_mc.gotoAndStop("none");
		this.m_content.filters = [];
		this.m_content.x = this.m_content.width / -2;
		this.m_content.y = this.m_content.height / -2;
		this.m_content.visible = true;
	}

	//爆炸
	public boom(){
		this.m_mc.visible = true;
		this.m_mc.gotoAndPlay("fail",1);
		this.m_content.visible = false;
	}

	public right(callback:Function){
		this.m_mc.visible = false;
		//图片发光
		this.m_content.filters = [new egret.GlowFilter(0xffff00, 1, 20, 20, 2)];

		egret.Tween.get(this.m_content).wait(500).to({y:-300}, 500).call(()=>{
			
			if(callback!=null){
				callback();
			}
		});
	}
}