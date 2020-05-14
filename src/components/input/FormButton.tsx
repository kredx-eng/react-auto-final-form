import React from "react";
import { FieldRenderProps } from "react-final-form";

interface IProps {
  onClick: any;
  field: any;
  fieldProps: FieldRenderProps<any, any>;
}

const Button = (props: any) => {
  const { input, meta } = props;
  return (
    <button
      type={"submit"}
      style={{ flex: props.size, maxWidth: "30vw" }}
      className={"btn btn-primary"}
    >
      Submit
    </button>
  );
};

export default Button;
