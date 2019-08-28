import {ISchema} from "./interfaces/SchemaInterfaces";
import TextInputField from "./components/input/TextInputField";
import {validators} from "./utils/Validators";

export const newSchema: ISchema = {
    entities: [
        {   name: 'Basic',
            fields: {
                email: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
                gender: {
                    type: 'string',
                    enum: ['','Male', 'Female'],
                    component: 'select'
                },
                random:{
                    type: 'entity',
                    layoutName: 'asdf',
                    entityName: 'Random',
                    entityType: 'string',
                },
                notEmail: {
                    type: 'string',
                },
                random1:{
                    type: 'entity',
                    layoutName: 'asdf',
                    entityName: 'Random',
                    entityType: 'string',
                },
            },
            layouts: [
                {
                    name: 'asdf',
                    orientation: "vertical",
                    fields: {
                        email: {
                            displayName: 'Email',
                        },
                        name: {
                            displayName: 'Name',
                        },
                    },
                    groups: {
                        select: {
                            title: '',
                            orientation: "horizontal",
                            fields: {
                                gender: {
                                    displayName: 'Gender',
                                    size: 3,
                                },
                                notEmail: {
                                    displayName: 'notEmail',
                                    size: 4,
                                },
                                random: {
                                    displayName: 'Random',
                                    size: 3,
                                },
                                random1: {
                                    displayName: 'Random1',
                                    size: 3,
                                },
                            }
                        }
                    }

                },
            ]
        },
    ]
};