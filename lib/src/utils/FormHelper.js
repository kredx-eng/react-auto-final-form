"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
var evaluator = function (evaluatee, formState) {
    var evaluated = evaluatee(formState, formState.value);
    return evaluated;
};
var formState = {};
var renderCount = 0;
var updateFormState = function (formProps) {
    formState = formProps;
    renderCount += 1;
    var getFieldState = formState.form.getFieldState("name");
};
var getFieldState = function (fieldName) {
    var fieldState = formState.form.getFieldState(fieldName);
    if (fieldState && fieldState.value === "asd") {
        return "WHEEEWWWW";
    }
    else
        return "nope";
};
var metaDataEvaluator = function (field, formSpyProps, fieldName) {
    var evaluatedField = field;
    Object.keys(field).forEach(function (key) {
        var _a;
        Object.assign(evaluatedField, (_a = {},
            // @ts-ignore
            _a[key] = evaluateProperty(field[key], formSpyProps, fieldName),
            _a));
    });
    return evaluatedField;
};
var evaluateProperty = function (property, formSpyProps, fieldName) {
    if (typeof property === "function") {
        try {
            return property(getLocalModel(fieldName, formSpyProps.values), formSpyProps, formSpyProps.values);
        }
        catch (e) {
            return property;
        }
    }
    else {
        return property;
    }
};
var fieldPropertyCheck = function (field) {
    for (var key in field) {
        if (typeof field[key] === "function") {
            return true;
        }
    }
    return false;
};
var getLocalModel = function (fieldName, model) {
    var entityNameArray = fieldName.split(".");
    entityNameArray.pop();
    return get_1.default(model, entityNameArray) || model;
};
exports.FormHelper = {
    evaluator: evaluator,
    formState: formState,
    updateFormState: updateFormState,
    metaDataEvaluator: metaDataEvaluator,
    getFieldState: getFieldState,
    getLocalModel: getLocalModel,
    fieldPropertyCheck: fieldPropertyCheck
};
//# sourceMappingURL=FormHelper.js.map