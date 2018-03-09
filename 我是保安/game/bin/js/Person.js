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
/*
* 创建人物类
*/
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        var _this = _super.call(this) || this;
        _this.view = fairygui.UIPackage.createObject("common", "Person").asCom;
        _this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        _this.view.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
        _this.addChild(_this.view);
        _this.img_d = _this.view.getChild("img_d").asLoader;
        _this.img_u = _this.view.getChild("img_u").asLoader;
        _this.t1 = _this.view.getTransition("t1");
        _this.t2 = _this.view.getTransition("t2");
        _this.t3 = _this.view.getTransition("t3");
        _this.t4 = _this.view.getTransition("t4");
        return _this;
    }
    Person.prototype.init = function (type) {
        if (type == 1 || type == 2)
            this.img_d.url = fairygui.UIPackage.getItemURL("common", "car_" + module.random(0, 1));
        else
            this.img_u.url = fairygui.UIPackage.getItemURL("common", "person_" + module.random(0, 7));
        this.num = type;
        return this["t" + type];
    };
    Person.prototype.play = function () {
        this["t" + this.num].play();
    };
    Person.prototype.stop = function () {
        this["t" + this.num].stop();
    };
    return Person;
}(fairygui.GComponent));
//# sourceMappingURL=Person.js.map