"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var FormBuilder_1 = require("../src/FormBuilder/FormBuilder");
var prefetch_1 = require("./schemas/prefetch");
var FormButton_1 = __importDefault(require("./components/input/FormButton"));
var TextInputField_1 = __importDefault(require("./components/input/TextInputField"));
var SelectInputField_1 = __importDefault(require("./components/input/SelectInputField"));
exports.COMPONENT_FACTORY = {
    string: TextInputField_1.default,
    button: FormButton_1.default,
    Select: SelectInputField_1.default
};
exports.default = react_dom_1.default.render(react_1.default.createElement(FormBuilder_1.FormBuilder, { schema: prefetch_1.prefetchDealSchema, entityName: "prefetchDeal", layoutName: "edit", onSubmit: function (value) {
        console.log("value", value);
    }, bottomBar: FormButton_1.default, formProps: {
        onSubmit: function (value) {
            console.log("value", value);
        },
        validateOnBlur: true
    }, componentFactory: exports.COMPONENT_FACTORY }), document.getElementById("root"));
//# sourceMappingURL=index.js.map