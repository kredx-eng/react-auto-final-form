import React from 'react';
import { ComponentFactory, Fields, Group, IEntities, IFields, IGroups, ILayout, ILayoutFields, ISchema, Layout, LayoutFields, RenderOption, SimpleObj } from "../interfaces/SchemaInterfaces";
import { FieldRenderProps, FormProps } from 'react-final-form';
import './FormBuilder.css';
interface IProps {
    onSubmit: (value: any) => void;
    schema: ISchema;
    componentFactory?: ComponentFactory;
    entityName: string;
    layoutName?: string;
    initialValues?: SimpleObj;
    subscription?: {
        [formStateName: string]: boolean;
    };
    bottomBar: React.FC<FieldRenderProps<any, HTMLElement>> | React.ComponentClass<FieldRenderProps<any, HTMLElement>>;
    allFieldsSubscription?: {
        [fieldStateName: string]: boolean;
    };
    renderOption?: RenderOption;
}
declare class FormBuilder extends React.Component<IProps, any> {
    formData: any;
    previousEntity: string;
    isArray: boolean;
    currentEntity: any;
    nested: boolean;
    formProps: any | FormProps;
    fieldNameStack: Array<string>;
    constructor(props: IProps);
    handleSubmit: (submitData: any) => void;
    checkSchema: () => void;
    render: () => JSX.Element;
    entityEvaluator: (entity: IEntities, arrayName?: string | undefined) => any[] | JSX.Element | undefined;
    layoutEvaluator: (layoutName: any, layouts: Layout | ILayout[], fields: IFields[] | Fields) => any[] | undefined;
    fieldEvaluator: (fields: IFields[] | Fields, layoutFields?: ILayoutFields[] | LayoutFields | undefined, groups?: Group | undefined) => any[] | undefined;
    groupEvaluator: (group: IGroups, fields: IFields[] | Fields, index?: number | undefined) => JSX.Element | undefined;
    handleOrientation: (orientation: any, layouts: Layout | ILayout[], fields: IFields[] | Fields, layoutName?: string | undefined) => JSX.Element | undefined;
    fieldRenderer: (field: any, index?: number | undefined) => any;
    handleArray: (fieldArrayProps: any, entityName: string, arrayName: string) => any[] | JSX.Element | undefined;
    fieldPropertyCheck: (field: any) => boolean;
    fieldSubscriptionEvaluator: (field: IFields) => {
        [fieldStateName: string]: boolean;
    } | undefined;
    buildCustomStyle: (field: IFields) => {};
}
export default FormBuilder;
