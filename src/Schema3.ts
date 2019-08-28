import {ISchema} from "./interfaces/SchemaInterfaces";
import {validators} from "./utils/Validators";

export const arraySchema: ISchema = {
    entities: [
        {
            name: "contact",
            fields: [
                {
                    name: "phones",
                    type: "array",
                    arrayType: "entity",
                    entityName: "phone",
                    displayName: "Phones"
                },
                {
                    name: "phones2",
                    type: "array",
                    arrayType: "entity",
                    entityName: "phone",
                    displayName: "Custom size",
                    size: 6
                },
                {
                    name: "phones3",
                    type: "array",
                    arrayType: "entity",
                    entityName: "phone",
                    displayName: "Custom add text",
                    // addText: 'Add new phone'
                }
            ]
        },
        {
            name: "phone",
            fields: [
                {
                    displayName: 'Area code',
                    name: "areaCode",
                    type: "string",
                    size: 3
                },
                {
                    displayName: 'Number',
                    name: "number",
                    type: "string",
                    size: 9
                }
            ]
        }
    ]
}