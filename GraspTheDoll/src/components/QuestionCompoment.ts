class QuestionCompoment extends egret.Sprite {
	private _xml:egret.XML;
	private _allList=new Array();
	private _imgList=new Array();
	private _qIDArr=new Array();
	private _nowIDArr=new Array();
	private _itemArr=new Array();
	private _answerID:number=-1;
	private _gameData:any;
	public root:string="data/";
	 /**
     * 对应要加载的资源组名称
     */
    private resGroupName:String="unit1";
	private isResourceLoadEnd: boolean = false;
	private _isStart:boolean=false;
	private m_tipsSound:SoundPlayer;
	public constructor() {
		super();
		this.initContent();
	}
	private initContent():void
	{
		this._gameData = RES.getRes("conf_json");
		this.loadImg();
		
		this.m_tipsSound = new SoundPlayer();
	}	

	private loadImg():void
	{
		for(let i=0; i<this._gameData.items.length; i++)
		{
			let imgKey:string = this._gameData.items[i].img;
			let bitmap:egret.Bitmap = new egret.Bitmap(RES.getRes(imgKey));
			bitmap.width = bitmap.height = 150;
			bitmap.name=String(i);
			this._imgList.push(bitmap);
			this._qIDArr.push(i);
		}

		if(this._isStart){
			this.createQuestion();
		}

		// var count=0;
		// let imgLoader:egret.ImageLoader = new egret.ImageLoader;					 	
		// imgLoader.addEventListener( egret.Event.COMPLETE,(e)=>{
		// 	let texture = new egret.Texture();
		// 	texture._setBitmapData(e.currentTarget.data);
		// 	let bitmap:egret.Bitmap = new egret.Bitmap(texture);
		// 	//bitmap.anchorOffsetX=bitmap.width*0.5;
		// 	//bitmap.anchorOffsetY=bitmap.height*0.5;
		// 	bitmap.name=String(count);
		// 	this._imgList.push(bitmap);
		// 	this._qIDArr.push(count);
		// 	count++;
		// 	if(count>=this._gameData.items.length)
		// 	{
		// 		if(this._isStart){
		// 			this.createQuestion();
		// 		}
		// 	}else
		// 	{
								
		// 		load(this.root+this._gameData.items[count].img);
		// 	}
		// },this);
		// function load(url)
		// {
		// 	imgLoader.load(url);
		// }
		// load(this.root+this._gameData.items[count].img);

	}

	public createQuestion():void
	{
		this._isStart=true;
		var tim:number=250*this.numChildren;
		for(let j:number=0;j<this.numChildren;j++){
			egret.Tween.get(this.getChildAt(j)).to({y: 514+50,alpha:0}, 1000, egret.Ease.quadInOut);
		}
		egret.setTimeout(this.newQuestion,this,tim);
		
	}	 

	private newQuestion():void
	{
		while (this.numChildren>0) {	
			this.removeChildAt(0);
		}		

		//this._itemArr.length=0;
		//egret.log("numChildren---",this.numChildren,this._itemArr.length);
		let copyArr:Array<any>=this._qIDArr.slice();
		this._nowIDArr.length=0;
		//egret.log("----",this._qIDArr.length);
		for(let i:number=0;i<4&&i<this._qIDArr.length;i++){
			this._nowIDArr.push(this.getRandomArr(copyArr));
			let qid=this._nowIDArr[i];
			let bmp=this._imgList[qid];			
			let item:CardComponent=new CardComponent(i,bmp,qid);
			item.name="item_"+qid;
			item.x=120+308*i;
			item.y=514;
			item.alpha=0;
			item.y=514+50;
			this.addChild(item);
			egret.setTimeout(a=>{
				egret.Tween.get(item).to({y: 514,alpha:1}, 1000, egret.Ease.quadInOut);
			},this,100*i)
			//egret.log("----",item.x);
			//this._itemArr.push(item);
		}
		copyArr=this._nowIDArr.slice();
		if(copyArr.indexOf(this._answerID)!=-1){
			copyArr.splice(copyArr.indexOf(this._answerID),1);
		}
		this._answerID=this.getRandomArr(copyArr);

		this.repeat();
	}

	public repeat(){
		this.m_tipsSound.clear();
		this.m_tipsSound.playRes(this._gameData.items[this._answerID].audio);
	}

	public hitTestFun(pX:number,pY:number):boolean
	{
		let isTrue:boolean=false;
		for(var i:number=0;i<this._qIDArr.length;i++){
			let item:CardComponent=this.getChildByName("item_"+this._qIDArr[i]) as CardComponent;
			let isHit:boolean=item.hitObj.hitTestPoint( pX, pY, false );
			if(isHit){
				if(item.name==("item_"+this._answerID)){
					isTrue=true;
				}
				
				egret.Tween.get(item).to({y: 314}, 1000, egret.Ease.quadInOut);
			}
		}
		let item:CardComponent=this.getChildByName("item_"+this._qIDArr[this._answerID]) as CardComponent;
		EffectUtils.blinkEffect(item, 2000);
		//var p:egret.Point=item.globalToLocal(pX,pY);		
		//isTrue= item.hitObj.hitTestPoint( pX, pY, false );
		if(isTrue){
			EffectUtils.showTips("回答正確",4,true);
		}else{
			EffectUtils.showTips("回答錯誤",4);
		}
		
       
		return isTrue;
	}
	
	private getRandomArr(arr:Array<any>):any
	{
		return arr.splice (Math.random()*arr.length, 1)[0];
	}
}