class CardManager extends egret.EventDispatcher {

	private m_cardArr:Array<CardView>;				
	private m_speedY = 0;							
	private m_speedX = -8;
	private m_minX = 1420;
	private m_json:any;
	private m_count:number;
	private m_touchSound:SoundPlayer;
	public canMove:boolean = true;

	public constructor() {
		super();
		
	}

	public init(json:any){
		this.m_json = json;
		this.m_cardArr = Array<CardView>();
		this.m_touchSound = new SoundPlayer();
	}

	
	public onRender(){

		let maxX = 0;
		for(let i=0; i<this.m_cardArr.length; i++)
		{
			maxX = Math.max(this.m_cardArr[i].x, maxX);
		}
		if(maxX < this.m_minX)
		{
			this.addCard();
		}

		if(this.canMove)
		{
			this.moveCard();
		}
	}

	private addCard(){

		//添加一个卡片，保证这个卡片在界面中没有重复
		let arr:Array<any> = this.m_json.list.concat();
		
		for(let i=arr.length-1; i>=0; i--)
		{
			let item = arr[i];

			for(let j=0; j<this.m_cardArr.length; j++)
			{
				if(item.name == this.m_cardArr[j].cardName)
				{
					arr.splice(i, 1);	
					break;
				}
			}
		}

		if(arr.length == 0){
			Println("当前没有可以添加的卡牌");
			return;
		}

		let idx = MathUtil.random(0, arr.length-1);
		let data = arr[idx];
		
		
		let card = new CardView(data.image, data.audio, data.name);
		card.touchEnabled = true;
		card.x = Game.instance.stageW + 200;
		card.y = 850;
		card.roll();
		card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
		Game.instance.sceneLayer.addChild(card);
		this.m_cardArr.push(card);
		this.m_count++;
	}

	public start(){
		this.canMove = true;
		this.reset();
		this.addCard();
	}

	private moveCard(){
		for (let i = this.m_cardArr.length-1 ; i >= 0 ; i--) 
		{
			let card = this.m_cardArr[i];
			card.x += this.m_speedX;
			if(card.x <= -400)
			{
				this.m_cardArr.splice(i,1);
				card.dispose();
			}
		}
	}


	private onTouchCard(e:egret.Event)
	{
		//播放点击卡片音效
		this.m_touchSound.playRes("U2VOC01_mp3");

		let evt = new egret.Event("TOUCH_CARD");
		evt.data = e.currentTarget;
		this.dispatchEvent(evt);
	}

	public reset(){
		//移除全部
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			DisplayUtil.remove(card);
			card.dispose();
		}
		this.m_cardArr.length = 0;
		this.m_count = 0;
	}

	public wrong(){
		
	}

	public hideCard(){
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			card.visible = false;
		}
	}
	
}