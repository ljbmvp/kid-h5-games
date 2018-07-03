class ArrayUtil {
	public constructor() {
	}

	public static randomSort(array:Array<any>)
	{
		let tempArr:Array<any> = array.concat();
		array.length = 0;
			
		while(tempArr.length>0)
		{
			let outIdx = MathUtil.random(0,tempArr.length-1);
			let obj:Object = tempArr.splice(outIdx,1)[0];
			array.push(obj);
		}
	}
}