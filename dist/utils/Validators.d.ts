export declare type Validators = (value: any) => string | undefined;
export declare const validators: {
    email: Validators;
    required: Validators;
};
export declare const composeValidator: (validator: any, value: any) => string | (string | undefined)[] | undefined;
export declare const stringValidator: (validator: string, value: any) => string | undefined;
export declare const functionValidator: (validator: Validators, value: any) => string | undefined;
