"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ArrayContainer = /** @class */ (function (_super) {
    __extends(ArrayContainer, _super);
    function ArrayContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addField = function () {
            var _a = _this.props, addField = _a.addField, name = _a.name;
            addField(name);
        };
        _this.deleteField = function () {
            var _a = _this.props, deleteField = _a.deleteField, name = _a.name;
            deleteField(name);
        };
        _this.render = function () {
            var children = _this.props.children;
            return react_1.default.createElement(react_1.default.Fragment, null, children);
        };
        return _this;
    }
    return ArrayContainer;
}(react_1.default.PureComponent));
exports.ArrayContainer = ArrayContainer;
//# sourceMappingURL=ArrayContainer.js.map