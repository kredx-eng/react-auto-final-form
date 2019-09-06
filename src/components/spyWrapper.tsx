import React from 'react';
import {Fields, IFields, RenderOption, SimpleObj} from "../interfaces/SchemaInterfaces";
import {Field, FormSpy, FormSpyRenderProps} from "react-final-form";
import TextInputField from "./input/TextInputField";
import {FormHelper} from "../utils/FormHelper";
import {validators} from "../utils/Validators";

interface IProps {
    field: IFields;
    renderOptions?: RenderOption;
    formData: FormSpyRenderProps;
    subscription: { [fieldStateName: string]: boolean } | undefined;
}


class SpyWrapper extends React.Component<IProps, any>{

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<any>, nextContext: any): boolean {
        if(this.props.renderOptions) {
            return this.props.renderOptions(this.props.formData, nextProps);
        }
        return true
    }

    render = () => {
        const {field, formData} = this.props;
        return(
            <Field
                name={`${field.name}`}
                component={TextInputField}
                displayName={FormHelper.metaDataEvaluator(field.displayName, formData)}
                hidden={FormHelper.metaDataEvaluator(field.hidden, formData)}
                validate={(value) => (field.validators ? validators.required(value) : undefined)}
                size={field.size ? FormHelper.metaDataEvaluator(field.size, formData): 10}
            />
        )
    }
}

export default SpyWrapper