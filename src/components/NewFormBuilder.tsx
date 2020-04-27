import React from "react";
import {
  AnyObject,
  ComponentFactory,
  IFields,
  ISchema,
  RenderOption
} from "../interfaces/SchemaInterfaces";
import {
  FieldRenderProps,
  FormProps,
  FormRenderProps,
  FormSpy
} from "react-final-form";
import { SchemaEvaluator } from "./SchemaEvaluator";
import isEmpty from "lodash/isEmpty";
import "./FormBuilder.css";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { getComponent } from "../utils/GetComponent";
import { getErorr } from "../utils/Validators";
import omit from "lodash/omit";
import SpyWrapper from "./SpyWrapper";
import { FormHelper } from "../utils/FormHelper";
import { FieldArray } from "react-final-form-arrays";
import "bootstrap/dist/css/bootstrap.min.css";

interface IProps {
  schema: ISchema;
  componentFactory?: ComponentFactory;
  entityName: string;
  layoutName?: string;
  bottomBar:
    | React.FC<FieldRenderProps<any, HTMLElement>>
    | React.ComponentClass<FieldRenderProps<any, HTMLElement>>;
  allFieldsSubscription?: { [fieldStateName: string]: boolean };
  renderOption?: RenderOption;
  formProps: FormProps;
}

const dateMutator = (args: string, state: any, utils: any) => {
  const setDate = (value: string) => {
    const date = value.split("-");
    const d = new Date(
      parseInt(date[0]),
      parseInt(date[1]) - 1,
      parseInt(date[2])
    );
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
    } else return d.toDateString();
  };
  utils.changeValue(state, args[0], (value: any) => setDate(value));
};

export class NewFormBuilder extends React.PureComponent<any, any> {
  formProps: any;

  render = () => {
    const { schema, entityName, layoutName, bottomBar, formProps } = this.props;
    const evaluatedSchema = new SchemaEvaluator(schema, entityName, layoutName);
    const { parsedSchema, layoutFields } = evaluatedSchema;
    console.log("henlo", parsedSchema, layoutFields);
    const isLayoutFields = true;
    return (
      <div
        className={"container col-12"}
        key={"container"}
        style={{ width: "100vw" }}
      >
        <Form
          {...formProps}
          mutators={{ ...arrayMutators, date: dateMutator }}
          render={formProps => {
            this.formProps = formProps;
            return (
              <form onSubmit={formProps.handleSubmit}>
                {this.getFields(parsedSchema, isLayoutFields)}
                <Field
                  name={"bottomBar"}
                  component={this.props.bottomBar}
                  key={"bottomBar"}
                />
              </form>
            );
          }}
        />
      </div>
    );
  };

  getFields = (
    field: any,
    orientation: boolean,
    arrayProperties?: AnyObject
  ) => {
    if (!orientation && typeof field === "object") {
      console.log("here", field, orientation);
      return Object.keys(field).map(fieldName =>
        this.renderField(field[fieldName], fieldName, arrayProperties)
      );
    } else if (Array.isArray(field) && orientation) {
      console.log("okay", field, orientation);
      return field.map(layout => {
        return (
          <div
            className={
              layout.orientation === "vertical"
                ? "verticalLayout"
                : "horizontalLayout"
            }
          >
            {Object.keys(layout.fields).map(fieldName =>
              // @ts-ignore
              this.renderField(
                layout.fields[fieldName],
                fieldName,
                arrayProperties
              )
            )}
          </div>
        );
      });
    } else if (orientation) {
    }
  };

  renderField = (
    field: any,
    fieldName: string,
    arrayProperties?: AnyObject
  ) => {
    const { componentFactory } = this.props;
    const errorObject =
      field.required || field.error
        ? {
            error: field.error || field.validate,
            required: field.required || false
          }
        : {};
    if (FormHelper.fieldPropertyCheck(field)) {
      return (
        <FormSpy
          render={formSpyProps => {
            const evaluatedField = FormHelper.metaDataEvaluator(
              //@ts-ignore
              omit(field, ["error"]),
              formSpyProps,
              fieldName
            );
            return (
              <Field
                name={
                  arrayProperties && arrayProperties.name
                    ? `${arrayProperties.name}.${fieldName}`
                    : fieldName
                }
                component={getComponent(evaluatedField, componentFactory)}
                key={fieldName}
                validate={(value, allValues, meta) =>
                  getErorr(
                    errorObject,
                    field,
                    value,
                    allValues,
                    meta,
                    fieldName
                  )
                }
                //subscription={this.fieldSubscriptionEvaluator(field)}
                mutators={this.formProps.mutators}
                {...omit(evaluatedField, ["validate", "name", "component"])}
              />
            );
          }}
        />
      );
    } else if (field.type === "array") {
      return (
        <div
          className={"array ml-10"}
          style={this.buildCustomStyle(field)}
          key={fieldName}
        >
          <label>
            <b>{field.displayName}</b>
          </label>
          <FieldArray
            name={fieldName}
            render={(fieldArrayProps: any) => {
              console.log("fieldsssss", field);
              return fieldArrayProps.fields.map((name: any) =>
                this.getFields(field.arrayFields, field.isLayoutField, {
                  name
                })
              );
            }}
          />
          <button
            type={"button"}
            className={"btn btn-outline-primary w-20"}
            onClick={() =>
              this.formProps.form.mutators.push(fieldName, undefined)
            }
          >
            {field.addText ? field.addText : "Add +"}
          </button>
          <button
            type={"button"}
            className={"btn btn-outline-danger w-20"}
            onClick={() =>
              this.formProps.form.mutators.pop(fieldName, undefined)
            }
          >
            {field.addText ? field.addText : "Delete -"}
          </button>
        </div>
      );
    } else {
      return (
        <Field
          name={
            arrayProperties && arrayProperties.name
              ? `${arrayProperties.name}.${fieldName}`
              : fieldName
          }
          component={getComponent(field, componentFactory)}
          key={fieldName}
          validate={(value, allValues, meta) =>
            getErorr(errorObject, field, value, allValues, meta, fieldName)
          }
          //subscription={this.fieldSubscriptionEvaluator(field)}
          mutators={this.formProps.mutators}
          {...omit(field, ["validate", "name", "component"])}
        />
      );
    }
  };

  //To check whether any field property is of type function

  buildCustomStyle = (field: IFields) => {
    let size: number;
    let styleObj = {};
    if (field.hidden) {
      Object.assign(styleObj, { display: "hidden" });
    }
    if (field.size && typeof field.size !== "function") {
      size = field.size * 10;
      let minSize = size / 4;
      if (field.type !== "array") {
        Object.assign(styleObj, {
          flex: field.size,
          maxWidth: `${size}vw`,
          flexWrap: "wrap"
          // minWidth: `${minSize}vw`
        });
      } else {
        Object.assign(styleObj, {
          flex: field.size,
          maxWidth: `${size}vw`,
          flexWrap: "wrap",
          minWidth: `${minSize}vw`,
          width: `${size}vw`
        });
      }
    } else {
      size = 100;
      let minSize = size / 4;
      Object.assign(styleObj, {
        flex: size / 10,
        maxWidth: `${size}vw`,
        flexWrap: "wrap",
        minWidth: `${minSize}vw`,
        width: `${size}vw`
      });
    }
    return styleObj;
  };
}
