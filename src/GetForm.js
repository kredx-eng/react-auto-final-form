"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var BootstrapWrapper_1 = require("./components/ExternalWrapperHOC's/BootstrapWrapper");
var FormBuilder_1 = require("./FormBuilder/FormBuilder");
exports.GetForm = function (props) {
    if (props.useBootstrap) {
        return react_1["default"].createElement(BootstrapWrapper_1.BootstrapWrapper(FormBuilder_1.FormBuilder), __assign({}, props));
    }
    else {
        return react_1["default"].createElement(FormBuilder_1.FormBuilder, __assign({}, props));
    }
};
