import { SchemaFields } from "../FormBuilder/interfaces/SchemaInterfaces";
import TextInputField from "./input/TextInputField";
import SelectInputField from "./input/SelectInputField";

interface IProps {
  field: SchemaFields;
}
export const getInputs = (props: IProps) => {
  const { field } = props;
  switch (field.type) {
    case "string":
      if (field.options || field.enum) {
        return SelectInputField;
      }
      return TextInputField;
    case "number":
      return TextInputField;
    default:
      return TextInputField;
  }
};
