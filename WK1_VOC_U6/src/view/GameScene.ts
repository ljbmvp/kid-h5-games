//游戏场景
class GameScene extends egret.Sprite{

	private m_bg:egret.Bitmap;							//背景
	private m_bg2:egret.Bitmap;							//胜利的背景
	private m_snow:egret.Bitmap;
	private m_spark:egret.Bitmap;

	public constructor() {
		super();

		//背景
		this.m_bg = DisplayUtil.createBitmapByName("scene_jpg");
        this.addChild(this.m_bg);

		this.m_bg2 = DisplayUtil.createBitmapByName("scene2_jpg");
		this.m_spark = DisplayUtil.createBitmapByName("spark_png");
		this.m_snow = DisplayUtil.createBitmapByName("snow_png");
	}

	public reset(){
		this.addChild(this.m_bg);
		DisplayUtil.remove(this.m_bg2);
		egret.Tween.removeTweens(this.m_spark);
		DisplayUtil.remove(this.m_spark);
		egret.Tween.removeTweens(this.m_snow);
		DisplayUtil.remove(this.m_snow);
	}

	//显示胜利背景
	public victory(){
		this.addChild(this.m_bg2);
		DisplayUtil.remove(this.m_bg);
	}

	//放烟花
	public spark(){
		Game.instance.screenLayer.addChild(this.m_spark);
		this.m_spark.y = 200;
		this.m_spark.alpha = 0;
		egret.Tween.get(this.m_spark).to({alpha:1,y:0},2000).wait(1000).to({alpha:0,y:200},1500);
	}
	
	//下雪
	public snow(){
		Game.instance.screenLayer.addChild(this.m_snow);
		this.m_snow.blendMode = egret.BlendMode.ADD;
		this.m_snow.alpha = 0.5;
		egret.Tween.get(this.m_snow).to({x:-100},0).wait(200).to({x:0},0).wait(200).call(this.snow,this);
	}
}