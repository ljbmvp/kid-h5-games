//游戏场景
class GameScene extends egret.Sprite{

	private m_bg:egret.Bitmap;							//背景
	private m_cloud1:egret.Bitmap;						//云彩1
	private m_cloud2:egret.Bitmap;						//云彩2
	private m_cloud3:egret.Bitmap;						//云彩3
	private m_cloud4:egret.Bitmap;
	private m_cloud5:egret.Bitmap;

	public constructor() {
		super();

		//背景
		this.m_bg = DisplayUtil.createBitmapByName("scene_png");
        this.addChild(this.m_bg);

		//云1
		this.m_cloud1 = DisplayUtil.createBitmapByName("yun1_png");
		this.m_cloud1.x = 87;
		this.m_cloud1.y = 172;
		this.addChild(this.m_cloud1)
		//云2
		this.m_cloud2 = DisplayUtil.createBitmapByName("yun2_png");
		this.m_cloud2.x = 556;
		this.m_cloud2.y = 103;
		this.addChild(this.m_cloud2)
		//云3
		this.m_cloud3 = DisplayUtil.createBitmapByName("yun3_png");
		this.m_cloud3.x = 887;
		this.m_cloud3.y = 236;
		this.addChild(this.m_cloud3)

		this.m_cloud4 = DisplayUtil.createBitmapByName("yun4_png");
		this.m_cloud4.x = 1268;
		this.m_cloud4.y = 115;
		this.addChild(this.m_cloud4)

		this.m_cloud5 = DisplayUtil.createBitmapByName("yun5_png");
		this.m_cloud5.x = 1739;
		this.m_cloud5.y = 160;
		this.addChild(this.m_cloud5)

	}

	public onRender(){
		this.moveCloud(this.m_cloud1, 1);
		this.moveCloud(this.m_cloud2, 1);
		this.moveCloud(this.m_cloud3, 1);
		this.moveCloud(this.m_cloud4, 1);
		this.moveCloud(this.m_cloud5, 1);
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