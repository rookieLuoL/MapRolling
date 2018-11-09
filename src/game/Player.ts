module game {
	export class Player extends egret.Sprite{
		private static _instance:Player = null;
		//步长
		public static step:number = 10;
		//超出屏幕比例返回屏幕可能会滚动
		private SCREEN_SCALE:number = 2/3;

		//角色在地图上的位置
		private player_map_pos:Array<number> = [0,0];

		public constructor() {
			super();
			if(Player._instance){
				return;
			}
			this.initSkin();
			this.addEvent();
		}

		public static get instance():Player{
			if(this._instance == null){
				this._instance = new Player();
			}
			return this._instance;
		}

		private initSkin():void{
			let img : egret.Bitmap = new egret.Bitmap()
			img.texture = RES.getRes("form2_png");
			this.addChild(img);

			this.width = img.texture.textureWidth;
			this.height = img.texture.textureHeight;
		}

		private addEvent():void{
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this,true);
			document.addEventListener("keydown",(key)=>{
				this.onKeyDown(<number>key.keyCode);
			})
		}

		private onTouch(e:egret.TouchEvent):void{
			console.log("点击了");
			
		}

		private onKeyDown(keyCode:number):void{
			console.log(keyCode);
			let direction :string = "";
			switch(keyCode){
					//上
					case 38:
						direction = "up";
						break;
					//下
					case 40:
						direction = "down";
						break;
					//左
					case 37:
						direction = "left";
						break
					//右
					case 39:
						direction = "right";
						break;
			}
			this.playerMove(direction);
		}

		/***
		 * @param direction "up" "down" "left" "right"
		 */
		private playerMove(direction:string):void{
			if(direction == ""){
				return;
			}
			let x:number = 0;
			let y:number = 0;
			switch(direction){
				//上
				case "up":
					y -= Player.step;
					break;
				//下
				case "down":
					y += Player.step;
					break;
				//左
				case "left":
					x -= Player.step;
					break
				//右
				case "right":
					x += Player.step;
					break;
			}

			let screenW:number = GameLayerManage.stage.stageWidth;
			let screenH:number = GameLayerManage.stage.stageHeight;
			let isRuning:boolean = false;
			//滚动地图
			if(x<0 && this.x < screenW*(1-this.SCREEN_SCALE) || 
				x>0 && this.x> screenW*this.SCREEN_SCALE || 
				y<0 && this.y< screenH*(1-this.SCREEN_SCALE) || 
				y>0 && this.y> screenH*this.SCREEN_SCALE) {

				 //和角色方向相反
				 isRuning = game.GameMap.instance.runing(-x,-y);
			}
			//玩家移动
			if(!isRuning){
				if(x<0 && this.player_map_pos[0]>0){
					this.x += x;
					this.player_map_pos[0] += x;
				}
				if(x>0 && this.player_map_pos[0]<GameMap.MAP_WIDTH-this.width){
					this.x += x;
					this.player_map_pos[0] += x;
				}
				if(y<0 && this.player_map_pos[1]>0){
					this.y += y;
					this.player_map_pos[1] += y;
				}
				if(y>0 && this.player_map_pos[1]<GameMap.MAP_HIGHT-this.height){
					this.y += y;
					this.player_map_pos[1] += y;
				}
			}
			else{
				this.player_map_pos[0] += x;
				this.player_map_pos[1] += y;
			}	
		}



	}
}