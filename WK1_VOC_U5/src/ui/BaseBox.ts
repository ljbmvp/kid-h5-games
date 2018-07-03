enum BoxAlign
{
	left_top,
	top,
	right_top,
	right,
	right_bottom,
	bottom,
	left_bottom,
	left,
	center
}

class BaseBox extends egret.Sprite{
	public constructor() {
		super();
	}

	public show(mode:boolean, align:BoxAlign = BoxAlign.center, offset:egret.Point = new egret.Point(0,0)){
		if(mode){
			Game.instance.uiLayer.addChild(this.maskUI);
		}
		Game.instance.uiLayer.addChild(this);

		switch(align){
			case BoxAlign.left_top:
			this.x = 0;
			this.y = 0;
			break;
			
			case BoxAlign.top:
			this.x = (Game.instance.stageW - this.width) / 2;
			this.y = 0;
			break;

			case BoxAlign.right_top:
			this.x = Game.instance.stageW - this.width;
			this.y = 0;
			break;

			case BoxAlign.right:
			this.x = Game.instance.stageW - this.width;
			this.y =  (Game.instance.stageH - this.height) / 2;
			break;

			case BoxAlign.right_bottom:
			this.x = Game.instance.stageW - this.width;
			this.y =  Game.instance.stageH - this.height;
			break;

			case BoxAlign.bottom:
			this.x = (Game.instance.stageW - this.width) / 2;
			this.y =  Game.instance.stageH - this.height;
			break;

			case BoxAlign.left_bottom:
			this.x = 0;
			this.y =  Game.instance.stageH - this.height;
			break;

			case BoxAlign.left:
			this.x = 0;
			this.y =  (Game.instance.stageH - this.height) / 2;
			break;

			case BoxAlign.center:
			this.x = (Game.instance.stageW - this.width) / 2;
			this.y = (Game.instance.stageH - this.height) / 2;
			break;
		}

		this.x += offset.x;
		this.y += offset.y;
		
	}

	public hide(dispose:boolean=false){
		DisplayUtil.remove(this);
		DisplayUtil.remove(this.m_mask);
		if(dispose){
			this.dispose();
		}
	}

	public dispose(){
		this.m_mask = null;
	}

	private m_mask:egret.Sprite;
	private get maskUI(){
		if(this.m_mask==null){
			this.m_mask = new egret.Sprite();
			this.m_mask.touchEnabled=true;
		}
		this.m_mask.graphics.clear();
		this.m_mask.graphics.beginFill(0x000000, 0.5);
		this.m_mask.graphics.drawRect(0, 0, Game.instance.stageW, Game.instance.stageH);
		this.m_mask.graphics.endFill();
		return this.m_mask;
	}
}