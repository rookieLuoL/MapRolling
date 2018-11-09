module game {

	/**游戏层级管理*/
	export class GameLayerManage {

		//舞台
		public static stage:egret.Stage;

		//游戏层
		public static gameLayer:egret.Sprite = new egret.Sprite();
		//UI层
		public static UILayer:egret.Sprite = new egret.Sprite();
		//提示层
		public static promptLayer:egret.Sprite = new egret.Sprite();

		public static initManage(stage:egret.Stage):void{
			this.stage = stage;
			stage.addChild(GameLayerManage.gameLayer);
			stage.addChild(GameLayerManage.UILayer);
			stage.addChild(GameLayerManage.promptLayer);
		}

	}
}