class SoundPlayer extends Step{

	private _sound: egret.Sound;
    private _channel: egret.SoundChannel;
	private _loop:number;
    private _volume:number;

	public constructor() {
        super();
	}

    /**
	 * 执行func，结束后会跳到下一步
	 */
	public exec( func:Function , thisObj:any) : SoundPlayer {
		this.m_taskList.push({type:StepType.exec, data:{func:func, thisObj:thisObj}});
		
		//下一帧执行
		egret.setTimeout(()=>{
			this.check();
		}, this, 0);

		return this;
	}

    public playRes(key:string, loop=1, volume=1) : SoundPlayer 
    {
        Println("playRes key:"+key+" loop:"+loop+" volume:"+volume);

        let task = {type:"playRes", data:{key:key, loop:loop, volume:volume}};

        if(this.m_waitting)
        {
            this.m_taskList.push(task);
		
            //下一帧执行
            egret.setTimeout(()=>{
                this.check();
            }, this, 0);
        }
        else
        {
           //不要等到下一帧，因为safari会禁止自动播放音频
           this.doPlayRes(task);
        }

		return this;
    }


    protected checkTask(task:any) {
        super.checkTask(task);
        if(task.type=="playRes"){
			this.doPlayRes(task);
		}
    }

    private doPlayRes(task:any) {
        this.m_waitting = true;
		let key:string = task.data.key;
        this._loop = task.data.loop;
        this._volume = task.data.volume;
	
        this.stopSound();
        this._sound = RES.getRes(key);
        this._channel = this._sound.play(0, this._loop);
        this._channel.volume = this._volume;
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);

        Println("doPlayRes key:"+key+" sound:"+this._sound);
    }

	
    private stopSound():void {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    }

	//播放完成
    private onPlayComplete(e:egret.Event):void {
        this.stopSound();
		this.m_waitting = false;		//等待结束
		this.check();
    }


    public clear(){
        super.clear();
        this.stopSound();
    }
}