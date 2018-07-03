//游戏场景
class GameScene extends egret.Sprite{

	private m_bg:egret.Bitmap;							//背景

	public constructor() {
		super();

		//背景
		this.m_bg = DisplayUtil.createBitmapByName("scene_jpg");
        this.addChild(this.m_bg);

		
	}

	public onRender(){
	
	}
	

	

	
}