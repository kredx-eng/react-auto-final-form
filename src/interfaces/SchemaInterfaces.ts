import { Validators } from "../utils/Validators";
import { FormRenderProps, FormSpyRenderProps } from "react-final-form";

export interface IFields extends ILayoutFields {
  name: string;
  type:
    | "array"
    | "entity"
    | "string"
    | "number"
    | "document"
    | "group"
    | "date";
  component?: string | React.ComponentType<any>;
  validators?: Array<Validators | string> | Validators | string;
  arrayType?: "entity";
  layoutName?: string;
  entityName?: string;
  addText?: string;
  options?: Array<Options>;
  readonly?: boolean;
  subscriptions?: { [name: string]: boolean };
  hidden?: boolean | FieldFn;
  subscription?: { [fieldStateName: string]: boolean };
  format?: any;
  required?: boolean;
  error?: Function;
  validate?: Function;
}

export interface IEntities {
  name: string;
  fields: Array<IFields> | Fields;
  layouts?: Layout | Array<ILayout>;
}

export interface ILayout {
  groups?: Group;
  orientation?: "horizontal" | "vertical" | FieldFn;
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
  type?:
    | "array"
    | "entity"
    | "string"
    | "number"
    | "document"
    | "group"
    | "date";
  component?: any;
  enum?: Array<any> | FieldFn;
  format?: "ISO" | "epoch" | "UTC";
}

export interface ISchema {
  entities: Array<IEntities>;
}

export interface IGroups {
  fields: Array<ILayoutFields> | LayoutFields;
  title?: string;
  orientation?: "vertical" | "horizontal";
}

export type Layout = {
  [name: string]: ILayout;
};

export type Group = {
  [name: string]: IGroups;
};

export type Fields = {
  [name: string]: IFields;
};

export type LayoutFields = {
  [name: string]: ILayoutFields;
};

export type ComponentFactory = {
  [name: string]: React.ComponentType<any>;
};

export type FieldFn = (formState: FormRenderProps, value: any) => any;

export type AnyObject = {
  [name: string]: any;
};

export type Options = { value: string; text: string };

export type RenderOption = (
  formState: FormSpyRenderProps,
  nextProps: Readonly<any>
) => boolean;
