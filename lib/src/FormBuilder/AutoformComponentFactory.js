"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldWrapper_1 = require("../components/FieldWrapper");
var AutoformComponentFactory = /** @class */ (function () {
    function AutoformComponentFactory() {
        var _this = this;
        this.registerFieldComponent = function (name, type, component) {
            var _a;
            Object.assign(_this.componentFactory, (_a = {}, _a[name] = FieldWrapper_1.FieldWrapper(component), _a));
        };
        this.componentFactory = {};
    }
    return AutoformComponentFactory;
}());
exports.AutoformComponentFactory = AutoformComponentFactory;
//# sourceMappingURL=AutoformComponentFactory.js.map