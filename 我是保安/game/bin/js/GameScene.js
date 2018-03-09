var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.num = 1;
        _this.heart = 10;
        _this.view = fairygui.UIPackage.createObject("common", "GameScene").asCom;
        _this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        _this.view.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
        _this.addChild(_this.view);
        UI.Toast.init(_this);
        _this.t0 = _this.view.getTransition("t0");
        _this.t3 = _this.view.getTransition("t3");
        _this.img_bg = _this.view.getChild("img_bg").asLoader;
        _this.btn_line = _this.view.getChild("btn_line").asButton;
        _this.btn_restart = _this.view.getChild("btn_restart").asButton;
        _this.lbl_score = _this.view.getChild("lbl_score").asTextField;
        _this.life();
        _this.img_line = _this.view.getChild("img_line").asImage;
        _this.btn_line.onClick(_this, _this.contral, [_this.btn_line]);
        _this.btn_restart.onClick(_this, _this.restart, [_this.btn_restart]);
        var self = _this;
        Laya.loader.load("res/bg/school.jpg", Handler.create(_this, function () {
            self.img_bg.url = "res/bg/school.jpg";
        }));
        _this.play_mc_l_d();
        _this.play_mc_r_d();
        _this.play_mc_u();
        Laya.timer.loop(1, _this, _this.onMouseMove);
        Laya.timer.loop(module.random(3000, 8000), _this, _this.play_mc_l_d);
        Laya.timer.loop(module.random(2000, 7000), _this, _this.play_mc_r_d);
        Laya.timer.loop(module.random(1000, 4000), _this, _this.play_mc_u);
        return _this;
    }
    GameScene.getInstance = function () {
        if (this.instance == null)
            this.instance = new GameScene();
        return this.instance;
    };
    GameScene.prototype.contral = function () {
        this.num++;
        if (this.num % 2 == 0)
            this.t0.play();
        else
            this.t0.playReverse();
        console.log(this.img_line.width);
    };
    GameScene.prototype.play_mc_l_d = function () {
        this.mc_0 = new Person();
        this.mc_0.init(1);
        this.view.addChild(this.mc_0);
        this.mc_0.play();
    };
    GameScene.prototype.play_mc_r_d = function () {
        this.mc_1 = new Person();
        this.mc_1.init(2);
        this.view.addChild(this.mc_1);
        this.mc_1.play();
    };
    GameScene.prototype.play_mc_u = function () {
        this.mc_2 = new Person();
        this.mc_2.init(module.random(3, 4));
        this.view.addChild(this.mc_2);
        this.mc_2.play();
    };
    GameScene.prototype.over = function (y) {
    };
    GameScene.prototype.onMouseMove = function () {
        for (var i = 0; i < 3; i++) {
            if (i == 0 || i == 1)
                if (this.img_line.y - this["mc_" + i].img_d.height / 2 < this["mc_" + i].img_d.y && this["mc_" + i].img_d.y < this.img_line.y + this["mc_" + i].img_d.height / 2 && this.img_line.width <= 258 && this.img_line.width > 93) {
                    UI.Toast.show("生命-1");
                    this.heart--;
                    this.life();
                    this["mc_" + i].stop();
                }
            if (i == 2)
                if (this.img_line.y - this.mc_2.img_u.height / 2 < this.mc_2.img_u.y && this.mc_2.img_u.y < this.img_line.y + this["mc_" + i].img_u.height / 2 && this.img_line.width <= 258 && this.img_line.width > 93) {
                    for (var k = 5; k < 8; k++)
                        if (this.mc_2.img_u.url == fairygui.UIPackage.getItemURL("common", "person_" + k)) {
                            UI.Toast.show("生命+1");
                            this.heart++;
                            this.life();
                            this.mc_2.stop();
                            return;
                        }
                    UI.Toast.show("生命-1");
                    this.heart--;
                    this.life();
                    this.mc_2.stop();
                }
        }
    };
    GameScene.prototype.life = function () {
        this.lbl_score.text = "生命[color=#ff0000]" + this.heart + "[/color]";
        if (this.heart <= 0) {
            this.mc_0.stop();
            this.mc_1.stop();
            this.mc_2.stop();
            Laya.timer.clearAll(this);
            this.t3.play();
        }
    };
    GameScene.prototype.restart = function () {
        this.t3.stop();
        this.view.removeChildren();
        this.view.addChild(new GameScene());
    };
    return GameScene;
}(fairygui.GComponent));
//# sourceMappingURL=GameScene.js.map