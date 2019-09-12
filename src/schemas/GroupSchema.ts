import {ISchema} from "../interfaces/SchemaInterfaces";

const groupSchema: ISchema = {
    entities: [
        {
            name: "contact",
            fields: [
                {
                    name: "property1",
                    type: "string"
                },
                {
                    name: "propertyGrouped1",
                    type: "string"
                },
                {
                    name: "propertyGrouped2",
                    type: "string"
                },
                {
                    name: "groupProperty",
                    displayName: "Group property",
                    type: "group",
                    group: "g1"
                }
            ],
            layouts: [
                {
                    name: "edit",
                    fields: [
                        {
                            name: "groupProperty",
                            displayName: "Group property",
                            type: "group",
                            group: "g1"
                        },
                        {
                            name: "property1",
                            displayName: "Another property"
                        }
                    ],
                    groups:
                        {
                            g1: {
                                fields: [
                                    {
                                        name: "propertyGrouped1",
                                        size: 3,
                                        displayName: '',
                                        type: "string",
                                        component: "Select",
                                        enum: ['option1', "option2"],
                                    },
                                    { name: "propertyGrouped2", size: 9, displayName: '' },
                                ]
                            }
                        }
                }
            ]
        }
    ]
}

export default groupSchema;