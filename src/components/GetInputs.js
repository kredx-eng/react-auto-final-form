"use strict";
exports.__esModule = true;
var TextInputField_1 = require("./input/TextInputField");
var SelectInputField_1 = require("./input/SelectInputField");
exports.getInputs = function (props) {
    var field = props.field;
    switch (field.type) {
        case "string":
            if (field.options || field["enum"]) {
                return SelectInputField_1["default"];
            }
            return TextInputField_1["default"];
        case "number":
            return TextInputField_1["default"];
        default:
            return TextInputField_1["default"];
    }
};
