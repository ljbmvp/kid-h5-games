class ClockBoard extends BaseBox{

	private m_tf:egret.TextField;

	public constructor() {
		super();

		let bg = DisplayUtil.createBitmapByName("clock_png");
		this.addChild(bg);

		this.m_tf = new egret.TextField();
		this.m_tf.textColor = 0xff0000;
		this.m_tf.size = 56;
		this.m_tf.bold = true;
		this.m_tf.textAlign = egret.HorizontalAlign.CENTER;
		this.m_tf.width = 104;
		this.m_tf.height = 66;
		this.m_tf.x = 26;
		this.m_tf.y = 80;
		this.addChild(this.m_tf);
	}

	public get text():string{
		return this.m_tf.text;
	}

	public set text(value:string){
		this.m_tf.text = value;
	}
}