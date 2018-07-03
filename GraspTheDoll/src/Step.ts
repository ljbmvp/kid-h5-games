enum StepType{
	wait,
	exec,
	block
}


class Step {

    protected m_waitting : boolean;
    protected m_taskList : Array<any>;
	protected m_timeId : number;

	public constructor() {
		this.m_taskList = [];
	}

	/**
	 * 等待
	 */
	public wait(delay:number) : Step
	{
		this.m_taskList.push({type:StepType.wait, data:delay});
		
		//下一帧执行
		egret.setTimeout(()=>{
			this.check();
		}, this, 0);

		return this;
	}

	/**
	 * 执行func，结束后会跳到下一步
	 */
	public exec( func:Function , thisObj:any) : Step {
		this.m_taskList.push({type:StepType.exec, data:{func:func, thisObj:thisObj}});
		
		//下一帧执行
		egret.setTimeout(()=>{
			this.check();
		}, this, 0);

		return this;
	}

	/**
	 * 阻塞执行，func调用结束后，不会跳到下一步
	 */
	public block( func:Function, thisObj:any ) : Step {
		this.m_taskList.push({type:StepType.block, data:{func:func, thisObj:thisObj}});
		
		//下一帧执行
		egret.setTimeout(()=>{
			this.check();
		}, this, 0);

		return this;
	}
	
	public next(){
		this.m_waitting = false;
		egret.clearTimeout(this.m_timeId);
		this.check();
	}

	public clear(){
		this.m_waitting = false;
		egret.clearTimeout(this.m_timeId);
		this.m_taskList.length = 0;
	}

	protected check() {
		
		if(this.m_waitting)return;

		if(this.m_taskList.length > 0){
			let task = this.m_taskList.shift();
			this.checkTask(task);
		}
		else{
			//没有任务了

		}
	}

	protected checkTask(task:any){
		if(task.type==StepType.wait){
			this.doWait(task);
		}
		else if(task.type==StepType.exec){
			this.doExec(task);
		}
		else if(task.type==StepType.block){
			this.doBlock(task);
		}
	}

	private doWait(task:any){
		let delay:number = task.data;
		this.m_waitting = true;				//设置为等待中
		this.m_timeId = egret.setTimeout(()=>{
			this.m_waitting = false;		//等待结束
			this.check();
		}, this, delay);
	}

	private doExec(task:any){
		let func:Function = task.data.func;
		let thisObj:any = task.data.thisObj;
		func.call(thisObj);
		this.check();
	}

	private doBlock(task:any){
		this.m_waitting = true;
		let func:Function = task.data.func;
		let thisObj:any = task.data.thisObj;
		func.call(thisObj);
	}

}




class Workflow {
	
	private m_step:Step;
	private m_list:Array<any>;

	public constructor() {
		this.m_step = new Step();
		this.m_list = [];
	}

	public addWait(delay){
		this.m_list.push({type:StepType.wait, data:delay});
	}

	public addExec(func:Function , thisObj:any){
		this.m_list.push({type:StepType.exec, data:{func:func, thisObj:thisObj}});
	}

	public addBlock( func:Function, thisObj:any ) {
		this.m_list.push({type:StepType.block, data:{func:func, thisObj:thisObj}});
	}

	public run(){
		this.m_step.clear();
		for(let i=0; i<this.m_list.length; i++)
		{
			let item = this.m_list[i];
			if(item.type == StepType.wait){
				this.m_step.wait(item.data);
			}
			else if(item.type == StepType.exec){
				this.m_step.exec(item.func, item.thisObj);
			}
			else if(item.type == StepType.block){
				this.m_step.block(item.func, item.thisObj);
			}
		}
	}

	public next(){
		this.m_step.next();
	}
}