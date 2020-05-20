import React from "react";
import { ComponentFactory, RenderOption, AnyObject } from "../FormBuilder/interfaces/SchemaInterfaces";
import { FormSpyRenderProps } from "react-final-form";
interface IProps {
    field: any;
    renderOptions?: RenderOption;
    formData: FormSpyRenderProps;
    subscription?: {
        [fieldStateName: string]: boolean;
    } | undefined;
    componentFactory?: ComponentFactory;
    errorObject?: AnyObject;
    fieldName: string;
}
declare class SpyWrapper extends React.Component<IProps, any> {
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<any>, nextContext: any): boolean;
    render: () => JSX.Element;
}
export default SpyWrapper;
