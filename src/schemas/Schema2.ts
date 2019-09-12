import {ISchema} from "../interfaces/SchemaInterfaces";

export const newSchema: ISchema = {
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
                    size: 6,
                },
                {
                    name: "phones3",
                    type: "entity",
                    entityName: "number",
                    displayName: "Custom add text",
                    addText: 'Add new phone'
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
                    size: 3,
                    validators: 'required'
                },
                {
                    displayName: 'Number',
                    name: "number",
                    type: "string",
                    size: 9,
                    validators: 'required',
                }
            ],
            layouts: [
                {
                    name: 'edit',
                    orientation: 'horizontal',
                    fields: {
                        areaCode: {
                            displayName: 'Area code',
                            type: "string",
                            size: 3
                        },
                        number: {
                            displayName: 'Number',
                            type: "string",
                            size: 9
                        }
                    }
                }
            ]
        },
        {
            name: 'number',
            fields: {
                number2: {
                    displayName: 'Number2',
                    type: 'string'
                },
                number1: {
                    displayName: 'Number1',
                    type: 'array',
                    entityName: "phone",
                    arrayType: 'entity'
                },
            }
        }
    ]
};