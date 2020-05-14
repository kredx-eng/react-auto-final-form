/// <reference types="react" />
import { Validators } from "../../utils/Validators";
import { FormRenderProps, FormSpyRenderProps } from "react-final-form";
export interface SchemaFields {
    name: string;
    type: "array" | "entity" | "string" | "number" | "document" | "group" | "date";
    component?: string | React.ComponentType<any>;
    validators?: Array<Validators | string> | Validators | string;
    arrayType?: "entity";
    layoutName?: string;
    entityName?: string;
    options?: Array<Options>;
    readonly?: boolean;
    subscriptions?: {
        [name: string]: boolean;
    };
    hidden?: boolean | Function;
    subscription?: {
        [fieldStateName: string]: boolean;
    };
    format?: any;
    required?: boolean;
    error?: Function;
    validate?: Function;
    displayIf?: Function;
    [otherFieldProps: string]: any;
}
export interface SchemaEntities extends AnyObject {
    name?: string;
    fields: Array<SchemaFields> | FieldsObject;
    layouts?: LayoutObject | Array<SchemaLayout>;
}
export interface SchemaLayout {
    orientation?: "horizontal" | "vertical";
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
    type?: "array" | "entity" | "string" | "number" | "document" | "group" | "date";
    component?: any;
    enum?: Array<any> | FieldFn;
    format?: "ISO" | "epoch" | "UTC";
}
export interface Schema {
    entities: Array<SchemaEntities> | EntityObject;
}
export interface Groups {
    fields: Array<ILayoutFields> | LayoutFields;
    title?: string;
    orientation?: "vertical" | "horizontal";
}
export declare type LayoutObject = {
    [name: string]: SchemaLayout;
};
export declare type GroupObject = {
    [name: string]: Groups;
};
export declare type FieldsObject = {
    [name: string]: SchemaFields;
};
export declare type LayoutFields = {
    [name: string]: ILayoutFields;
};
export declare type ComponentFactory = {
    [name: string]: React.ComponentType<any>;
};
export declare type FieldFn = (formState: FormRenderProps, value: any) => any;
export declare type AnyObject = {
    [name: string]: any;
};
export interface EntityObject {
    [name: string]: SchemaEntities;
}
export declare type Options = {
    value?: string;
    text?: string;
    label?: string;
};
export declare type RenderOption = (formState: FormSpyRenderProps, nextProps: Readonly<any>) => boolean;
