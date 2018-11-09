var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**游戏层级管理*/
    var GameLayerManage = (function () {
        function GameLayerManage() {
        }
        GameLayerManage.initManage = function (stage) {
            this.stage = stage;
            stage.addChild(GameLayerManage.gameLayer);
            stage.addChild(GameLayerManage.UILayer);
            stage.addChild(GameLayerManage.promptLayer);
        };
        //游戏层
        GameLayerManage.gameLayer = new egret.Sprite();
        //UI层
        GameLayerManage.UILayer = new egret.Sprite();
        //提示层
        GameLayerManage.promptLayer = new egret.Sprite();
        return GameLayerManage;
    }());
    game.GameLayerManage = GameLayerManage;
    __reflect(GameLayerManage.prototype, "game.GameLayerManage");
})(game || (game = {}));
//# sourceMappingURL=GameLayerManage.js.map