import React from "react";
import {
  SchemaFields,
  SchemaLayout
} from "../../FormBuilder/interfaces/SchemaInterfaces";
import { FieldRenderProps } from "react-final-form";
import classnames from "classnames";

interface IProps {
  field: SchemaFields;
  layout?: SchemaLayout;
  fieldProps: FieldRenderProps<any, any>;
}

const TextInputField = (props: any) => {
  const { input, meta, size } = props;
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
        `col-md-${size || 6} justify-content-between mb-3 w-auto h-10`,
        { "has-error": meta.invalid && meta.touched }
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
              "is-invalid": meta.invalid && meta.touched
            },
            { disabled: props.disabled },
            { "d-none": props.visible === false }
          )}
          value={input.value}
        />
        {meta.error && meta.touched && (
          <p style={{ color: "red" }}>
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
