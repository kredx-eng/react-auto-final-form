"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputs = void 0;
var TextInputField_1 = __importDefault(require("./input/TextInputField"));
var SelectInputField_1 = __importDefault(require("./input/SelectInputField"));
exports.getInputs = function (props) {
    var field = props.field;
    switch (field.type) {
        case "string":
            if (field.options || field.enum) {
                return SelectInputField_1.default;
            }
            return TextInputField_1.default;
        case "number":
            return TextInputField_1.default;
        default:
            return TextInputField_1.default;
    }
};
//# sourceMappingURL=GetInputs.js.map