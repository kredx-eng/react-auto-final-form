import React from "react";
import { AnyObject } from "./interfaces/SchemaInterfaces";
import "bootstrap/dist/css/bootstrap.min.css";
export declare class FormBuilder extends React.PureComponent<any, any> {
    formProps: any;
    render: () => JSX.Element;
    getFields: (parsedSchema: any, arrayProperties?: AnyObject | undefined) => JSX.Element | JSX.Element[] | undefined;
    renderField: (field: any, fieldName: string, arrayProperties?: AnyObject | undefined) => JSX.Element;
}
