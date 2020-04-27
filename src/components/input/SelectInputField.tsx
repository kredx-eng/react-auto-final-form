import React from "react";
import { Form } from "react-bootstrap";
import classNames from "classnames";

const SelectInputField = (props: any) => {
  const { input, meta } = props;
  return (
    <div className={"d-flex row-12 justify-content-between mb-3 "}>
      <Form.Label>{props.displayName}</Form.Label>
      <select
        name={props.displayName}
        onChange={props.input.onChange}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        defaultValue={""}
        value={input.value}
        className={classNames("rounded form-control col-9 bg-light", {
          disabled: props.disabled
        })}
      >
        {props.enum &&
          props.enum.map((options: any) => {
            return <option value={options}>{options}</option>;
          })}
        {props.options &&
          props.options.map((options: any) => (
            <option value={options.label || options.value}>
              {options.text}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectInputField;
