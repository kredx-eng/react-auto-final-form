import {ISchema} from "../interfaces/SchemaInterfaces";
import {validators} from "../utils/Validators";

export const arraySchema: ISchema = {
    entities: [
        {
            name: "contact",
            fields: [
                {
                    name: "name",
                    displayName: "Name",
                    type: "string",
                },
                {
                    name: "notname",
                    displayName: "notName",
                    type: "string",
                },
                {
                    name: "email",
                    displayName: "E-mail",
                    type: "entity",
                    entityName: 'email'
                }
            ]
        },
        {
            name: "email",
            fields: [
                {
                    name: "emailType",
                    displayName: "Type",
                    type: "string"
                },
                {
                    name: "address",
                    displayName: "Address",
                    type: "entity",
                    entityName: "notAdress"
                }
            ]
        }, {
            name: 'notAdress',
            fields: [
                {
                    name: 'okay',
                    type: 'string',
                    displayName: 'Okay'
                }
            ]
        }
    ]
}