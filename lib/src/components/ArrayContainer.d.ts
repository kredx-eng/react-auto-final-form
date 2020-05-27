import React from "react";
import { AnyObject } from "../FormBuilder/interfaces/SchemaInterfaces";
interface ArrayContainerProps extends React.ComponentProps<any> {
    addField: Function;
    deleteField: Function;
    name: string;
    arrayProps: AnyObject;
    buttonBar?: React.ElementType;
}
export declare class ArrayContainer extends React.PureComponent<ArrayContainerProps, any> {
    addField: () => void;
    deleteField: () => void;
    render: () => JSX.Element;
}
export {};
