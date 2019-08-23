import {ISchema} from "../interfaces/SchemaInterfaces";

export const DEMO_SCHEMAS: {[name: string]: any} = {
    Simple: {
        value: {
            entities: [
                {
                    name: 'first',
                    fields:[
                        {
                            name: 'email',
                            type: 'string',
                        },
                        {
                            name: 'firstName',
                            type: 'string',
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
                                    displayName: 'Submit',
                                }
                            }
                        }
                    }
                }
            ]
        }
    },
    NotSimple: {
        value: {
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
                            type: 'array',
                            enum: ['','Male', 'Female']
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
                        submit: {
                            type: "button",
                        }
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
                                        submit: {
                                            displayName: 'Submit',
                                        }
                                    }
                                }
                            }

                        },
                    ]
                },
            ]
        }
    },
};

// const simpleSchema: ISchema = {
//
// }