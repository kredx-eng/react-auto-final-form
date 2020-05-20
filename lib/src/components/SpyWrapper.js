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
var react_1 = __importDefault(require("react"));
var react_final_form_1 = require("react-final-form");
var FormHelper_1 = require("../utils/FormHelper");
var Validators_1 = require("../utils/Validators");
var GetComponent_1 = require("../utils/GetComponent");
var omit_1 = __importDefault(require("lodash/omit"));
var SpyWrapper = /** @class */ (function (_super) {
    __extends(SpyWrapper, _super);
    function SpyWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function () {
            var _a = _this.props, field = _a.field, formData = _a.formData, errorObject = _a.errorObject, componentFactory = _a.componentFactory, fieldName = _a.fieldName;
            return (react_1.default.createElement(react_final_form_1.Field, __assign({ name: fieldName, component: GetComponent_1.getComponent(field, componentFactory), validate: function (value, allValues, meta) {
                    return Validators_1.getErorr(errorObject, field, value, allValues, meta, fieldName);
                }, size: field.size
                    ? FormHelper_1.FormHelper.metaDataEvaluator(field.size, formData, fieldName)
                    : 10, subscription: _this.props.subscription }, omit_1.default(field, ["name"]))));
        };
        return _this;
    }
    SpyWrapper.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        if (this.props.renderOptions) {
            return this.props.renderOptions(this.props.formData, nextProps);
        }
        else if (nextProps !== this.props || nextState !== this.state) {
            return true;
        }
        return false;
    };
    return SpyWrapper;
}(react_1.default.Component));
exports.default = SpyWrapper;
//# sourceMappingURL=SpyWrapper.js.map