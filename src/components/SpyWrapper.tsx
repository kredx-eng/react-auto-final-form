import React from "react";
import {
  ComponentFactory,
  Fields,
  IFields,
  RenderOption,
  AnyObject
} from "../interfaces/SchemaInterfaces";
import { Field, FormSpy, FormSpyRenderProps } from "react-final-form";
import TextInputField from "./input/TextInputField";
import { FormHelper } from "../utils/FormHelper";
import { getErorr, validators } from "../utils/Validators";
import { getComponent } from "../utils/GetComponent";

interface IProps {
  field: IFields;
  renderOptions?: RenderOption;
  formData: FormSpyRenderProps;
  subscription?: { [fieldStateName: string]: boolean } | undefined;
  componentFactory?: ComponentFactory;
  errorObject?: AnyObject;
  fieldName: string;
}

class SpyWrapper extends React.Component<IProps, any> {
  shouldComponentUpdate(
    nextProps: Readonly<IProps>,
    nextState: Readonly<any>,
    nextContext: any
  ): boolean {
    if (this.props.renderOptions) {
      return this.props.renderOptions(this.props.formData, nextProps);
    } else if (nextProps !== this.props || nextState !== this.state) {
      return true;
    }
    return false;
  }

  render = () => {
    const {
      field,
      formData,
      errorObject,
      componentFactory,
      fieldName
    } = this.props;
    return (
      <Field
        name={fieldName}
        component={getComponent(field, componentFactory)}
        displayName={FormHelper.metaDataEvaluator(field.displayName, formData)}
        hidden={FormHelper.metaDataEvaluator(field.hidden, formData)}
        validate={(value, allValues, meta) =>
          getErorr(errorObject, field, value, allValues, meta, fieldName)
        }
        size={
          field.size ? FormHelper.metaDataEvaluator(field.size, formData) : 10
        }
        subscription={this.props.subscription}
      />
    );
  };
}

export default SpyWrapper;
