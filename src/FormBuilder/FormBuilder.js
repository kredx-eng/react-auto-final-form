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
exports.__esModule = true;
var react_1 = require("react");
var react_final_form_1 = require("react-final-form");
var SchemaEvaluator_1 = require("./SchemaEvaluator");
require("../components/FormBuilder.css");
var react_final_form_2 = require("react-final-form");
var final_form_arrays_1 = require("final-form-arrays");
var GetComponent_1 = require("../utils/GetComponent");
var Validators_1 = require("../utils/Validators");
var omit_1 = require("lodash/omit");
var FormHelper_1 = require("../utils/FormHelper");
var react_final_form_arrays_1 = require("react-final-form-arrays");
require("bootstrap/dist/css/bootstrap.min.css");
var classnames_1 = require("classnames");
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
            console.log("schema", schema, entityName);
            var evaluatedSchema = new SchemaEvaluator_1.SchemaEvaluator(schema, entityName, layoutName);
            console.log("evaluated", evaluatedSchema);
            var parsedSchema = evaluatedSchema.parsedSchema, layoutFields = evaluatedSchema.layoutFields;
            var isLayoutFields = true;
            return (<div className={"container-fluid form-builder"}>
        <react_final_form_2.Form {...formProps} mutators={__assign({}, final_form_arrays_1["default"], { date: dateMutator })} render={function (formProps) {
                _this.formProps = formProps;
                return (<form onSubmit={formProps.handleSubmit}>
                {_this.getFields(parsedSchema)}
                <react_final_form_2.Field name={"bottomBar"} component={_this.props.bottomBar} key={"bottomBar"}/>
              </form>);
            }}/>
      </div>);
        };
        _this.getFields = function (parsedSchema, arrayProperties) {
            if (Array.isArray(parsedSchema)) {
                return parsedSchema.map(function (layout) {
                    return (<div className={classnames_1["default"](layout.orientation === "vertical" ? "col" : "row")}>
            {Object.keys(layout.fields).map(function (fieldName) {
                        // @ts-ignore
                        return _this.renderField(layout.fields[fieldName], fieldName, arrayProperties);
                    })}
          </div>);
                });
            }
            else if (typeof parsedSchema === "object" && arrayProperties) {
                // for arrays
                var orientation_1 = parsedSchema.orientation;
                var modfifiedArraySchema_1 = omit_1["default"](parsedSchema, ["orientation"]);
                return (<div className={orientation_1 === "vertical" ? "verticalLayout" : "horizontalLayout"}>
          {Object.keys(modfifiedArraySchema_1).map(function (fieldName) {
                    return _this.renderField(modfifiedArraySchema_1[fieldName], fieldName, arrayProperties);
                })}
        </div>);
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
                return (<react_final_form_1.FormSpy render={function (formSpyProps) {
                    var evaluatedField = FormHelper_1.FormHelper.metaDataEvaluator(
                    //@ts-ignore
                    omit_1["default"](field, ["error"]), formSpyProps, fieldName);
                    return (<react_final_form_2.Field name={arrayProperties && arrayProperties.name
                        ? arrayProperties.name + "." + fieldName
                        : fieldName} component={GetComponent_1.getComponent(evaluatedField, componentFactory)} key={fieldName} validate={function (value, allValues, meta) {
                        return Validators_1.getErorr(errorObject, field, value, allValues, meta, fieldName);
                    }} 
                    //subscription={this.fieldSubscriptionEvaluator(field)}
                    mutators={_this.formProps.mutators} {...omit_1["default"](evaluatedField, ["validate", "name", "component"])}/>);
                }}/>);
            }
            else if (field.type === "array") {
                return (<div className={"m-20"} key={fieldName}>
          <label>
            <b>{field.displayName}</b>
          </label>
          <react_final_form_arrays_1.FieldArray name={fieldName} render={function (fieldArrayProps) {
                    return fieldArrayProps.fields.map(function (name) {
                        return _this.getFields(field.arrayFields, {
                            name: name
                        });
                    });
                }}/>
          <div className={"d-flex mb-10 row-12"}>
            <button type={"button"} className={"btn btn-outline-primary w-20 mr-20"} onClick={function () {
                    return _this.formProps.form.mutators.push(fieldName, undefined);
                }}>
              {field.addText ? field.addText : "Add +"}
            </button>
            <button type={"button"} className={"btn btn-outline-danger mr-20 w-20"} onClick={function () {
                    return _this.formProps.form.mutators.pop(fieldName, undefined);
                }}>
              {field.addText ? field.addText : "Delete -"}
            </button>
          </div>
        </div>);
            }
            else {
                return (<react_final_form_2.Field name={arrayProperties && arrayProperties.name
                    ? arrayProperties.name + "." + fieldName
                    : fieldName} component={GetComponent_1.getComponent(field, componentFactory)} key={fieldName} validate={function (value, allValues, meta) {
                    return Validators_1.getErorr(errorObject, field, value, allValues, meta, fieldName);
                }} 
                //subscription={this.fieldSubscriptionEvaluator(field)}
                mutators={_this.formProps.mutators} {...omit_1["default"](field, ["validate", "name", "component"])}/>);
            }
        };
        return _this;
    }
    return FormBuilder;
}(react_1["default"].PureComponent));
exports.FormBuilder = FormBuilder;
