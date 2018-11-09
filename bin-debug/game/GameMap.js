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
    var GameMap = (function (_super) {
        __extends(GameMap, _super);
        function GameMap() {
            var _this = _super.call(this) || this;
            //水平方向
            _this.h_mapCount = 0;
            //垂直方向
            _this.v_mapCount = 0;
            _this.map_textureWidth = 0;
            _this.map_textureHeight = 0;
            _this._mapCache = new Array();
            _this._currMoveX = 0;
            _this._minXIndex = 0;
            _this._maxXIndex = 0;
            _this._currMoveY = 0;
            _this._minYIndex = 0;
            _this._maxYIndex = 0;
            if (GameMap._instance) {
                return _this;
            }
            _this.map_texture = RES.getRes("egret_icon_png");
            _this.map_textureWidth = _this.map_texture.textureWidth;
            _this.map_textureHeight = _this.map_texture.textureHeight;
            _this.createMap();
            return _this;
        }
        Object.defineProperty(GameMap, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameMap();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameMap.prototype.createMap = function () {
            var min_width = game.GameLayerManage.stage.stageWidth + 2 * this.map_textureWidth;
            var min_hight = game.GameLayerManage.stage.stageHeight + 2 * this.map_textureHeight;
            this.h_mapCount = min_width % this.map_textureWidth == 0 ? Math.floor(min_width / this.map_textureWidth) : (Math.floor(min_width / this.map_textureWidth) + 1);
            this.v_mapCount = min_hight % this.map_textureHeight == 0 ? Math.floor(min_hight / this.map_textureHeight) : (Math.floor(min_hight / this.map_textureHeight) + 1);
            var len = this.h_mapCount * this.v_mapCount;
            for (var i = 0; i < len; i++) {
                var img = new egret.Bitmap();
                img.texture = this.map_texture;
                img.x = (i % this.h_mapCount) * this.map_textureWidth;
                img.y = Math.floor(i / this.h_mapCount) * this.map_textureHeight;
                this.addChild(img);
                this._mapCache.push(img);
            }
            this._maxXIndex = this.h_mapCount - 1;
            this._maxYIndex = this.v_mapCount - 1;
            this.width = this.h_mapCount * this.map_textureWidth;
            this.height = this.v_mapCount * this.map_textureHeight;
        };
        GameMap.prototype.runing = function (moveX, moveY) {
            var isXRunging = true;
            var isYRunging = true;
            var x = this.x + moveX;
            var y = this.y + moveY;
            this._currMoveX += moveX;
            this._currMoveY += moveY;
            //左移动
            if (moveX < 0 && this.x <= game.GameLayerManage.stage.stageWidth - GameMap.MAP_WIDTH) {
                x = game.GameLayerManage.stage.stageWidth - GameMap.MAP_WIDTH;
                this._currMoveX = 0;
                isXRunging = false;
            }
            //右移动
            if (moveX > 0 && this.x >= 0) {
                x = 0;
                this._currMoveX = 0;
                isXRunging = false;
            }
            //上移动
            if (moveY < 0 && this.y <= game.GameLayerManage.stage.stageHeight - GameMap.MAP_HIGHT) {
                y = game.GameLayerManage.stage.stageHeight - GameMap.MAP_HIGHT;
                this._currMoveY = 0;
                isYRunging = false;
            }
            //下移动
            if (moveY > 0 && this.y >= 0) {
                y = 0;
                this._currMoveY = 0;
                isYRunging = false;
            }
            this.x = x;
            this.y = y;
            //最左边一列
            if (isXRunging && this._currMoveX <= -this.map_textureWidth - game.Player.step) {
                var len = this._mapCache.length;
                for (var i = 0; i < len; i++) {
                    var img = this._mapCache[i];
                    if (img.x == this._minXIndex * this.map_textureWidth) {
                        img.x = (this._maxXIndex + 1) * this.map_textureWidth;
                    }
                }
                this._minXIndex += 1;
                this._maxXIndex += 1;
                this._currMoveX = 0;
            }
            //最右边一列
            if (isXRunging && this._currMoveX >= this.map_textureWidth - game.Player.step) {
                var len = this._mapCache.length;
                for (var i = 0; i < len; i++) {
                    var img = this._mapCache[i];
                    if (img.x == ((this._maxXIndex) * this.map_textureWidth)) {
                        img.x = (this._minXIndex - 1) * this.map_textureWidth;
                    }
                }
                this._minXIndex -= 1;
                this._maxXIndex -= 1;
                this._currMoveX = 0;
            }
            //最上边一列
            if (isYRunging && this._currMoveY <= -this.map_textureHeight - game.Player.step) {
                var len = this._mapCache.length;
                for (var i = 0; i < len; i++) {
                    var img = this._mapCache[i];
                    if (img.y == this._minYIndex * this.map_textureHeight) {
                        img.y = (this._maxYIndex + 1) * this.map_textureHeight;
                    }
                }
                this._minYIndex += 1;
                this._maxYIndex += 1;
                this._currMoveY = 0;
            }
            //最下边一列
            if (isYRunging && this._currMoveY >= this.map_textureHeight - game.Player.step) {
                var len = this._mapCache.length;
                for (var i = 0; i < len; i++) {
                    var img = this._mapCache[i];
                    if (img.y == ((this._maxYIndex) * this.map_textureHeight)) {
                        img.y = (this._minYIndex - 1) * this.map_textureHeight;
                    }
                }
                this._minYIndex -= 1;
                this._maxYIndex -= 1;
                this._currMoveY = 0;
            }
            console.log(this._currMoveY);
            return isXRunging && isYRunging;
        };
        GameMap._instance = null;
        GameMap.MAP_WIDTH = 2000;
        GameMap.MAP_HIGHT = 2000;
        return GameMap;
    }(egret.Sprite));
    game.GameMap = GameMap;
    __reflect(GameMap.prototype, "game.GameMap");
})(game || (game = {}));
//# sourceMappingURL=GameMap.js.map