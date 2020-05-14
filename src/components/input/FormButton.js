"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./FormButton.css");
var Button = function (props) {
    var input = props.input, meta = props.meta;
    return (<button type={"submit"} style={{ flex: props.size, maxWidth: "30vw" }} className={"btn btn-primary"}>
      Submit
    </button>);
};
exports["default"] = Button;
