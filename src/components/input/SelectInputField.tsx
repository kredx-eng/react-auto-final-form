import React from "react";
import classNames from "classnames";

const SelectInputField = (props: any) => {
  const { input, meta } = props;
  return (
    <div className={"d-flex col-md-6 justify-content-between mb-3 "}>
      <label>{props.displayName}</label>
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
