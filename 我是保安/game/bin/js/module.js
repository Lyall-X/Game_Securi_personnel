/*
* 方法集合
*/
var module = /** @class */ (function () {
    function module() {
    }
    /**
     * 随机数
     * @param min
     * @param max
     */
    module.random = function (min, max) {
        if (min <= max)
            return Math.floor(min + Math.random() * (max - min + 1));
        else
            return 0;
    };
    return module;
}());
//# sourceMappingURL=module.js.map