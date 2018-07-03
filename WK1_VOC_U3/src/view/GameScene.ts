//游戏场景
class GameScene extends egret.Sprite{

	private m_bg:egret.Bitmap;							//背景
	private m_cloud1:egret.Bitmap;						//云彩1
	private m_cloud2:egret.Bitmap;						//云彩2
	private m_cloud3:egret.Bitmap;						//云彩3
	private m_paopaoArr:Array<PaoPaoView>;			//存放五颜六色的泡泡（不是卡牌）

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

		//泡泡
		this.m_paopaoArr = Array<PaoPaoView>();
		for(let i=0; i<10; i++){
			let paopao = new PaoPaoView();
			paopao.x=700+Math.random()*300;
			paopao.y=750+Math.random()*150;
			paopao.scaleX = paopao.scaleY = Math.random()*0.7+0.3;
			paopao.speedX = (Math.random()>0.5?1:-1) * (1-paopao.scaleX)*4;
			paopao.speedY = (1-paopao.scaleX)*8;
			this.m_paopaoArr.push(paopao);
		}
	}

	public onRender(){
		this.moveCloud(this.m_cloud1, 1);
		this.moveCloud(this.m_cloud2, 2);
		this.moveCloud(this.m_cloud3, 2.2);
		this.movePaopao();
	}
	

	//移动云彩
	private moveCloud(obj:egret.DisplayObject, speed:number)
	{
		obj.x += speed;
		if(obj.x > Game.instance.stageW){
			obj.x = - obj.width;
		}
	}

	private movePaopao()
	{
		for(let i=0; i<this.m_paopaoArr.length; i++){
			let paopao = this.m_paopaoArr[i];
			paopao.y -= paopao.speedY;
			paopao.x += paopao.speedX;
			
			if(paopao.y<=-10)
			{
				paopao.x=700+Math.random()*300;
				paopao.y=750+Math.random()*150;
			}
		}
	}

	public showPaoPao()
	{
		for(let i=0; i<this.m_paopaoArr.length; i++){
			let paopao = this.m_paopaoArr[i];
			this.addChild(paopao);
		}
	}

	public hidePaoPao()
	{
		for(let i=0; i<this.m_paopaoArr.length; i++){
			let paopao = this.m_paopaoArr[i];
			DisplayUtil.remove(paopao);
		}
	}
}