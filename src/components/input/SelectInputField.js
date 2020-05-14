"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var classnames_1 = require("classnames");
var SelectInputField = function (props) {
    var input = props.input, meta = props.meta;
    return (<div className={"d-flex row-12 justify-content-between mb-3 "}>
      <react_bootstrap_1.Form.Label>{props.displayName}</react_bootstrap_1.Form.Label>
      <select name={props.displayName} onChange={props.input.onChange} onFocus={input.onFocus} onBlur={input.onBlur} defaultValue={""} value={input.value} className={classnames_1["default"]("rounded form-control col-9 bg-light", {
        disabled: props.disabled
    })}>
        {props["enum"] &&
        props["enum"].map(function (options) {
            return <option value={options}>{options}</option>;
        })}
        {props.options &&
        props.options.map(function (options) { return (<option value={options.label || options.value}>
              {options.text}
            </option>); })}
      </select>
    </div>);
};
exports["default"] = SelectInputField;
