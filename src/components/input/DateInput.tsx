import React from "react";
import {IFields, ILayout} from "../../interfaces/SchemaInterfaces";
import {FieldRenderProps} from "react-final-form";
import './DateInput.css';


interface IProps {
    field: IFields;
    layout?: ILayout;
    fieldProps: FieldRenderProps<any, any>;
}

const DateInput = (props: any) => {
    const {input, meta} = props;
    const createDate = (event: any) => {
        console.log(props.mutators, input.name);
        input.onChange(event);
        (props.formatting) ? props.mutators.date(input.name, props.formatting) : props.mutators.date(input.name);
    };
    return (
        <div className={'dateInput'} key={`field.${input.name}`}>
            <label className={'label'}>{props.displayName}</label>
            <input
                name={input.name}
                type={'date'}
                onChange={createDate}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                className={'date'}
            />

            {meta.error && meta.touched &&
            <p>
                {(Array.isArray(meta.error)) ? (meta.error[meta.error.length - 1]) : meta.error}
            </p>}
        </div>
    )
};

export default DateInput;