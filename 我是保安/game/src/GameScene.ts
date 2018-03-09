class GameScene extends fairygui.GComponent {
    private view: fairygui.GComponent;
    private static instance: GameScene;
    public static getInstance(): GameScene {
        if (this.instance == null)
            this.instance = new GameScene();
        return this.instance;
    }

    private img_bg: fairygui.GLoader;
    private btn_line: fairygui.GButton;
    private t0: fairygui.Transition;
    private t3: fairygui.Transition;
    public img_line: fairygui.GImage;
    private btn_restart: fairygui.GButton;
    private lbl_score: fairygui.GTextField;
    private num: number = 1;
    private heart: number = 10;

    private mc_0;
    private mc_1;
    private mc_2;

    public constructor() {
        super();
        this.view = fairygui.UIPackage.createObject("common", "GameScene").asCom;
        this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.view.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
        this.addChild(this.view);
        UI.Toast.init(this);

        this.t0 = this.view.getTransition("t0");
        this.t3 = this.view.getTransition("t3");
        this.img_bg = this.view.getChild("img_bg").asLoader;
        this.btn_line = this.view.getChild("btn_line").asButton;
        this.btn_restart = this.view.getChild("btn_restart").asButton;
        this.lbl_score = this.view.getChild("lbl_score").asTextField;
        this.life()
        this.img_line = this.view.getChild("img_line").asImage;
        this.btn_line.onClick(this, this.contral, [this.btn_line])
        this.btn_restart.onClick(this, this.restart, [this.btn_restart])
        var self = this;
        Laya.loader.load("res/bg/school.jpg", Handler.create(this, function () {
            self.img_bg.url = "res/bg/school.jpg";
        }));
        this.play_mc_l_d()
        this.play_mc_r_d()
        this.play_mc_u()
        Laya.timer.loop(1, this, this.onMouseMove);
        Laya.timer.loop(module.random(3000, 8000), this, this.play_mc_l_d)
        Laya.timer.loop(module.random(2000, 7000), this, this.play_mc_r_d)
        Laya.timer.loop(module.random(1000, 4000), this, this.play_mc_u)


    }
    contral() {
        this.num++
        if (this.num % 2 == 0)
            this.t0.play();
        else
            this.t0.playReverse();

    }

    play_mc_l_d() {
        this.mc_0 = new Person();
        this.mc_0.init(1)
        this.view.addChild(this.mc_0)
        this.mc_0.play()
    }

    play_mc_r_d() {
        this.mc_1 = new Person();
        this.mc_1.init(2)
        this.view.addChild(this.mc_1)
        this.mc_1.play()
    }

    play_mc_u() {
        this.mc_2 = new Person();
        this.mc_2.init(module.random(3, 4))
        this.view.addChild(this.mc_2)
        this.mc_2.play()
    }

    over(y: number) {

    }
    onMouseMove() {
        for (var i = 0; i < 3; i++) {
            if (i == 0 || i == 1)
                if (this.img_line.y - this["mc_" + i].img_d.height / 2 < this["mc_" + i].img_d.y && this["mc_" + i].img_d.y < this.img_line.y + this["mc_" + i].img_d.height / 2 && this.img_line.width == 258) {
                    UI.Toast.show("生命-1")
                    this.heart--
                    this.life()
                    this["mc_" + i].stop();
                }
            if (i == 2)
                if (this.img_line.y - this.mc_2.img_u.height / 2 < this.mc_2.img_u.y && this.mc_2.img_u.y < this.img_line.y + this["mc_" + i].img_u.height / 2 && this.img_line.width == 258) {
                    for (var k = 5; k < 8; k++)
                        if (this.mc_2.img_u.url == fairygui.UIPackage.getItemURL("common", "person_" + k)) {
                            UI.Toast.show("生命+1")
                            this.heart++
                            this.life()
                            this.mc_2.stop();
                            return;
                        }
                    UI.Toast.show("生命-1")
                    this.heart--
                    this.life()
                    this.mc_2.stop();
                }
        }
    }
    life() {
        this.lbl_score.text = "生命[color=#ff0000]" + this.heart + "[/color]";
        if (this.heart <= 0) {
            this.mc_0.stop()
            this.mc_1.stop()
            this.mc_2.stop()
            Laya.timer.clearAll(this)
            this.t3.play();
        }
    }
    restart() {
        this.t3.stop();
        this.view.removeChildren();
        this.view.addChild(new GameScene())
    }
}
