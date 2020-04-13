import React from "react";

const SelectInputField = (props: any) => {
  const { input, meta } = props;
  return (
    <div className={"field"} style={{ flex: props.size }} key={input.name}>
      <label>{props.displayName}</label>
      <select
        name={props.displayName}
        onChange={props.input.onChange}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        defaultValue={""}
        value={input.value}
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
