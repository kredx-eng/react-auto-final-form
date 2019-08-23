import {ISchema} from "./interfaces/SchemaInterfaces";
import {validators} from "./utils/Validators";

export const arraySchema: ISchema = {
    entities: [
        {
            name: 'first',
            fields:[
                {
                    name: 'email',
                    type: 'string',
                    validators: ['email', 'required']
                },
                {
                    name: 'firstName',
                    type: 'string',
                    validators: 'required'
                },
                {
                    name: 'submit',
                    type: 'button',
                }
            ],
            layouts: {
                basic: {
                    orientation: "vertical",
                    fields: {
                        email: {
                            displayName: 'Email',
                            size: 9,
                        },
                        firstName: {
                            displayName: 'First Name',
                            size: 7,
                        },
                        submit: {
                            displayName: 'FEKO',
                        }
                    }
                }
            }
        }
    ]
}