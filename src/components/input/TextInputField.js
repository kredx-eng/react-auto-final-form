"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./TextInputField.css");
var classnames_1 = require("classnames");
var TextInputField = function (props) {
    var input = props.input, meta = props.meta;
    return (<div className={classnames_1["default"]({
        "d-none": props.visible === false
    }, {
        "d-flex": props.visible === true ||
            props.visible === undefined ||
            typeof props.visible === "function"
    }, "row-12 justify-content-between mb-3 w-auto h-10")}>
      <label>{props.displayName}</label>
      <div className={"col-9"}>
        <input name={input.name} type={input.type} onChange={input.onChange} onBlur={input.onBlur} onFocus={input.onFocus} className={classnames_1["default"]("rounded form-control", {
        "is-invalid": !meta.valid
    }, { disabled: props.disabled }, { "d-none": props.visible === false })} value={input.value}/>
        {meta.error && meta.touched && (<p>
            {Array.isArray(meta.error)
        ? meta.error[meta.error.length - 1]
        : meta.error}
          </p>)}
      </div>
    </div>);
};
exports["default"] = TextInputField;
