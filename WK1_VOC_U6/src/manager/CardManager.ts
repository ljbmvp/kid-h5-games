//负责卡牌的管理

class CardManager extends egret.EventDispatcher {

	private m_cardArr:Array<CardView>;
	private m_speedY = 6;							//卡牌下落速度


	public constructor() {
		super();
		this.m_cardArr = Array<CardView>();
	}

	public init(json:any){
		
		for(let i=0; i<json.list.length; i++)
        {
			let cardView = new CardView(i, json.list[i].image, json.list[i].audio, json.list[i].name);
            cardView.name = "card"+i;
            this.m_cardArr.push(cardView);
			cardView.touchEnabled = true;
			cardView.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchCard, this);
        }
	}

	public start(){
		for (let i = 0; i < this.m_cardArr.length; i++) 
		{
			let card = this.m_cardArr[i];
			Game.instance.uiLayer.addChild(card);
			card.x= 480 + 380 * i;
			card.y= -200 - 400 * i;
			card.visible=true;
			card.touchEnabled = true;
			card.reset();
		}
	}

	public move(){

		for (let i = 0; i < this.m_cardArr.length; i++) 
		{
			let card = this.m_cardArr[i];
			card.y += this.m_speedY;
			if(card.y >= 1300)
			{
				card.y= -200;
				card.reset();
			}
		}
	}

	public hide(){
		for (let i = 0; i < this.m_cardArr.length; i++) 
		{
			let card = this.m_cardArr[i];
			DisplayUtil.remove(card);
		}
	}


	private onTouchCard(e:egret.TouchEvent)
	{
		let cardView = e.currentTarget as CardView;
		let evt = new egret.Event("TOUCH_CARD");
		evt.data = cardView;
		this.dispatchEvent(evt);
	}
}