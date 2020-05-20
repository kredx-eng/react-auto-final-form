"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponent = void 0;
var GetInputs_1 = require("../components/GetInputs");
var TextInputField_1 = __importDefault(require("../components/input/TextInputField"));
var SelectInputField_1 = __importDefault(require("../components/input/SelectInputField"));
exports.getComponent = function (field, componentFactory) {
    Object.assign(componentFactory, {
        text: TextInputField_1.default,
        select: SelectInputField_1.default
    });
    if (field.component &&
        (typeof field.component === "function" ||
            typeof field.component === "object")) {
        return field.component;
    }
    if (field.component &&
        typeof field.component === "string" &&
        componentFactory &&
        componentFactory.hasOwnProperty(field.component)) {
        return componentFactory[field.component];
    }
    else if (field.component &&
        componentFactory &&
        !componentFactory.hasOwnProperty(field.component)) {
        throw new Error("Provided component " + field.component + " isn't provided in the component factory");
    }
    else {
        return GetInputs_1.getInputs({ field: field });
    }
};
//# sourceMappingURL=GetComponent.js.map