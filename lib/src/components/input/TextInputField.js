"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var TextInputField = function (props) {
    var input = props.input, meta = props.meta;
    return (react_1.default.createElement("div", { className: classnames_1.default({
            "d-none": props.visible === false
        }, {
            "d-flex": props.visible === true ||
                props.visible === undefined ||
                typeof props.visible === "function"
        }, "col-md-6 justify-content-between mb-3 w-auto h-10", { "has-error": meta.invalid && meta.touched }) },
        react_1.default.createElement("label", null, props.displayName),
        react_1.default.createElement("div", { className: "col-9" },
            react_1.default.createElement("input", { name: input.name, type: input.type, onChange: input.onChange, onBlur: input.onBlur, onFocus: input.onFocus, className: classnames_1.default("rounded form-control", {
                    "is-invalid": meta.invalid && meta.touched
                }, { disabled: props.disabled }, { "d-none": props.visible === false }), value: input.value }),
            meta.error && meta.touched && (react_1.default.createElement("p", { style: { color: "red" } }, Array.isArray(meta.error)
                ? meta.error[meta.error.length - 1]
                : meta.error)))));
};
exports.default = TextInputField;
//# sourceMappingURL=TextInputField.js.map