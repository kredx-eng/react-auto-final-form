"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Button = function (props) {
    var input = props.input, meta = props.meta;
    return (react_1.default.createElement("button", { type: "submit", style: { flex: props.size, maxWidth: "30vw" }, className: "btn btn-primary" }, "Submit"));
};
exports.default = Button;
//# sourceMappingURL=FormButton.js.map