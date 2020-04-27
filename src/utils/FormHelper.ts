import { FormSpyRenderProps } from "react-final-form";
import { AnyObject, IFields } from "../interfaces/SchemaInterfaces";
import get from "lodash/get";

const evaluator = (evaluatee: Function, formState: any) => {
  const evaluated = evaluatee(formState, formState.value);
  return evaluated;
};

let formState: any = {};
let renderCount: number = 0;

const updateFormState = (formProps: any) => {
  formState = formProps;
  renderCount += 1;
  const getFieldState = formState.form.getFieldState("name");
  // console.log(getFieldState, 'OKAY')
};

const getFieldState = (fieldName: string) => {
  let fieldState = formState.form.getFieldState(fieldName);
  if (fieldState && fieldState.value === "asd") {
    return "WHEEEWWWW";
  } else return "nope";
};

const metaDataEvaluator = (
  field: IFields,
  formSpyProps: FormSpyRenderProps,
  fieldName: string
) => {
  let evaluatedField: IFields = field;
  Object.keys(field).forEach(key => {
    Object.assign(evaluatedField, {
      // @ts-ignore
      [key]: evaluateProperty(field[key], formSpyProps, fieldName)
    });
  });
  return evaluatedField;
};

const evaluateProperty = (
  property: any,
  formSpyProps: FormSpyRenderProps,
  fieldName: string
) => {
  if (typeof property === "function") {
    try {
      return property(
        getLocalModel(fieldName, formSpyProps.values),
        formSpyProps,
        formSpyProps.values
      );
    } catch (e) {
      return property;
    }
  } else {
    return property;
  }
};

const fieldPropertyCheck = (field: any) => {
  for (let key in field) {
    if (typeof field[key] === "function") {
      return true;
    }
  }
  return false;
};

const getLocalModel = (fieldName: string, model: AnyObject) => {
  const entityNameArray = fieldName.split(".");
  entityNameArray.pop();
  return get(model, entityNameArray) || model;
};

export const FormHelper = {
  evaluator,
  formState,
  updateFormState,
  metaDataEvaluator,
  getFieldState,
  getLocalModel,
  fieldPropertyCheck
};
