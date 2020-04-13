import { ComponentFactory, IFields } from "../interfaces/SchemaInterfaces";
import { getFields } from "../components/GetFields";

export const getComponent = (
  field: IFields,
  componentFactory?: ComponentFactory
) => {
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
    throw new Error(`Provided component`);
  } else {
    return getFields({ field: field });
  }
};
