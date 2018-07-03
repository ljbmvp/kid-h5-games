var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StepType;
(function (StepType) {
    StepType[StepType["wait"] = 0] = "wait";
    StepType[StepType["exec"] = 1] = "exec";
    StepType[StepType["block"] = 2] = "block";
})(StepType || (StepType = {}));
var Step = (function () {
    function Step() {
        this.m_taskList = [];
    }
    /**
     * 等待
     */
    Step.prototype.wait = function (delay) {
        var _this = this;
        this.m_taskList.push({ type: StepType.wait, data: delay });
        //下一帧执行
        egret.setTimeout(function () {
            _this.check();
        }, this, 0);
        return this;
    };
    /**
     * 执行func，结束后会跳到下一步
     */
    Step.prototype.exec = function (func, thisObj) {
        var _this = this;
        this.m_taskList.push({ type: StepType.exec, data: { func: func, thisObj: thisObj } });
        //下一帧执行
        egret.setTimeout(function () {
            _this.check();
        }, this, 0);
        return this;
    };
    /**
     * 阻塞执行，func调用结束后，不会跳到下一步
     */
    Step.prototype.block = function (func, thisObj) {
        var _this = this;
        this.m_taskList.push({ type: StepType.block, data: { func: func, thisObj: thisObj } });
        //下一帧执行
        egret.setTimeout(function () {
            _this.check();
        }, this, 0);
        return this;
    };
    Step.prototype.next = function () {
        this.m_waitting = false;
        egret.clearTimeout(this.m_timeId);
        this.check();
    };
    Step.prototype.clear = function () {
        this.m_waitting = false;
        egret.clearTimeout(this.m_timeId);
        this.m_taskList.length = 0;
    };
    Step.prototype.check = function () {
        if (this.m_waitting)
            return;
        if (this.m_taskList.length > 0) {
            var task = this.m_taskList.shift();
            this.checkTask(task);
        }
        else {
            //没有任务了
        }
    };
    Step.prototype.checkTask = function (task) {
        if (task.type == StepType.wait) {
            this.doWait(task);
        }
        else if (task.type == StepType.exec) {
            this.doExec(task);
        }
        else if (task.type == StepType.block) {
            this.doBlock(task);
        }
    };
    Step.prototype.doWait = function (task) {
        var _this = this;
        var delay = task.data;
        this.m_waitting = true; //设置为等待中
        this.m_timeId = egret.setTimeout(function () {
            _this.m_waitting = false; //等待结束
            _this.check();
        }, this, delay);
    };
    Step.prototype.doExec = function (task) {
        var func = task.data.func;
        var thisObj = task.data.thisObj;
        func.call(thisObj);
        this.check();
    };
    Step.prototype.doBlock = function (task) {
        this.m_waitting = true;
        var func = task.data.func;
        var thisObj = task.data.thisObj;
        func.call(thisObj);
    };
    return Step;
}());
__reflect(Step.prototype, "Step");
var Workflow = (function () {
    function Workflow() {
        this.m_step = new Step();
        this.m_list = [];
    }
    Workflow.prototype.addWait = function (delay) {
        this.m_list.push({ type: StepType.wait, data: delay });
    };
    Workflow.prototype.addExec = function (func, thisObj) {
        this.m_list.push({ type: StepType.exec, data: { func: func, thisObj: thisObj } });
    };
    Workflow.prototype.addBlock = function (func, thisObj) {
        this.m_list.push({ type: StepType.block, data: { func: func, thisObj: thisObj } });
    };
    Workflow.prototype.run = function () {
        this.m_step.clear();
        for (var i = 0; i < this.m_list.length; i++) {
            var item = this.m_list[i];
            if (item.type == StepType.wait) {
                this.m_step.wait(item.data);
            }
            else if (item.type == StepType.exec) {
                this.m_step.exec(item.func, item.thisObj);
            }
            else if (item.type == StepType.block) {
                this.m_step.block(item.func, item.thisObj);
            }
        }
    };
    Workflow.prototype.next = function () {
        this.m_step.next();
    };
    return Workflow;
}());
__reflect(Workflow.prototype, "Workflow");
//# sourceMappingURL=Step.js.map