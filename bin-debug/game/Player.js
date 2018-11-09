var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this) || this;
            //超出屏幕比例返回屏幕可能会滚动
            _this.SCREEN_SCALE = 2 / 3;
            //角色在地图上的位置
            _this.player_map_pos = [0, 0];
            if (Player._instance) {
                return _this;
            }
            _this.initSkin();
            _this.addEvent();
            return _this;
        }
        Object.defineProperty(Player, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new Player();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.initSkin = function () {
            var img = new egret.Bitmap();
            img.texture = RES.getRes("form2_png");
            this.addChild(img);
            this.width = img.texture.textureWidth;
            this.height = img.texture.textureHeight;
        };
        Player.prototype.addEvent = function () {
            var _this = this;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this, true);
            document.addEventListener("keydown", function (key) {
                _this.onKeyDown(key.keyCode);
            });
        };
        Player.prototype.onTouch = function (e) {
            console.log("点击了");
        };
        Player.prototype.onKeyDown = function (keyCode) {
            console.log(keyCode);
            var direction = "";
            switch (keyCode) {
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
                    break;
                //右
                case 39:
                    direction = "right";
                    break;
            }
            this.playerMove(direction);
        };
        /***
         * @param direction "up" "down" "left" "right"
         */
        Player.prototype.playerMove = function (direction) {
            if (direction == "") {
                return;
            }
            var x = 0;
            var y = 0;
            switch (direction) {
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
                    break;
                //右
                case "right":
                    x += Player.step;
                    break;
            }
            var screenW = game.GameLayerManage.stage.stageWidth;
            var screenH = game.GameLayerManage.stage.stageHeight;
            var isRuning = false;
            //滚动地图
            if (x < 0 && this.x < screenW * (1 - this.SCREEN_SCALE) ||
                x > 0 && this.x > screenW * this.SCREEN_SCALE ||
                y < 0 && this.y < screenH * (1 - this.SCREEN_SCALE) ||
                y > 0 && this.y > screenH * this.SCREEN_SCALE) {
                //和角色方向相反
                isRuning = game.GameMap.instance.runing(-x, -y);
            }
            //玩家移动
            if (!isRuning) {
                if (x < 0 && this.player_map_pos[0] > 0) {
                    this.x += x;
                    this.player_map_pos[0] += x;
                }
                if (x > 0 && this.player_map_pos[0] < game.GameMap.MAP_WIDTH - this.width) {
                    this.x += x;
                    this.player_map_pos[0] += x;
                }
                if (y < 0 && this.player_map_pos[1] > 0) {
                    this.y += y;
                    this.player_map_pos[1] += y;
                }
                if (y > 0 && this.player_map_pos[1] < game.GameMap.MAP_HIGHT - this.height) {
                    this.y += y;
                    this.player_map_pos[1] += y;
                }
            }
            else {
                this.player_map_pos[0] += x;
                this.player_map_pos[1] += y;
            }
        };
        Player._instance = null;
        //步长
        Player.step = 10;
        return Player;
    }(egret.Sprite));
    game.Player = Player;
    __reflect(Player.prototype, "game.Player");
})(game || (game = {}));
//# sourceMappingURL=Player.js.map