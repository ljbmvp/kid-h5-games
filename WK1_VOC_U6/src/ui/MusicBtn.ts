class MusicBtn extends BaseBox{
	
	private btn:egret.Bitmap;
	private m_state = 1;

	public constructor() {
		super();

		this.btn = DisplayUtil.createBitmapByName("musicBtn_png");
		this.addChild(this.btn);
		this.btn.touchEnabled = true;
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}

	private onTouchTap(){
		this.m_state = (this.m_state + 1) % 2;   //取值0,1
		this.btn.texture = this.m_state==0 ? RES.getRes("muteBtn_png") : RES.getRes("musicBtn_png");
		this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
	}

	public get state(){return this.m_state;}
}