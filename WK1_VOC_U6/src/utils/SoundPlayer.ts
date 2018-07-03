class SoundPlayer {

	private _sound: egret.Sound;
    private _channel: egret.SoundChannel;
	private _loop:number;
	private _completeCallback:Function;
	public constructor() {
	}


    public playSync(key:string, complete:Function=null, loop:number=1): void {

		this.stop();
		this._loop = loop;
		this._completeCallback = complete;
        var sound: egret.Sound = this._sound = RES.getRes(key);
        this.play();
    }

	//播放
    private play():void {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(0, this._loop);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
    }

	//停止
    public stop():void {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    }

	//播放完成
    private onComplete(e:egret.Event):void {
        this.stop();
		if(this._completeCallback!=null){
			this._completeCallback();
		}
    }
}