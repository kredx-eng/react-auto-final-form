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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldWrapper = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
require("bootstrap/dist/css/bootstrap.min.css");
exports.FieldWrapper = function (WrappedComponent) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            var _a = this.props, size = _a.size, input = _a.input, meta = _a.meta, displayName = _a.displayName, disabled = _a.disabled, visible = _a.visible;
            var colSize = size ? "col-md-" + size : "col-md-12";
            return (react_1.default.createElement("div", { className: classnames_1.default("form-group", colSize, {
                    "has-error": meta.invalid && meta.touched
                }), style: { paddingBottom: 10, paddingTop: 10 } },
                react_1.default.createElement("label", null, displayName),
                react_1.default.createElement(WrappedComponent, __assign({}, this.props, { className: classnames_1.default("form-control", {
                        "is-invalid": meta.invalid && meta.touched
                    }, { disabled: disabled }, { "hidden-md hidden-lg hidden-sm hidden-xs": visible === false }), id: input.name })),
                react_1.default.createElement("div", { style: { color: "red" }, className: classnames_1.default("help-block", {
                        invisible: !meta.touched && !meta.active
                    }, { visible: meta.invalid && (meta.touched || meta.active) }) }, meta.error)));
        };
        return class_1;
    }(react_1.default.PureComponent));
};
//# sourceMappingURL=FieldWrapper.js.map