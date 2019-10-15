import React from 'react';
import {ISchema} from "../interfaces/SchemaInterfaces";
import './SchemaSelect.css'

interface IProps {
    schemas: {
        [name: string]: ISchema
    };
}

const SchemaSelect = (props: any) => {
    const {schemas, input, meta} = props;
    let schemaArray: any = [];
    const mapOptions = () => {
        for (let schemaName in schemas) {
            schemaArray.push({name: schemaName, ...schemas[schemaName]})
        }
        return schemaArray.map((schema: any) => {
            return (
                <option value={schema.name}>{schema.name}</option>
            )
        })
    };
    return (
        <div className={'inputField'}>
            <label>Select a type of schema</label>
            <select
                name={input.name}
                onChange={(event: any) => {
                    props.input.onChange(event);
                    props.handleChange(event.target.value)
                }}
                onFocus={input.onFocus}
                onBlur={input.onBlur}
                key={input.name}
                id={'selectInput'}
            >
                {mapOptions()}
            </select>
        </div>
    )
}

export default SchemaSelect;