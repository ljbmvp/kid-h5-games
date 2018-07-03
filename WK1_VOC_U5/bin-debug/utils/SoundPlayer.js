var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SoundPlayer = (function (_super) {
    __extends(SoundPlayer, _super);
    function SoundPlayer() {
        return _super.call(this) || this;
    }
    /**
     * 执行func，结束后会跳到下一步
     */
    SoundPlayer.prototype.exec = function (func, thisObj) {
        var _this = this;
        this.m_taskList.push({ type: StepType.exec, data: { func: func, thisObj: thisObj } });
        //下一帧执行
        egret.setTimeout(function () {
            _this.check();
        }, this, 0);
        return this;
    };
    SoundPlayer.prototype.playRes = function (key, loop, volume) {
        var _this = this;
        if (loop === void 0) { loop = 1; }
        if (volume === void 0) { volume = 1; }
        Println("playRes key:" + key + " loop:" + loop + " volume:" + volume);
        var task = { type: "playRes", data: { key: key, loop: loop, volume: volume } };
        if (this.m_waitting) {
            this.m_taskList.push(task);
            //下一帧执行
            egret.setTimeout(function () {
                _this.check();
            }, this, 0);
        }
        else {
            //不要等到下一帧，因为safari会禁止自动播放音频
            this.doPlayRes(task);
        }
        return this;
    };
    SoundPlayer.prototype.checkTask = function (task) {
        _super.prototype.checkTask.call(this, task);
        if (task.type == "playRes") {
            this.doPlayRes(task);
        }
    };
    SoundPlayer.prototype.doPlayRes = function (task) {
        this.m_waitting = true;
        var key = task.data.key;
        this._loop = task.data.loop;
        this._volume = task.data.volume;
        this.stopSound();
        this._sound = RES.getRes(key);
        this._channel = this._sound.play(0, this._loop);
        this._channel.volume = this._volume;
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
        Println("doPlayRes key:" + key + " sound:" + this._sound);
    };
    SoundPlayer.prototype.stopSound = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    //播放完成
    SoundPlayer.prototype.onPlayComplete = function (e) {
        this.stopSound();
        this.m_waitting = false; //等待结束
        this.check();
    };
    SoundPlayer.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.stopSound();
    };
    return SoundPlayer;
}(Step));
__reflect(SoundPlayer.prototype, "SoundPlayer");
//# sourceMappingURL=SoundPlayer.js.map