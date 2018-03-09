/*
* 创建人物类
*/
class Person extends fairygui.GComponent {
    private view: fairygui.GComponent;
    private t1: fairygui.Transition;
    private t2: fairygui.Transition;
    private t3: fairygui.Transition;
    private t4: fairygui.Transition;

    public img_d: fairygui.GLoader;
    public img_u: fairygui.GLoader;
    private num: number
    constructor() {
        super();
        this.view = fairygui.UIPackage.createObject("common", "Person").asCom;
        this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.view.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
        this.addChild(this.view);
        this.img_d = this.view.getChild("img_d").asLoader;
        this.img_u = this.view.getChild("img_u").asLoader;


        this.t1 = this.view.getTransition("t1");
        this.t2 = this.view.getTransition("t2");
        this.t3 = this.view.getTransition("t3");
        this.t4 = this.view.getTransition("t4");
    }

    init(type: number) {
        if (type == 1 || type == 2)
            this.img_d.url = fairygui.UIPackage.getItemURL("common", "car_" + module.random(0, 1));
        else
            this.img_u.url = fairygui.UIPackage.getItemURL("common", "person_" + module.random(0, 7));
        this.num = type;
        return this["t" + type]
    }
    play() {
        this["t" + this.num].play();
    }
    stop() {
        this["t" + this.num].stop();
    }
}