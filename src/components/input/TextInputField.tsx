import React from "react";
import {
  SchemaFields,
  SchemaLayout
} from "../../FormBuilder/interfaces/SchemaInterfaces";
import { FieldRenderProps } from "react-final-form";
import "./TextInputField.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import classnames from "classnames";

interface IProps {
  field: SchemaFields;
  layout?: SchemaLayout;
  fieldProps: FieldRenderProps<any, any>;
}

const TextInputField = (props: any) => {
  const { input, meta } = props;
  return (
    <div
      className={classnames(
        {
          "d-none": props.visible === false
        },
        {
          "d-flex":
            props.visible === true ||
            props.visible === undefined ||
            typeof props.visible === "function"
        },
        "row-12 justify-content-between mb-3 w-auto h-10"
      )}
    >
      <label>{props.displayName}</label>
      <div className={"col-9"}>
        <input
          name={input.name}
          type={input.type}
          onChange={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          className={classnames(
            "rounded form-control",
            {
              "is-invalid": !meta.valid
            },
            { disabled: props.disabled },
            { "d-none": props.visible === false }
          )}
          value={input.value}
        />
        {meta.error && meta.touched && (
          <p>
            {Array.isArray(meta.error)
              ? meta.error[meta.error.length - 1]
              : meta.error}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextInputField;
