import { SchemaFields, AnyObject } from "../FormBuilder/interfaces/SchemaInterfaces";
export declare type Validators = (value: any) => string | undefined;
export declare const validators: {
    email: Validators;
    required: Validators;
};
export declare const getErorr: (validator: AnyObject | undefined, field: SchemaFields, value: any, model: AnyObject, meta: any, fieldName: string) => string | undefined;
export declare const stringValidator: (validator: string, value: any) => string | undefined;
export declare const functionValidator: (validator: Validators, value: any) => string | undefined;
