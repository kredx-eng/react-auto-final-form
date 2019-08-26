import {Validators} from "../utils/Validators";
import {FormRenderProps} from "react-final-form";

export interface IFields {
    name?: string ;
    type: 'array' | 'entity' | 'string' | 'button' | 'number' | FieldFn | 'document';
    component?: any;
    validators?: Array< Validators | string > | Validators | string;
    enum?: Array<any> | FieldFn;
    arrayType?: string;
    layoutName?: string;
    entityType?: 'array' | 'string' | 'button' | 'number';
    entityName?: string | FieldFn;
    format?: string;
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
}

export interface ISchema {
    entities: Array<IEntities>;
}

export interface IGroups {
    fields: Array<ILayoutFields> | LayoutFields;
    title: string;
    orientation: 'vertical' | 'horizontal'
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

export type FieldFn = (formState: FormRenderProps, parameter?: any) => any;