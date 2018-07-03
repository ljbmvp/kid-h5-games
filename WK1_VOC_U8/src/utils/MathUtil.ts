class MathUtil {
	
	/**
	 * 将弧度转换成角度
	 * @param radian	弧度
	 * @return 角度
	 */
	public static R2D(radian:number):number
	{
		return radian * 180 / Math.PI;
	}

	/**
	 * 将角度转换成弧度
	 * @param degress		角度
	 * @return  弧度
	 */
	public static D2R(degress:number):number
	{
		return degress * Math.PI / 180;
	}

	public static random(nMinimum:number, nMaximum:number=0, nRoundToInterval:number=1):number
	{
		if (nMinimum > nMaximum)
		{
			let nTemp=nMinimum;
			nMinimum=nMaximum;
			nMaximum=nTemp;
		}
		let nDeltaRange = (nMaximum - nMinimum) + (1 * nRoundToInterval);
		let nRandomNumber = Math.random() * nDeltaRange;
		nRandomNumber += nMinimum;
		return MathUtil.floor(nRandomNumber, nRoundToInterval);
	}

	public static floor(nNumber:number, nRoundToInterval:number=1):number
	{
		return Math.floor(nNumber / nRoundToInterval) * nRoundToInterval;
	}
}