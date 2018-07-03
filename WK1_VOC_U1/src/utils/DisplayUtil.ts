class DisplayUtil {
	public constructor() {
	}

	public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static createMovieClipByName(name:string): egret.MovieClip{
        let data = RES.getRes(name+"_json");
		let txtr = RES.getRes(name+"_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		return new egret.MovieClip( mcFactory.generateMovieClipData( name ) );
    }

    public static remove(obj:egret.DisplayObject){
        if(obj!=null && obj.parent!=null){
            obj.parent.removeChild(obj);
        }
    }
}