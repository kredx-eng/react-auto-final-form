"use strict";
exports.__esModule = true;
var GetInputs_1 = require("../components/GetInputs");
var TextInputField_1 = require("../components/input/TextInputField");
var SelectInputField_1 = require("../components/input/SelectInputField");
exports.getComponent = function (field, componentFactory) {
    Object.assign(componentFactory, {
        text: TextInputField_1["default"],
        select: SelectInputField_1["default"]
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
