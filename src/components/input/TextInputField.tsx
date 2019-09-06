import React from "react";
import {IFields, ILayout} from "../../interfaces/SchemaInterfaces";
import {FieldRenderProps} from "react-final-form";
import './TextInputField.css';
import {FormHelper} from "../../utils/FormHelper";

interface IProps {
    field: IFields;
    layout?: ILayout;
    fieldProps: FieldRenderProps<any, any>;
}

const TextInputField = (props: any) => {
    const {input, meta} = props;
    console.log(input.name,'field Rerendered')
    if(!!props.hidden) {
        return(
            <div className={'hidden'}>Hidden</div>
        )
    } else {
        return (
            <div className={'field'} style={{flex: props.size}} key={input.name}>
                <label className={'label'}>{props.displayName}</label>
                <input
                    name={input.name}
                    type={input.type}
                    onChange={input.onChange}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                    className={'textInput'}
                    value={input.value}
                />
                {meta.error && meta.touched &&
                <p>
                    {(Array.isArray(meta.error)) ? (meta.error[meta.error.length - 1]) : meta.error}
                </p>}
            </div>
        )}
};

export default TextInputField;