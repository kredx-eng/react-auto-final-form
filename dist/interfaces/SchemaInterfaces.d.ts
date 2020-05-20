import { Validators } from "../utils/Validators";
import { FormRenderProps, FormSpyRenderProps } from "react-final-form";
export interface IFields extends ILayoutFields {
    name?: string;
    type: 'array' | 'entity' | 'string' | 'number' | 'document' | 'group' | 'date';
    component?: any;
    validators?: Array<Validators | string> | Validators | string;
    arrayType?: 'entity';
    layoutName?: string;
    entityName?: string | FieldFn;
    addText?: string;
    options?: Array<Options>;
    readonly?: boolean;
    subscriptions?: {
        [name: string]: boolean;
    };
    hidden?: boolean | FieldFn;
    subscription?: {
        [fieldStateName: string]: boolean;
    };
    format?: 'ISO' | 'epoch' | 'UTC';
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
    type?: 'array' | 'entity' | 'string' | 'number' | 'document' | 'group' | 'date';
    component?: any;
    enum?: Array<any> | FieldFn;
    format?: 'ISO' | 'epoch' | 'UTC';
}
export interface ISchema {
    entities: Array<IEntities>;
}
export interface IGroups {
    fields: Array<ILayoutFields> | LayoutFields;
    title?: string;
    orientation?: 'vertical' | 'horizontal';
}
export declare type Layout = {
    [name: string]: ILayout;
};
export declare type Group = {
    [name: string]: IGroups;
};
export declare type Fields = {
    [name: string]: IFields;
};
export declare type LayoutFields = {
    [name: string]: ILayoutFields;
};
export declare type ComponentFactory = {
    [name: string]: any;
};
export declare type FieldFn = (formState: FormRenderProps, value: any) => any;
export declare type SimpleObj = {
    [name: string]: any;
};
export declare type Options = {
    value: string;
    text: string;
};
export declare type RenderOption = (formState: FormSpyRenderProps, nextProps: Readonly<any>) => boolean;
