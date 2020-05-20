import { FormSpyRenderProps } from "react-final-form";
import { AnyObject, SchemaFields } from "../FormBuilder/interfaces/SchemaInterfaces";
export declare const FormHelper: {
    evaluator: (evaluatee: Function, formState: any) => any;
    formState: any;
    updateFormState: (formProps: any) => void;
    metaDataEvaluator: (field: SchemaFields, formSpyProps: FormSpyRenderProps, fieldName: string) => SchemaFields;
    getFieldState: (fieldName: string) => "WHEEEWWWW" | "nope";
    getLocalModel: (fieldName: string, model: AnyObject) => any;
    fieldPropertyCheck: (field: any) => boolean;
};
