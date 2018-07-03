class GraspTheDoll extends egret.Sprite{

	private _bg:egret.Bitmap;
	private _leftBtn:EButton;
	private _rightBtn:EButton;
	private _getBtn:EButton;
	private _loves:CountLoves;
    private _stars:CountStars;
	private _hand:HandComponent;
	private _bgSound:egret.Sound;
	private _bgChannel: egret.SoundChannel;
	private _startBtn:EButton;
	private _next:EButton;
	private m_repeatBtn:EButton;
	private _startBG:egret.Sprite;
	private _question:QuestionCompoment;
	private _isRight:boolean;
	private _isOver:boolean;
	private _gameDone:egret.Bitmap;
	private _gameOver:egret.Sprite;
	public constructor() {
		super();

		if(this.stage)
		{
			 this.initContent();
		}else
		{
			let timer=new egret.Timer(100,0);
			  timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			   timer.start();
		}
		
        
    }

	private timerFunc(event:egret.TimerEvent)
	{
		
		if(this.stage)
		 {
			 (event.currentTarget as egret.Timer).stop();
			 RES.getResAsync('bgmusic_mp3',(data)=>{
            	this._bgSound=data;  
				this.initContent();
        	 },this);			  
		 }
	}

	private initContent()
	{
		PublicTool.stageWidth=this.stage.stageWidth;
		PublicTool.stageHeight=this.stage.stageHeight;
		this._bg=PublicTool.createBitmapByName("bg_png");
		this._bg.width=PublicTool.stageWidth;
		this._bg.height=PublicTool.stageHeight;
		this.addChild(this._bg);

		this._hand=new HandComponent();
		this.addChild(this._hand);

		this._loves=new CountLoves();
        this.addChild(this._loves);
        this._loves.x=200;
        this._loves.y=16;

        this._stars=new CountStars();
        this.addChild(this._stars);
        this._stars.x=755;
        this._stars.y=24;

		this._question=new QuestionCompoment();
		this.addChild(this._question);

		 
		 this._leftBtn = new EButton(this, "leftBtn_png", this.onLeftBtnBegin, this.onLeftBtnEnd,"", 30, 3, null);
		 PublicTool.setXY(this._leftBtn,345,864);
		 this.addChild(this._leftBtn);
		 this._rightBtn = new EButton(this, "rightBtn_png", this.onRightBtnBegin,this.onRightBtnEnd, "", 30, 3, null);
		 PublicTool.setXY(this._rightBtn,850,864);
		 this.addChild(this._rightBtn);
		 this._getBtn = new EButton(this, "getBtn_png", this.onGetBtnClick,null, "", 30, 3, null);
		 PublicTool.setXY(this._getBtn,605,828);
		 this.addChild(this._getBtn);

		 this._startBG=new egret.Sprite();		 
		 this._startBG.graphics.beginFill(0,0.5);
		 this._startBG.graphics.drawRect(0,0,PublicTool.stageWidth,PublicTool.stageHeight);
		 this._startBG.graphics.endFill();
		 this._startBG.touchEnabled = true;
		 this.addChild(this._startBG);

		this._next = new EButton(this, "next_png", null,null, "", 30, 3, null);
        this.addChild(this._next);
        this._next.$touchEnabled=true;
        this._next.x=this.stage.stageWidth-this._next.width - 50;
        this._next.y=880;
        this._next.visible = false;

		 this.m_repeatBtn = new EButton(this, "repeat_png", null,null, "", 30, 3, null);
		 this.addChild(this.m_repeatBtn);
		 this.m_repeatBtn.$touchEnabled=true;
		this.m_repeatBtn.x=this._next.x;
		this.m_repeatBtn.y=this._next.y;
		this.m_repeatBtn.visible = true;
		this.m_repeatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.repeat, this);

		this._startBtn=new EButton(this, "start_png", null,null, "", 30, 3, null);
		 this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnClick,this);
		 this._startBtn.x=(PublicTool.stageWidth-this._startBtn.width)*0.5;
		 this._startBtn.y=(PublicTool.stageHeight-this._startBtn.height)*0.5;
		 this._startBG.addChild(this._startBtn);

		 this._gameDone=PublicTool.createBitmapByName("gameDone_png");
		 this.addChild(this._gameDone);
		 this._gameDone.visible=false;
		 this._gameDone.touchEnabled = true;
		 this._gameDone.alpha=0;

		 this._gameOver=new egret.Sprite();
		 let overBG:egret.Bitmap=PublicTool.createBitmapByName("gameOver_png");
		 this._gameOver.addChild(overBG);
		 let tryAgainBtn= new EButton(this, "tryAgain_png", null,this.resetCon, "", 30, 3, null);
		 tryAgainBtn.x=(PublicTool.stageWidth- tryAgainBtn.width)*0.5;
		 tryAgainBtn.y=580;
		 this._gameOver.addChild(tryAgainBtn);
		 this._gameOver.alpha=0;
		 this._gameOver.visible=false;
		 this._gameOver.touchEnabled = true;
		 this.addChild(this._gameOver);

		 this._hand.hitTestFun=this.hitTest;
         this._hand.endGraspFun=this.endGrasp;
	}
	public onStartBtnClick(event: egret.TouchEvent):void
	{
		if(!this._bgChannel){
			this._bgChannel = this._bgSound.play(0, 0);
       		this._bgChannel.volume=0.5;
			//alert("playBGMusic"+this._bgSound+this._bgChannel);
		}
		var onComplete: Function = function () {			
			this.showQuestion();
		}
		if(this._startBG.visible){
			egret.Tween.get(this._startBG).to({ alpha: 0,visible:false}, 800).call(onComplete, this);
		}
		
	}
	private showQuestion():void
	{
		this._question.createQuestion();
	}

	public hitTest(pX:number,pY:number):void
	{
		//console.log("***",this._question);		
		//console.log("???",pX,pY);
		let isTrue:boolean=this._question.hitTestFun(pX,pY);
		//console.log(isTrue);
		if(isTrue){
			this._stars.add();
		}else{
			this._loves.cut();
		}

		if(this._loves.count<=0){
			this._isOver=true;
			egret.Tween.get(this._gameOver).to({ alpha: 1,visible:true}, 1000);

			//提交失败
			console.log("提交失败... ...")
			GameOver(false, function(){
				console.log("提交失败complete")
			});
			this.m_repeatBtn.visible = false;
		}
		if(this._stars.count>=10){
			this._isOver=true;
			egret.Tween.get(this._gameDone).to({ alpha: 1,visible:true}, 1000);

			//提交胜利
			console.log("提交胜利... ...")
			GameOver(true, function(){
				console.log("提交胜利complete")
			});
			this._next.visible =  GetRequestObject().taskId == 0;
            this.m_repeatBtn.visible = false;
		}
	}

	public endGrasp():void
	{
		if(this._isOver){
			return;
		}
		egret.setTimeout(this.showQuestion,this,2000);
		//this._question.createQuestion();
	}

	public onLeftBtnBegin(event: egret.TouchEvent):void
	{
		//console.log("leftBegin");
		if(this._hand.isTweening){
			return;
		}
		this._isRight=false;
		this.addEventListener(egret.Event.ENTER_FRAME,this.onHandMove,this);
	}
	public onLeftBtnEnd(event: egret.TouchEvent):void
	{
		this.removeEventListener(egret.Event.ENTER_FRAME,this.onHandMove,this);
	}

	public onRightBtnBegin(event: egret.TouchEvent):void
	{
		if(this._hand.isTweening){
			return;
		}
		this._isRight=true;
		this.addEventListener(egret.Event.ENTER_FRAME,this.onHandMove,this);
	}
	public onRightBtnEnd(event: egret.TouchEvent):void
	{
		this.removeEventListener(egret.Event.ENTER_FRAME,this.onHandMove,this);
	}

	private onHandMove(e:egret.Event):void
	{
		if(this._isRight){
			this._hand.rigth();
		}else{
			this._hand.left();
		}
		
	}

	public onGetBtnClick(event: egret.TouchEvent):void
	{
		this._hand.startGrab();	
	}

	public resetCon():void
	{
		this._stars.reset();
		this._loves.reset();
		this._question.createQuestion();
		this._isOver=false;
		if(this._gameOver.visible){
			egret.Tween.get(this._gameOver).to({ alpha: 0,visible:false}, 1000);
		}
		this.m_repeatBtn.visible = true;
	}

	private repeat(e:egret.TouchEvent){
       this._question.repeat();
    }

}