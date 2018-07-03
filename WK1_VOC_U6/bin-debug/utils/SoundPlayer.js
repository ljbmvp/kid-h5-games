var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundPlayer = (function () {
    function SoundPlayer() {
    }
    SoundPlayer.prototype.playSync = function (key, complete, loop) {
        if (complete === void 0) { complete = null; }
        if (loop === void 0) { loop = 1; }
        this.stop();
        this._loop = loop;
        this._completeCallback = complete;
        var sound = this._sound = RES.getRes(key);
        this.play();
    };
    //播放
    SoundPlayer.prototype.play = function () {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(0, this._loop);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
    };
    //停止
    SoundPlayer.prototype.stop = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    //播放完成
    SoundPlayer.prototype.onComplete = function (e) {
        this.stop();
        if (this._completeCallback != null) {
            this._completeCallback();
        }
    };
    return SoundPlayer;
}());
__reflect(SoundPlayer.prototype, "SoundPlayer");
//# sourceMappingURL=SoundPlayer.js.map