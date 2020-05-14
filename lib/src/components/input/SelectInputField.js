"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var classnames_1 = __importDefault(require("classnames"));
var SelectInputField = function (props) {
    var input = props.input, meta = props.meta;
    return (react_1.default.createElement("div", { className: "d-flex row-12 justify-content-between mb-3 " },
        react_1.default.createElement(react_bootstrap_1.Form.Label, null, props.displayName),
        react_1.default.createElement("select", { name: props.displayName, onChange: props.input.onChange, onFocus: input.onFocus, onBlur: input.onBlur, defaultValue: "", value: input.value, className: classnames_1.default("rounded form-control col-9 bg-light", {
                disabled: props.disabled
            }) },
            props.enum &&
                props.enum.map(function (options) {
                    return react_1.default.createElement("option", { value: options }, options);
                }),
            props.options &&
                props.options.map(function (options) { return (react_1.default.createElement("option", { value: options.label || options.value }, options.text)); }))));
};
exports.default = SelectInputField;
//# sourceMappingURL=SelectInputField.js.map