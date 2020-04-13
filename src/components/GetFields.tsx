import React from "react";
import { IFields } from "../interfaces/SchemaInterfaces";
import TextInputField from "./input/TextInputField";
import SelectInputField from "./input/SelectInputField";
import DateInput from "./input/DateInput";

interface IProps {
  field: IFields;
}
export const getFields = (props: IProps) => {
  const { field } = props;
  switch (field.type) {
    case "string":
      if (field.options || field.enum) {
        return SelectInputField;
      }
      return TextInputField;
    case "number":
      return TextInputField;
    case "date":
      return DateInput;
    default:
      return TextInputField;
  }
};
