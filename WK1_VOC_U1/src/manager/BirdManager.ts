class BirdManager extends egret.EventDispatcher {

	private m_birdArr:Array<BirdView>;				//当前在舞台上的鸟
	private m_speedY = 2.5;							//卡牌下落速度
	private m_speedX = -8;
	private m_intervalTime = 3500;					//添加一只鸟的间隔时间
	private m_lastTime = 0;							//上一次添加的时间
	private m_json:any;
	private m_count:number;
	private m_touchSound:SoundPlayer;

	public constructor() {
		super();
		
	}

	public init(json:any){
		this.m_json = json;
		this.m_birdArr = Array<BirdView>();
		this.m_lastTime = 0;
		this.m_touchSound = new SoundPlayer();
	}

	
	public onRender(){
		if(egret.getTimer()-this.m_lastTime > this.m_intervalTime)
		{
			this.addBird();
		}
		this.moveBrid();
		this.moveCard();
	}

	//添加一只鸟
	private addBird(){

		this.m_lastTime = egret.getTimer();

		//添加一个卡片，保证这个卡片在界面中没有重复
		let arr:Array<any> = this.m_json.list.concat();
		
		for(let i=arr.length-1; i>=0; i--)
		{
			let item = arr[i];

			for(let j=0; j<this.m_birdArr.length; j++)
			{
				if(item.name == this.m_birdArr[j].cardName)
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
		
		
		let bird = new BirdView();
		bird.addCard(data);
		bird.x = Game.instance.stageW + 100;
		bird.y = 100 + this.m_count%2 * 150;
		bird.fly();
		bird.addEventListener("TOUCH_CARD", this.onTouchCard, this);
		Game.instance.sceneLayer.addChild(bird);
		this.m_birdArr.push(bird);
		this.m_count++;
	}

	public start(){
		this.reset();
		this.addBird();
	}

	private moveBrid(){
		for (let i = this.m_birdArr.length-1 ; i >= 0 ; i--) 
		{
			let bird = this.m_birdArr[i];
			bird.x += this.m_speedX;
			if(bird.x <= -400)
			{
				this.m_birdArr.splice(i,1);
				bird.dispose();
			}
		}
	}

	private moveCard(){
		for (let i = this.m_birdArr.length-1 ; i >= 0 ; i--) 
		{
			let bird = this.m_birdArr[i];
			if(bird.x < Game.instance.stageW - 200){
				bird.cardView.y += this.m_speedY;
			}
		}
	}


	private onTouchCard(e:egret.Event)
	{
		//播放点击卡片音效
		// this.m_touchSound.playSync("U1VOC02_mp3");
		this.m_touchSound.playRes("U1VOC02_mp3");

		let evt = new egret.Event("TOUCH_CARD");
		evt.data = e.currentTarget;
		this.dispatchEvent(evt);
	}

	public reset(){
		//移除全部鸟
		for(let i=this.m_birdArr.length-1; i>=0; i--){
			let bird = this.m_birdArr[i];
			DisplayUtil.remove(bird);
			bird.dispose();
		}
		this.m_birdArr.length = 0;
		this.m_count = 0;
	}

	public wrong(){
		for(let i=this.m_birdArr.length-1; i>=0; i--){
			let bird = this.m_birdArr[i];
			bird.fail();
			bird.cardView.visible = false;
		}
	}

		public hideCard(){
		for (let i = 0; i < this.m_birdArr.length; i++) 
		{
			let bird = this.m_birdArr[i];
			bird.cardView.visible = false;
		}
	}
	
}