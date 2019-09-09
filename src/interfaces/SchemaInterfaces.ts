import {Validators} from "../utils/Validators";
import {FormRenderProps, FormSpyRenderProps} from "react-final-form";

export interface IFields extends ILayoutFields {
    name?: string ;
    type: 'array' | 'entity' | 'string' | 'number' | FieldFn | 'document' | 'group';
    component?: any;
    validators?: Array< Validators | string > | Validators | string;
    arrayType?: 'entity';
    layoutName?: string;
    entityName?: string | FieldFn;
    format?: string;
    addText?: string;
    options?: Array<Options>;
    readonly?: boolean;
    subscriptions?: {[name: string]: boolean};
    hidden?: boolean | FieldFn;
    subscription?: { [fieldStateName: string]: boolean };
}

export interface IEntities {
    name: string;
    fields: Array<IFields> | Fields;
    layouts?: Layout | Array<ILayout>;
}

export interface ILayout {
    groups?: Group;
    orientation?: 'horizontal' | 'vertical' | FieldFn;
    fields?: LayoutFields | Array<ILayoutFields>;
    name?: string;
}

export interface ILayoutFields {
    displayName?: string | FieldFn;
    size?: number | FieldFn;
    hidden?: boolean | FieldFn;
    placeholder?: string | FieldFn;
    name?: string;
    group?: string;
    type?: 'array' | 'entity' | 'string' | 'number' | FieldFn | 'document' | 'group';
    component?: any;
    enum?: Array<any> | FieldFn;
}

export interface ISchema {
    entities: Array<IEntities>;
}

export interface IGroups {
    fields: Array<ILayoutFields> | LayoutFields;
    title?: string;
    orientation?: 'vertical' | 'horizontal'
}

export type Layout = {
    [name: string]: ILayout
}

export type Group = {
    [name: string]: IGroups
}

export type Fields = {
    [name: string]: IFields
}

export type LayoutFields = {
    [name: string]: ILayoutFields
}

export type ComponentFactory = {
    [name: string]: any
}

export type FieldFn = (formState: FormRenderProps, value: any) => any;

export type SimpleObj = {
    [name: string]: any
}

export type Options = {value: string, text: string}

export type RenderOption = (formState: FormSpyRenderProps, nextProps: Readonly<any>) => boolean