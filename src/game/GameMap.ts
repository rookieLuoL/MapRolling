module game {
	export class GameMap extends egret.Sprite{
		private static _instance:GameMap = null;

		private map_texture:egret.Texture;
		public static MAP_WIDTH:number = 2000;
		public static MAP_HIGHT:number = 2000;
		//水平方向
		private	 h_mapCount:number = 0;
		//垂直方向
		private	v_mapCount:number = 0;
		private map_textureWidth:number = 0;
		private map_textureHeight:number = 0;
		private _mapCache:Array<egret.Bitmap> = new Array<egret.Bitmap>();

		private _currMoveX:number = 0;
		private _minXIndex:number = 0;
		private _maxXIndex:number = 0;
		private _currMoveY:number = 0;
		private _minYIndex:number = 0;
		private _maxYIndex:number = 0;

		public constructor() {
			super();

			if(GameMap._instance){
				return;
			}

			this.map_texture = RES.getRes("egret_icon_png");
			this.map_textureWidth = this.map_texture.textureWidth;
			this.map_textureHeight = this.map_texture.textureHeight;
			this.createMap();
		}

		public static get instance():GameMap{
			if(this._instance == null){
				this._instance = new GameMap();
			}
			return this._instance;
		}

		private createMap():void{
			let min_width:number = GameLayerManage.stage.stageWidth+2*this.map_textureWidth;
			let min_hight:number = GameLayerManage.stage.stageHeight+2*this.map_textureHeight;

			this.h_mapCount = min_width%this.map_textureWidth == 0 ? Math.floor(min_width/this.map_textureWidth) : (Math.floor(min_width/this.map_textureWidth)+1);
			this.v_mapCount = min_hight%this.map_textureHeight == 0 ? Math.floor(min_hight/this.map_textureHeight) : (Math.floor(min_hight/this.map_textureHeight)+1);

			let len:number = this.h_mapCount*this.v_mapCount;

			for(let i = 0;i<len;i++){
				let img:egret.Bitmap = new egret.Bitmap();
				img.texture = this.map_texture;
				img.x = (i%this.h_mapCount)*this.map_textureWidth;
				img.y = Math.floor(i/this.h_mapCount)*this.map_textureHeight;
				this.addChild(img);
				this._mapCache.push(img);
			}
			this._maxXIndex = this.h_mapCount-1;
			this._maxYIndex = this.v_mapCount-1;

			this.width = this.h_mapCount*this.map_textureWidth;
			this.height = this.v_mapCount*this.map_textureHeight;
		}

		public runing(moveX:number,moveY:number):boolean{
			let isXRunging:boolean = true;
			let isYRunging:boolean = true;
			let x:number = this.x + moveX;
			let y:number = this.y + moveY;
			this._currMoveX += moveX;
			this._currMoveY += moveY;
			//左移动
			if(moveX<0 && this.x <= GameLayerManage.stage.stageWidth - GameMap.MAP_WIDTH){
				x = GameLayerManage.stage.stageWidth - GameMap.MAP_WIDTH;
				this._currMoveX = 0;
				isXRunging = false;
			}
			//右移动
			if(moveX >0 && this.x >= 0){
				x = 0;
				this._currMoveX = 0;
				isXRunging = false;
			}
			//上移动
			if(moveY <0 && this.y<=GameLayerManage.stage.stageHeight - GameMap.MAP_HIGHT){
				y = GameLayerManage.stage.stageHeight - GameMap.MAP_HIGHT;
				this._currMoveY = 0;
				isYRunging = false;
			}
			//下移动
			if(moveY >0 && this.y>=0){
				y = 0;
				this._currMoveY = 0;
				isYRunging = false;
			}

			this.x= x;
			this.y= y;

			//最左边一列
			if(isXRunging && this._currMoveX <= -this.map_textureWidth-Player.step){
				let len:number = this._mapCache.length;
				for(let i = 0;i<len;i++){
					let img:egret.Bitmap = this._mapCache[i];
					if(img.x == this._minXIndex*this.map_textureWidth){
						img.x = (this._maxXIndex+1)*this.map_textureWidth;
					}
				}
				this._minXIndex +=1;
				this._maxXIndex +=1;
				this._currMoveX = 0;
			}
			//最右边一列
			if(isXRunging && this._currMoveX >= this.map_textureWidth-Player.step){
				let len:number = this._mapCache.length;
				for(let i = 0;i<len;i++){
					let img:egret.Bitmap = this._mapCache[i];
					if(img.x == ((this._maxXIndex)*this.map_textureWidth)){
						img.x = (this._minXIndex-1)*this.map_textureWidth;
					}
				}
				this._minXIndex -=1;
				this._maxXIndex -=1;
				this._currMoveX = 0;
			}

			//最上边一列
			if(isYRunging && this._currMoveY <= -this.map_textureHeight-Player.step){
				let len:number = this._mapCache.length;
				for(let i = 0;i<len;i++){
					let img:egret.Bitmap = this._mapCache[i];
					if(img.y == this._minYIndex*this.map_textureHeight){
						img.y = (this._maxYIndex+1)*this.map_textureHeight;
					}
				}
				this._minYIndex +=1;
				this._maxYIndex +=1;
				this._currMoveY = 0;
			}
			//最下边一列
			if(isYRunging && this._currMoveY >= this.map_textureHeight-Player.step){
				let len:number = this._mapCache.length;
				for(let i = 0;i<len;i++){
					let img:egret.Bitmap = this._mapCache[i];
					if(img.y == ((this._maxYIndex)*this.map_textureHeight)){
						img.y = (this._minYIndex-1)*this.map_textureHeight;
					}
				}
				this._minYIndex -=1;
				this._maxYIndex -=1;
				this._currMoveY = 0;
			}

			console.log(this._currMoveY);
			
			return isXRunging && isYRunging;
		}


	}
}