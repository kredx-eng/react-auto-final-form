"use strict";
exports.__esModule = true;
var FormHelper_1 = require("./FormHelper");
var requiredValidator = function (value) {
    return value ? undefined : "The field cannot be empty";
};
var emailValidator = function (value) {
    var regex = '/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/';
    if (value.match(regex)) {
        return undefined;
    }
    else {
        return "Please enter a valid email";
    }
};
exports.validators = {
    email: emailValidator,
    required: requiredValidator
};
// export const composeValidator = (
//   validator: any,
//   value: any,
//   required: Boolean | undefined
// ) => {
//   if (!value) {
//     value = "";
//   }
//   switch (typeof validator) {
//     case "string":
//       return stringValidator(validator, value);
//
//     case "object":
//       if (Array.isArray(validator)) {
//         return validator.map(val => {
//           switch (typeof val) {
//             case "string":
//               return stringValidator(val, value);
//             case "function":
//               return functionValidator(val, value);
//             default:
//               return undefined;
//           }
//         });
//       } else {
//         return undefined;
//       }
//
//     case "function":
//       return functionValidator(validator, value);
//
//     default:
//       return undefined;
//   }
// };
exports.getErorr = function (validator, field, value, model, meta, fieldName) {
    if (validator && Object.keys(validator).length) {
        var required = void 0;
        if (validator.required) {
            required = exports.stringValidator("required", value);
        }
        //TODO: AARSHI Remove this try catch code in production
        try {
            return required
                ? required
                : validator.error
                    ? validator.error(FormHelper_1.FormHelper.getLocalModel(fieldName, model), meta, model)
                    : undefined;
        }
        catch (e) {
            throw new Error(e);
            return undefined;
        }
    }
};
exports.stringValidator = function (validator, value) {
    switch (validator) {
        case "required":
            return exports.validators.required(value);
        case "email":
            return exports.validators.email(value);
    }
};
exports.functionValidator = function (validator, value) {
    return validator(value);
};
