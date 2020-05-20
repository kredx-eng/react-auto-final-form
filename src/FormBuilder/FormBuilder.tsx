import React from "react";
import {
  AnyObject,
  ComponentFactory,
  SchemaFields,
  Schema,
  RenderOption
} from "./interfaces/SchemaInterfaces";
import {
  FieldRenderProps,
  FormProps,
  FormRenderProps,
  FormSpy
} from "react-final-form";
import { SchemaEvaluator } from "./SchemaEvaluator";
import isEmpty from "lodash/isEmpty";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { getComponent } from "../utils/GetComponent";
import { getErorr } from "../utils/Validators";
import omit from "lodash/omit";
import { FormHelper } from "../utils/FormHelper";
import { FieldArray } from "react-final-form-arrays";
import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames";
import styles from "./FormBuilderStyles";
import Button from "../components/input/FormButton";

interface IProps {
  schema: Schema;
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

export class FormBuilder extends React.PureComponent<any, any> {
  formProps: any;

  render = () => {
    const { schema, entityName, layoutName, bottomBar, formProps } = this.props;
    const evaluatedSchema = new SchemaEvaluator(schema, entityName, layoutName);
    const { parsedSchema } = evaluatedSchema;
    return (
      <div className={"container-fluid"}>
        <Form
          {...formProps}
          mutators={{ ...arrayMutators, date: dateMutator }}
          render={formProps => {
            this.formProps = formProps;
            return (
              <form onSubmit={formProps.handleSubmit}>
                {this.getFields(parsedSchema)}
                <FormSpy component={bottomBar} key={"bottomBar"} />
              </form>
            );
          }}
        />
      </div>
    );
  };

  getFields = (parsedSchema: any, arrayProperties?: AnyObject) => {
    if (Array.isArray(parsedSchema)) {
      return parsedSchema.map(layout => {
        return (
          <div
            className={layout.orientation === "vertical" ? "col-md-12" : "row"}
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
    } else if (typeof parsedSchema === "object" && arrayProperties) {
      // for arrays
      const { orientation } = parsedSchema;
      const modfifiedArraySchema = omit(parsedSchema, ["orientation"]);
      return (
        <div className={orientation === "vertical" ? "col-md-12" : "row"}>
          {Object.keys(modfifiedArraySchema).map(fieldName => {
            return this.renderField(
              modfifiedArraySchema[fieldName],
              fieldName,
              arrayProperties
            );
          })}
        </div>
      );
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
        <div className={"m-20"} key={fieldName}>
          <label>
            <b>{field.displayName}</b>
          </label>
          <FieldArray
            name={fieldName}
            render={(fieldArrayProps: any) => {
              return fieldArrayProps.fields.map((name: any) =>
                this.getFields(field.arrayFields, {
                  name
                })
              );
            }}
          />
          <div className={"d-flex mb-10 row-12"}>
            <button
              type={"button"}
              className={"btn btn-outline-primary w-20 mr-20"}
              onClick={() =>
                this.formProps.form.mutators.push(fieldName, undefined)
              }
            >
              {field.addText ? field.addText : "Add +"}
            </button>
            <button
              type={"button"}
              className={"btn btn-outline-danger mr-20 w-20"}
              onClick={() =>
                this.formProps.form.mutators.pop(fieldName, undefined)
              }
            >
              {field.addText ? field.addText : "Delete -"}
            </button>
          </div>
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
}
