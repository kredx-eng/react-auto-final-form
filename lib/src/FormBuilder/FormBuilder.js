"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_final_form_1 = require("react-final-form");
var SchemaEvaluator_1 = require("./SchemaEvaluator");
var react_final_form_2 = require("react-final-form");
var final_form_arrays_1 = __importDefault(require("final-form-arrays"));
var GetComponent_1 = require("../utils/GetComponent");
var Validators_1 = require("../utils/Validators");
var omit_1 = __importDefault(require("lodash/omit"));
var FormHelper_1 = require("../utils/FormHelper");
var react_final_form_arrays_1 = require("react-final-form-arrays");
require("bootstrap/dist/css/bootstrap.min.css");
var dateMutator = function (args, state, utils) {
    var setDate = function (value) {
        var date = value.split("-");
        var d = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]));
        if (args[1]) {
            switch (args[1]) {
                case "epoch":
                    return d.getTime();
                case "UTC":
                    return d.toUTCString();
                case "ISO":
                    return d.toISOString();
                default:
                    return d.getTime();
            }
        }
        else
            return d.toDateString();
    };
    utils.changeValue(state, args[0], function (value) { return setDate(value); });
};
var FormBuilder = /** @class */ (function (_super) {
    __extends(FormBuilder, _super);
    function FormBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function () {
            var _a = _this.props, schema = _a.schema, entityName = _a.entityName, layoutName = _a.layoutName, bottomBar = _a.bottomBar, formProps = _a.formProps;
            var evaluatedSchema = new SchemaEvaluator_1.SchemaEvaluator(schema, entityName, layoutName);
            var parsedSchema = evaluatedSchema.parsedSchema;
            return (react_1.default.createElement("div", { className: "container-fluid" },
                react_1.default.createElement(react_final_form_2.Form, __assign({}, formProps, { mutators: __assign({}, final_form_arrays_1.default, { date: dateMutator }), render: function (formProps) {
                        _this.formProps = formProps;
                        return (react_1.default.createElement("form", { onSubmit: formProps.handleSubmit },
                            _this.getFields(parsedSchema),
                            react_1.default.createElement(react_final_form_1.FormSpy, { component: bottomBar, key: "bottomBar" })));
                    } }))));
        };
        _this.getFields = function (parsedSchema, arrayProperties) {
            if (Array.isArray(parsedSchema)) {
                return parsedSchema.map(function (layout) {
                    return (react_1.default.createElement("div", { className: layout.orientation === "vertical" ? "col-md-12" : "row" }, Object.keys(layout.fields).map(function (fieldName) {
                        // @ts-ignore
                        return _this.renderField(layout.fields[fieldName], fieldName, arrayProperties);
                    })));
                });
            }
            else if (typeof parsedSchema === "object" && arrayProperties) {
                // for arrays
                var orientation_1 = parsedSchema.orientation;
                var modfifiedArraySchema_1 = omit_1.default(parsedSchema, ["orientation"]);
                return (react_1.default.createElement("div", { className: orientation_1 === "vertical" ? "col-md-12" : "row" }, Object.keys(modfifiedArraySchema_1).map(function (fieldName) {
                    return _this.renderField(modfifiedArraySchema_1[fieldName], fieldName, arrayProperties);
                })));
            }
        };
        _this.renderField = function (field, fieldName, arrayProperties) {
            var componentFactory = _this.props.componentFactory;
            var errorObject = field.required || field.error
                ? {
                    error: field.error || field.validate,
                    required: field.required || false
                }
                : {};
            if (FormHelper_1.FormHelper.fieldPropertyCheck(field)) {
                return (react_1.default.createElement(react_final_form_1.FormSpy, { render: function (formSpyProps) {
                        var evaluatedField = FormHelper_1.FormHelper.metaDataEvaluator(
                        //@ts-ignore
                        omit_1.default(field, ["error"]), formSpyProps, fieldName);
                        return (react_1.default.createElement(react_final_form_2.Field, __assign({ name: arrayProperties && arrayProperties.name
                                ? arrayProperties.name + "." + fieldName
                                : fieldName, component: GetComponent_1.getComponent(evaluatedField, componentFactory), key: fieldName, validate: function (value, allValues, meta) {
                                return Validators_1.getErorr(errorObject, field, value, allValues, meta, fieldName);
                            }, 
                            //subscription={this.fieldSubscriptionEvaluator(field)}
                            mutators: _this.formProps.mutators }, omit_1.default(evaluatedField, ["validate", "name", "component"]))));
                    } }));
            }
            else if (field.type === "array") {
                return (react_1.default.createElement("div", { className: "m-20", key: fieldName },
                    react_1.default.createElement("label", null,
                        react_1.default.createElement("b", null, field.displayName)),
                    react_1.default.createElement(react_final_form_arrays_1.FieldArray, { name: fieldName, render: function (fieldArrayProps) {
                            return fieldArrayProps.fields.map(function (name) {
                                return _this.getFields(field.arrayFields, {
                                    name: name
                                });
                            });
                        } }),
                    react_1.default.createElement("div", { className: "d-flex mb-10 row-12" },
                        react_1.default.createElement("button", { type: "button", className: "btn btn-outline-primary w-20 mr-20", onClick: function () {
                                return _this.formProps.form.mutators.push(fieldName, undefined);
                            } }, field.addText ? field.addText : "Add +"),
                        react_1.default.createElement("button", { type: "button", className: "btn btn-outline-danger mr-20 w-20", onClick: function () {
                                return _this.formProps.form.mutators.pop(fieldName, undefined);
                            } }, field.addText ? field.addText : "Delete -"))));
            }
            else {
                return (react_1.default.createElement(react_final_form_2.Field, __assign({ name: arrayProperties && arrayProperties.name
                        ? arrayProperties.name + "." + fieldName
                        : fieldName, component: GetComponent_1.getComponent(field, componentFactory), key: fieldName, validate: function (value, allValues, meta) {
                        return Validators_1.getErorr(errorObject, field, value, allValues, meta, fieldName);
                    }, 
                    //subscription={this.fieldSubscriptionEvaluator(field)}
                    mutators: _this.formProps.mutators }, omit_1.default(field, ["validate", "name", "component"]))));
            }
        };
        return _this;
    }
    return FormBuilder;
}(react_1.default.PureComponent));
exports.FormBuilder = FormBuilder;
//# sourceMappingURL=FormBuilder.js.map