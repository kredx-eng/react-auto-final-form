import { AnyObject } from "./interfaces/SchemaInterfaces";
export declare class SchemaEvaluator {
    schema: AnyObject;
    parsedSchema: AnyObject | Array<any>;
    fieldNameStack: Array<string>;
    subscribedFields: Array<string>;
    layoutFields: Array<any>;
    private fields;
    private arrayField;
    constructor(schema: any, initialEntityName: string, layoutName?: string);
    private parseEntity;
    pushAndEmptyFields: (orientation?: "horizontal" | "vertical" | undefined) => void;
    private getEntity;
    private getFields;
    private getArrayFields;
    private getName;
    private getLayoutFields;
    private generateLayoutFields;
}
