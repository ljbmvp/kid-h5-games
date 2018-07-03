class BirdView extends egret.Sprite{

	private m_bird:egret.MovieClip;
	private m_card:CardView;

	public constructor() {
		super();
		this.m_bird = DisplayUtil.createMovieClipByName("bird");
		this.addChild(this.m_bird);
	}

	public fly(){
		this.m_bird.gotoAndPlay("fly", -1);
	}

	public fail(){
		//随机一个失败的状态
		let state = MathUtil.random(1,2,1);
		this.m_bird.gotoAndPlay("fail"+state, -1);
	}
	
	public jump(){
		this.m_bird.gotoAndPlay("jump");
	}

	//给小鸟添加一个口袋
	public addCard(cardData:any){
		let card = new CardView(cardData.image, cardData.audio, cardData.name);
		card.touchEnabled = true;
		card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
		this.m_card = card;
		this.m_card.x = -266;
		this.m_card.y = -133;
		this.addChildAt(this.m_card, 0);
	}
	private onTouchCard(e:egret.TouchEvent)
	{
		let evt = new egret.Event("TOUCH_CARD");
		this.dispatchEvent(evt);
	}

	public dispose(){
		DisplayUtil.remove(this.m_bird);
		this.m_bird = null;
		this.m_card.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
		DisplayUtil.remove(this.m_card);
		this.m_card = null;
	}

	public get cardName(){
		return this.m_card.cardName;
	}

	public get cardView(){
		return this.m_card;
	}
}