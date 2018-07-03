class Game extends egret.Sprite{

	static instance:Game;

	static WIN_NUM:number = 5;
	static FAIL_NUM:number = 3;

	static GAME_INIT:string = "game_init";
	static GAME_PLAY:string = "game_play";
	static GAME_OVER:string = "game_over";
	private m_state:string = Game.GAME_INIT;

	private m_uiLayer:egret.Sprite;
	private m_screenLayer:egret.Sprite;

	
	//背景音乐
	private m_bgSound:SoundPlayer;
	//题目声音
	private m_qSound:SoundPlayer;
	//音效
	private m_effSound:SoundPlayer;
	//打雷音效
	private m_thunderSound:SoundPlayer;

	//开始按钮
	private m_gameStartBox:GameStartBox;
	//计分板
	private m_scoreBoard:ScoreBoard;
	//repeat按钮
	private m_repeatBtn:egret.Bitmap;
	private m_playAgainBtn:egret.Bitmap;
	private m_tryAgainBtn:egret.Bitmap;
	//音乐按钮
	private m_musicBtn:MusicBtn;
	private m_cardManager:CardManager;
	private m_gameScene:GameScene;
	private m_role1:RoleView;

	//题目原始数组
	private m_qList:Array<any>;
	//剩余题目数组，每回合
	private m_laveList:Array<any>;
	//当前题目数据
	private m_curQuestion:any;
	//当前是否处于答题中（点击Card）
	private m_answering:Boolean;
	//正确的数量
	private m_rightCount:number = 0;
	private m_failCount:number = 0;
	

	public constructor() {
		super();
	}

	public run(){
		Game.instance = this;

		let json = RES.getRes("config_json");
		this.m_qList = json.list;
		this.m_laveList = new Array();

		this.m_bgSound = new SoundPlayer();
		this.m_qSound = new SoundPlayer();
		this.m_effSound = new SoundPlayer();

		//场景层
		this.m_screenLayer = new egret.Sprite();
		this.addChild(this.m_screenLayer);

		//UI层
		this.m_uiLayer = new egret.Sprite();
		this.m_uiLayer.touchEnabled = this.m_uiLayer.touchChildren = true;
		this.addChild(this.m_uiLayer);
		
		//卡牌
        this.m_cardManager = new CardManager();
		this.m_cardManager.init(json);
		this.m_cardManager.addEventListener("TOUCH_CARD", this.onTouchCard, this);

		//游戏场景
		this.m_gameScene = new GameScene();
		this.m_screenLayer.addChild(this.m_gameScene);

		//角色
		this.m_role1 = new RoleView("role1");
		this.m_role1.x = 80;
		this.m_role1.y = 300;
		this.m_role1.scaleX = this.m_role1.scaleY = 1.3;
		this.m_screenLayer.addChild(this.m_role1);

		//计分板
		this.m_scoreBoard = new ScoreBoard();
		this.m_scoreBoard.show(false, BoxAlign.right_top, new egret.Point(-50,50));

		//音乐按钮
		this.m_musicBtn = new MusicBtn();
		this.m_musicBtn.show(false, BoxAlign.right_bottom, new egret.Point(-50,-50));
		this.m_musicBtn.addEventListener(egret.Event.CHANGE, this.updateBgMusic, this);

		//repeat按钮
		this.m_repeatBtn = DisplayUtil.createBitmapByName("repatBtn_png");
		this.m_repeatBtn.touchEnabled = true;
		this.m_repeatBtn.x = this.m_musicBtn.x;
		this.m_repeatBtn.y = this.m_musicBtn.y - 120;
		this.uiLayer.addChild(this.m_repeatBtn);
		this.m_repeatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
			if(this.m_curQuestion != null){
				this.m_qSound.playSync(this.m_curQuestion.audio);
			}
		},this);

		//playAgain按钮
		this.m_playAgainBtn = DisplayUtil.createBitmapByName("playAgainBtn_png");
		this.m_playAgainBtn.touchEnabled = true;
		this.m_playAgainBtn.x = this.m_repeatBtn.x;
		this.m_playAgainBtn.y = this.m_repeatBtn.y;
		this.m_playAgainBtn.visible = false;
		this.uiLayer.addChild(this.m_playAgainBtn);
		this.m_playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
			this.gamePlay();
		},this);

		this.m_tryAgainBtn = DisplayUtil.createBitmapByName("tryAgainBtn_png");
		this.m_tryAgainBtn.touchEnabled = true;
		this.m_tryAgainBtn.x = this.m_repeatBtn.x;
		this.m_tryAgainBtn.y = this.m_repeatBtn.y;
		this.m_tryAgainBtn.visible = false;
		this.uiLayer.addChild(this.m_tryAgainBtn);
		this.m_tryAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
			this.gamePlay();
		},this);


		this.addEventListener(egret.Event.ENTER_FRAME, this.onRender, this);

		//游戏初始状态
		this.m_state = Game.GAME_INIT;
		//显示开始按钮
		this.m_gameStartBox = new GameStartBox();
		this.m_gameStartBox.once("START", this.gamePlay, this);
		this.m_gameStartBox.show(true);
	}

	private onRender(){
		if(this.m_state == Game.GAME_PLAY){
			this.m_role1.onRender();

			//如果当前处于答题中，就不移动
			if(!this.m_answering){
				this.m_cardManager.move();
			}
		}
	}


	//开始游戏
	private gamePlay()
    {
		this.m_state = Game.GAME_PLAY;

		//隐藏开始按钮
		this.m_gameStartBox.hide();
		
		//显示泡泡
		this.m_gameScene.reset();

		//人物设置为空闲状态
		this.m_role1.state = RoleState.idle;

		//播放背景音乐
        this.updateBgMusic();

		//重置分数
		this.m_rightCount = 0;
		this.m_scoreBoard.setScore(0);
		this.m_failCount = 0;

		//重置题目
		this.m_laveList = this.m_qList.concat();
		ArrayUtil.randomSort(this.m_laveList);
		//提问
		this.question();

		//发射卡牌
		this.m_cardManager.start();
    }

	//提问一个新问题
	private question()
	{
		this.m_answering = false;
		this.m_repeatBtn.visible = true;
		this.m_playAgainBtn.visible = false;
		this.m_tryAgainBtn.visible = false;
		
		if(this.m_laveList.length == 0){
			this.m_laveList = this.m_qList.concat();
			ArrayUtil.randomSort(this.m_laveList);
		}
		 this.m_curQuestion = this.m_laveList.shift();
		 //播放题目语音
		 this.m_qSound.playSync(this.m_curQuestion.audio);
	}


	//点击了卡牌
	private onTouchCard(e:egret.Event){
		if(this.m_answering){
			return;
		}
		let self = this;
		self.m_answering = true;
		self.m_repeatBtn.visible = false;
		self.m_qSound.stop();
		let cardView:CardView = e.data;

		//回答正确
		if(cardView.cardName == self.m_curQuestion.name)
		{
			//正确数+1
			self.m_rightCount += 1;

			//添加星星
			this.m_scoreBoard.setScore(self.m_rightCount);
			
			//答对音效（叮咚）
			self.m_effSound.playSync("U6VOC02_mp3");
			self.m_role1.state = RoleState.happy;
			//卡片泡泡隐藏，图片发黄光，然后渐渐消失
			cardView.right(()=>{

				//全部答对
				if(self.m_rightCount >= Game.WIN_NUM)
				{
					self.m_gameScene.victory();
					self.m_gameScene.spark();
					self.m_role1.state = RoleState.celebrate;
					self.m_effSound.playSync("U6VOC04_mp3",()=>{	//庆祝音效
					self.m_role1.state = RoleState.celebrate_speak;
					self.m_effSound.playSync("U6VOC-OS01_mp3",()=>{	//woo
					self.m_effSound.playSync("U6VOC-OS02_mp3",()=>{	//do your wait ?
						self.m_role1.state = RoleState.celebrate;
						self.m_playAgainBtn.visible = true;
						
						self.m_state = Game.GAME_OVER;
						self.submit(true);
					});
					});
					
					});
					
					self.m_cardManager.hide();					//隐藏全部卡牌
					
				}
				else{
					cardView.visible = false;					//隐藏当前卡牌
					//继续答题
					self.question();
					self.m_role1.state = RoleState.idle;
				}
			});
		}
		else
		{
			//回答错误
			self.m_failCount += 1;

			egret.setTimeout(()=>{
				


				self.m_role1.state = RoleState.sad;	//难过
				cardView.boom();					//爆炸
				//答错音效
				self.m_effSound.playSync("U6VOC03_mp3", ()=>{

					if(self.m_failCount >= Game.FAIL_NUM)
					{
						//游戏失败
						this. m_thunderSound = new SoundPlayer();
						this.m_thunderSound.playSync("U6VOC05_mp3");	//打雷音效

						this.m_gameScene.snow();	//下雪
						
						self.m_role1.state = RoleState.sad_mouth;
						self.m_effSound.playSync("U6VOC-OS03_mp3", ()=>{//Oh No
						self.m_role1.state = RoleState.fail;
						self.m_effSound.playSync("U6VOC06_mp3", ()=>{//失败特效音
						
						self.m_effSound.playSync("U6VOC-OS04_mp3", ()=>{//两人说：还玩一次吗？
							
							self.m_tryAgainBtn.visible = true;
							self.m_state = Game.GAME_OVER;
							self.submit(false);
						});
						});
						});
						self.m_cardManager.hide();					//隐藏全部卡牌
					}
					else{
						cardView.visible = false;					//隐藏当前卡牌
						//继续答题
						self.question();
						self.m_role1.state = RoleState.idle;
					}
				});
			},self, 500);
		}
	}

	//点击音乐按钮
	private updateBgMusic(){
		if(this.m_musicBtn.state == 0){
			this.m_bgSound.stop();
		}else{
			this.m_bgSound.playSync("bgmusic_mp3",null,0);
		}
	}

	//提交游戏结果
	private submit(isComplete:boolean):void
	{
		let theRequest = GetRequestObject();

		GameOver(isComplete, ()=>{
			
			//入口是任务中心，不需要显示任何UI
			if(theRequest.taskId !=0 ){
				return;
			}

			if(isComplete){
				SetSuccessPanelVisible(true);	//显示成功UI
			}
			else{
				SetFailPanelVisible(true);		//显示失败UI
			}
			
		});
	}

	public get uiLayer() {return this.m_uiLayer;}
	public get screenLayer(){return this.m_screenLayer;}
	public get stageW(){return this.stage.stageWidth;}
	public get stageH(){return this.stage.stageHeight;}
}