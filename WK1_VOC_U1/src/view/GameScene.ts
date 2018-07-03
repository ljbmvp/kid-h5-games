//游戏场景
class GameScene extends egret.Sprite{

	private m_bg:egret.Bitmap;							//背景
	private m_cloud1:egret.Bitmap;						//云彩1
	private m_cloud2:egret.Bitmap;						//云彩2
	private m_cloud3:egret.Bitmap;						//云彩3

	public constructor() {
		super();

		//背景
		this.m_bg = DisplayUtil.createBitmapByName("scene_jpg");
        this.addChild(this.m_bg);

		//云1
		this.m_cloud1 = DisplayUtil.createBitmapByName("cloud1_png");
		this.m_cloud1.x = 115;
		this.m_cloud1.y = 104;
		this.addChild(this.m_cloud1)
		//云2
		this.m_cloud2 = DisplayUtil.createBitmapByName("cloud2_png");
		this.m_cloud2.x = 500;
		this.m_cloud2.y = 77;
		this.addChild(this.m_cloud2)
		//云3
		this.m_cloud3 = DisplayUtil.createBitmapByName("cloud3_png");
		this.m_cloud3.x = 1360;
		this.m_cloud3.y = 110;
		this.addChild(this.m_cloud3)

	}

	public onRender(){
		this.moveCloud(this.m_cloud1, 1);
		this.moveCloud(this.m_cloud2, 2);
		this.moveCloud(this.m_cloud3, 2.2);
	}
	

	//移动云彩
	private moveCloud(obj:egret.DisplayObject, speed:number)
	{
		obj.x += speed;
		if(obj.x > Game.instance.stageW){
			obj.x = - obj.width;
		}
	}

	
}