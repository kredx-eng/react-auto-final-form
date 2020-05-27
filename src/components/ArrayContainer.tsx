import React from "react";

export class ArrayContainer extends React.PureComponent<any, any> {
  addField = () => {
    const { addField, arrayName } = this.props;
    addField(arrayName);
  };
  deleteField = () => {
    const { deleteField, arrayName } = this.props;
    deleteField(arrayName);
  };
  render = () => {
    const { children } = this.props;
    return <div>{children}</div>;
  };
}
