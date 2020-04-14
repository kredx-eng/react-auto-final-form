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

export class NewFormBuilder extends React.PureComponent<IProps, any> {
  formProps: any;

  render = () => {
    const { schema, entityName, layoutName, bottomBar, formProps } = this.props;
    const evaluatedSchema = new SchemaEvaluator(schema, entityName, layoutName);
    const { parsedSchema, layoutFields } = evaluatedSchema;
    console.log("okay", parsedSchema, layoutFields);
    const isLayoutFields = !!isEmpty(parsedSchema);
    return (
      <div className={"container"} key={"container"}>
        <Form
          {...formProps}
          mutators={{ ...arrayMutators, date: dateMutator }}
          render={formProps => {
            this.formProps = formProps;
            return (
              <form onSubmit={formProps.handleSubmit}>
                {this.getFields(
                  isLayoutFields ? layoutFields : parsedSchema,
                  isLayoutFields
                )}
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

  getFields = (field: any, isLayoutFields: boolean) => {
    if (!isLayoutFields && typeof field === "object") {
      return Object.keys(field).map(fieldName =>
        this.renderField(field[fieldName], fieldName)
      );
    } else if (Array.isArray(field) && isLayoutFields) {
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
              this.renderField(layout.fields[fieldName], fieldName)
            )}
          </div>
        );
      });
    }
  };

  renderField = (field: any, fieldName: string) => {
    const { componentFactory } = this.props;
    const errorObject =
      field.required || field.error
        ? {
            error: field.error || field.validate,
            required: field.required || false
          }
        : {};
    if (this.fieldPropertyCheck(field)) {
      return (
        <FormSpy
          render={formSpyProps => {
            return (
              <div
                className={"fieldContainer"}
                style={this.buildCustomStyle(field)}
                key={fieldName}
              >
                <SpyWrapper
                  field={field}
                  formData={formSpyProps}
                  renderOptions={
                    this.props.renderOption
                      ? this.props.renderOption
                      : undefined
                  }
                  //subscription={this.fieldSubscriptionEvaluator(field)}
                  componentFactory={this.props.componentFactory}
                  key={fieldName}
                  errorObject={errorObject}
                  fieldName={fieldName}
                  {...omit(field, ["validate", "name", "component"])}
                />
              </div>
            );
          }}
        />
      );
    } else {
      return (
        <div
          className={"fieldContainer"}
          style={this.buildCustomStyle(field)}
          key={fieldName}
        >
          <Field
            name={fieldName}
            component={getComponent(field, componentFactory)}
            key={fieldName}
            validate={(value, allValues, meta) =>
              getErorr(errorObject, field, value, allValues, meta, fieldName)
            }
            //subscription={this.fieldSubscriptionEvaluator(field)}
            mutators={this.formProps.mutators}
            {...omit(field, ["validate", "name", "component"])}
          />
        </div>
      );
    }
  };

  //To check whether any field property is of type function
  fieldPropertyCheck = (field: any) => {
    for (let key in field) {
      if (typeof field[key] === "function") {
        return true;
      }
    }
    return false;
  };

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
