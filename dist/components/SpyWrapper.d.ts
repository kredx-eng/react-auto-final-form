import React from 'react';
import { ComponentFactory, IFields, RenderOption } from "../interfaces/SchemaInterfaces";
import { FormSpyRenderProps } from "react-final-form";
interface IProps {
    field: IFields;
    renderOptions?: RenderOption;
    formData: FormSpyRenderProps;
    subscription: {
        [fieldStateName: string]: boolean;
    } | undefined;
    componentFactory?: ComponentFactory;
}
declare class SpyWrapper extends React.Component<IProps, any> {
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<any>, nextContext: any): boolean;
    render: () => JSX.Element;
    handleComponent: (field: IFields) => any;
}
export default SpyWrapper;
