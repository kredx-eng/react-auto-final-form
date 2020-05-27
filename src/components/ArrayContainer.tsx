import React from "react";
import { AnyObject } from "../FormBuilder/interfaces/SchemaInterfaces";

interface ArrayContainerProps extends React.ComponentProps<any> {
  addField: Function;
  deleteField: Function;
  name: string;
  arrayProps: AnyObject;
  buttonBar?: React.ElementType;
}

export class ArrayContainer extends React.PureComponent<
  ArrayContainerProps,
  any
> {
  addField = () => {
    const { addField, name } = this.props;
    addField(name);
  };
  deleteField = () => {
    const { deleteField, name } = this.props;
    deleteField(name);
  };
  render = () => {
    const { children } = this.props;
    return <>{children}</>;
  };
}
