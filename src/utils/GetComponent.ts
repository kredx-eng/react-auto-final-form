import { ComponentFactory, IFields } from "../interfaces/SchemaInterfaces";
import { getInputs } from "../components/GetInputs";
import TextInputField from "../components/input/TextInputField";
import SelectInputField from "../components/input/SelectInputField";

export const getComponent = (
  field: IFields,
  componentFactory?: ComponentFactory
) => {
  Object.assign(componentFactory, {
    text: TextInputField,
    select: SelectInputField
  });
  if (
    field.component &&
    (typeof field.component === "function" ||
      typeof field.component === "object")
  ) {
    return field.component;
  }
  if (
    field.component &&
    typeof field.component === "string" &&
    componentFactory &&
    componentFactory.hasOwnProperty(field.component)
  ) {
    return componentFactory[field.component];
  } else if (
    field.component &&
    componentFactory &&
    !componentFactory.hasOwnProperty(field.component)
  ) {
    throw new Error(
      `Provided component ${field.component} isn't provided in the component factory`
    );
  } else {
    return getInputs({ field: field });
  }
};
