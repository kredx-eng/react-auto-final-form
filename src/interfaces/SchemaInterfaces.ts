import {Validators} from "../utils/Validators";

export interface IFields {
    name?: string;
    type: 'array' | 'entity' | 'string' | 'button' | 'number';
    component?: any;
    validators?: Array< Validators | string > | Validators | string;
    enum?: Array<any>;
    arrayType?: string;
    layoutName?: string;
    entityType?: 'array' | 'string' | 'button' | 'number';
    entityName?: string;
    format?: string;
}

export interface IEntities {
    name: string;
    fields: Array<IFields> | Fields;
    layouts?: Layout | Array<ILayout>;
}

export interface ILayout {
    groups?: Group;
    orientation?: 'horizontal' | 'vertical';
    fields?: LayoutFields | Array<ILayoutFields>;
    name?: string;
}

export interface ILayoutFields {
    displayName?: string;
    size?: number;
    hidden?: boolean;
    placeholder?: string;
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

export type FieldFn = (data: any, parameter?: any) => any;