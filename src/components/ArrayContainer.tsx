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
  defaultButtonBar = () => (
    <div className={"d-flex mb-10 row-12"}>
      <button
        type={"button"}
        className={"btn btn-outline-primary w-20 mr-20"}
        onClick={this.addField}
      >
        {"Add +"}
      </button>
      <button
        type={"button"}
        className={"btn btn-outline-danger mr-20 w-20"}
        onClick={this.deleteField}
      >
        {"Delete -"}
      </button>
    </div>
  );

  render = () => {
    const { children, buttonBar } = this.props;
    return (
      <div>
        {children}
        {buttonBar ? buttonBar : this.defaultButtonBar()}
      </div>
    );
  };
}
