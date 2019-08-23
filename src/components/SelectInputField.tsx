import React from "react";

const SelectInputField = (props: any) => {
    const {input, meta} = props;
    return (
        <div className={'field'} style={{flex: props.size}} key={input.name}>
            <label>{props.displayName}</label>
            <select name={props.displayName} onChange={props.input.onChange} onFocus={input.onFocus}
                    onBlur={input.onBlur} defaultValue={''}>
                {props.enum.map((options: any) => {
                    return (
                        <option value={options}>{options}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default SelectInputField