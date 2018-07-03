
//开始按钮
class GameStartBox extends BaseBox{

	private m_startBtn:egret.Bitmap;

	public constructor() {
		super();

		this.m_startBtn= DisplayUtil.createBitmapByName("start_png");
		this.m_startBtn.$touchEnabled=true;
		this.addChild(this.m_startBtn)
		this.m_startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
	}

	private start()
	{
		this.hide();
		this.dispatchEvent(new egret.Event("START"));
	}
	
	public dispose(){
		this.m_startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
		this.m_startBtn = null;
		super.dispose();
	}
}