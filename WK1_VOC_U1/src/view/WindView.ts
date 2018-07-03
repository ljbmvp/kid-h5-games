//刮风
class WindView extends egret.Sprite{
	
	private m_view:egret.Bitmap;

	public constructor() {
		super();
		this.m_view = DisplayUtil.createBitmapByName("wind_png");
		this.addChild(this.m_view);
	}

	public show(layer:egret.Sprite){
		layer.addChild(this);
		this.playTween();
	}

	private playTween(){
		this.m_view.alpha = 0;
		this.m_view.x = 398;
		this.m_view.y = 120;
		egret.Tween.get(this.m_view).to({x:288.15, y:244.05, alpha:1}, 600).wait(300).to({x:206.2, y:356, alpha:0}, 400).call(()=>{
			this.playTween();
		}, this);
	}

	public hide(){
		egret.Tween.removeTweens(this.m_view);
		DisplayUtil.remove(this);
	}
}