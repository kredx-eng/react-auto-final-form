import { IFields, AnyObject } from "../interfaces/SchemaInterfaces";
import get from "lodash/get";

export type Validators = (value: any) => string | undefined;

const requiredValidator: Validators = (value: any) => {
  return value ? undefined : "The field cannot be empty";
};

const emailValidator: Validators = (value: string) => {
  const regex =
    '/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/';
  if (value.match(regex)) {
    return undefined;
  } else {
    return "Please enter a valid email";
  }
};

export const validators = {
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

export const getErorr = (
  validator: AnyObject | undefined,
  field: IFields,
  value: any,
  model: AnyObject,
  meta: any,
  fieldName: string
): string | undefined => {
  if (validator && Object.keys(validator).length) {
    let required;
    if (validator.required) {
      required = stringValidator("required", value);
    }
    console.log("field", fieldName);
    return required
      ? required
      : validator.error
      ? validator.error(model, meta, model)
      : undefined;
  }
};

const getLocalModel = (fieldName: string, model: AnyObject) => {
  const entityNameArray = fieldName.split(".");
  entityNameArray.pop();
  console.log("field", fieldName, model, entityNameArray);
  return get(model, entityNameArray) || {};
};

export const stringValidator = (validator: string, value: any) => {
  switch (validator) {
    case "required":
      return validators.required(value);
    case "email":
      return validators.email(value);
  }
};

export const functionValidator = (validator: Validators, value: any) => {
  return validator(value);
};
