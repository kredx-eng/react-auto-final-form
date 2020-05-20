import React from "react";
import {
  ComponentFactory,
  FieldsObject,
  SchemaFields,
  RenderOption,
  AnyObject
} from "../FormBuilder/interfaces/SchemaInterfaces";
import { Field, FormSpy, FormSpyRenderProps } from "react-final-form";
import TextInputField from "./input/TextInputField";
import { FormHelper } from "../utils/FormHelper";
import { getErorr, validators } from "../utils/Validators";
import { getComponent } from "../utils/GetComponent";
import omit from "lodash/omit";

interface IProps {
  field: any;
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
        validate={(value, allValues, meta) =>
          getErorr(errorObject, field, value, allValues, meta, fieldName)
        }
        size={
          field.size
            ? FormHelper.metaDataEvaluator(field.size, formData, fieldName)
            : 10
        }
        subscription={this.props.subscription}
        {...omit(field, ["name"])}
      />
    );
  };
}

export default SpyWrapper;
