import { AnyObject } from "../FormBuilder/interfaces/SchemaInterfaces";

export interface ClassnameArgsObject {
  [key: string]: boolean;
}

export const buildClassname = (
  classname: string,
  args: ClassnameArgsObject
) => {
  const classNameArray = [];
  classNameArray.push(classname);
  // @ts-ignore
  args.forEach((value: boolean, key: string) => {
    switch (key) {
      case "valid":
        value
          ? classNameArray.push("is-valid")
          : classNameArray.push("is-invalid");
      case "disabled":
        value && classNameArray.push("disable");
      default:
        break;
    }
  });
  return classNameArray.reduce(
    (previousValue, currentValue) => previousValue + " " + currentValue
  );
};
