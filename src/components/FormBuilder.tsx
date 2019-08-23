import React from 'react';
import {
    ComponentFactory,
    Fields,
    Group,
    IEntities,
    IFields,
    ILayout,
    ILayoutFields,
    ISchema,
    Layout,
    LayoutFields
} from "../interfaces/SchemaInterfaces";
import {Field, Form} from 'react-final-form';
import TextInputField from "./TextInputField";
import {composeValidator, validators} from "../utils/Validators";
import './FormBuilder.css';
import Button from "./FormButton";

interface IProps {
    onSubmit: (value: any) => void;
    schema: ISchema;
    componentFactory?: ComponentFactory;
}

let formData: { [s: string]: any } = {};
let currentEntity: string = '';

class FormBuilder extends React.Component<IProps, any> {
    formData: any;
    previousEntity: string;
    isArray: boolean;

    constructor(props: IProps) {
        super(props);
        this.state = {
            formData: {},
        };
        this.formData = formData;
        this.previousEntity = '';
        this.isArray = false;
    }

    handleSubmit = (submitData: any) => {
        this.props.onSubmit(formData);
    };

    render = () => {
        const {entities} = this.props.schema;
        return (
            <div className={'container'}>
                <Form
                    onSubmit={this.handleSubmit}
                    initialValues={{gender: '', email: ''}}
                    validateOnBlur={true}
                    render={(formProps) => {
                        this.formData = formData;
                        return (
                            <form onSubmit={formProps.handleSubmit}>
                                {entities.map((entity: IEntities) => {
                                    return (this.entityEvaluator(entity, formProps))
                                })}
                            </form>
                        );
                    }}
                />
            </div>
        )
    };

    //Evaluates a single entity, checks for layouts, if layouts isn't present directly maps and renders the fields
    entityEvaluator = (entity: IEntities, formProps: any) => {
        let newObj: { [s: string]: any } = {};
        // To build the formData object
        if (this.isArray) {              //If an array is encountered the currently encountered entity should be inside the parent entity
            newObj[currentEntity] = [];
            Object.assign(formData, newObj);
        } else {
            newObj[entity.name] = {};
            Object.assign(formData, newObj);
            currentEntity = entity.name;
        }
        if (entity.layouts) {
            const {fields, layouts} = entity;
            if (Array.isArray(layouts)) {
                for (let layout of layouts) {
                    if (layout.orientation) {
                        return this.handleOrientation(layout.orientation, layouts, fields, formProps, layout.name)
                    } else {
                        return this.layoutEvaluator(layout.name, layouts, fields, formProps)
                    }
                }
            } else {
                for (let layoutName in layouts) {
                    if (layouts[layoutName].orientation) {
                        return this.handleOrientation(layouts[layoutName].orientation, layouts, fields, formProps, layoutName)
                    } else {
                        return this.layoutEvaluator(layoutName, layouts, fields, formProps);
                    }
                }
            }
        } else {
            return this.fieldEvaluator(entity.fields, formProps)
        }
    };

    layoutEvaluator = (layoutName: any, layouts: Layout | Array<ILayout>, fields: Array<IFields> | Fields, formProps: any) => {
        if (Array.isArray(layouts)) {
            for (let layout of layouts) {
                if (layout.groups) {
                    const retArray = [];
                    for (let keys in layout) {
                        if (keys == 'fields') {
                            retArray.push(this.fieldEvaluator(fields, formProps, layout.fields));
                        } else if (keys == 'groups') {
                            retArray.push(this.groupEvaluator(fields, formProps, layout.groups));
                        }
                    }
                    return retArray.map(values => values);
                } else {
                    return this.fieldEvaluator(fields, formProps, layout.fields);
                }
            }
        } else {
            if (layouts[layoutName].groups) {
                for (let keys in layouts[layoutName]) {
                    if (keys === 'fields') {
                        return this.fieldEvaluator(fields, formProps, layouts[layoutName].fields)
                    } else if (keys === 'groups') {
                        return this.groupEvaluator(fields, formProps, layouts[layoutName].groups);
                    }
                }
            } else {
                return this.fieldEvaluator(fields, formProps, layouts[layoutName].fields);
            }
        }
    };

    fieldEvaluator = (fields: Array<IFields> | Fields, formProps: any, layoutFields?: Array<ILayoutFields> | LayoutFields) => {
        //TODO: Add functionality for evaluating Field metadata as a function or at fieldRenderer
        if (layoutFields) {
            if (Array.isArray(layoutFields)) {
                let fieldArray = [];
                if (Array.isArray(fields)) {
                    for (let layoutFieldName in layoutFields) {
                        for (let fieldName in fields) {
                            if (layoutFieldName === fieldName) {
                                const mergedField = {
                                    ...layoutFields[layoutFieldName],
                                    ...fields[fieldName],
                                };
                                fieldArray.push(mergedField);
                            }
                        }
                    }
                    if (fieldArray.length > 0) {
                        return fieldArray.map((field, index) => {
                            return this.fieldRenderer(field, index, formProps);
                        });
                    }
                } else {
                    let fieldArray = [];
                    for (let key in layoutFields) {
                        if (fields.hasOwnProperty(key)) {
                            const mergedField = {
                                ...fields[key],
                                ...layoutFields[key],
                                name: key,
                            };
                            fieldArray.push(mergedField);
                        } else {
                            return undefined;
                        }
                        return fieldArray.map((field, index) => {
                            return this.fieldRenderer(field, index, formProps);
                        })
                    }
                }
            } else {
                if (Array.isArray(fields)) {
                    return fields.map((field, index) => {
                        if (field.name) {
                            if (layoutFields.hasOwnProperty(field.name)) {
                                const mergedField = {
                                    ...layoutFields[field.name],
                                    ...field
                                };
                                return this.fieldRenderer(mergedField, index, formProps)
                            }
                        }
                    })
                } else {
                    let fieldArray = [];
                    for (let key in layoutFields) {
                        if (fields.hasOwnProperty(key)) {
                            const mergedField = {
                                ...fields[key],
                                ...layoutFields[key],
                                name: key,
                            };
                            fieldArray.push(mergedField);
                        } else {
                            return undefined;
                        }
                    }
                    return fieldArray.map((field, index) => {
                        return this.fieldRenderer(field, index, formProps);
                    })
                }
            }
        } else {
            if (Array.isArray(fields)) {
                return fields.map((field, index) => {
                    return this.fieldRenderer(field, index, formProps);
                });
            } else {
                let fieldArray = [];
                for (let fieldName in fields) {
                    const mergedField = {
                        name: fieldName,
                        ...fields[fieldName]
                    };
                    fieldArray.push(mergedField);
                }
                return fieldArray.map((field, index) => {
                    return this.fieldRenderer(field, index, formProps);
                });
            }
        }
    };

    groupEvaluator = (fields: Array<IFields> | Fields, formProps: any, groups?: Group) => {
        for (let groupName in groups) {
            if (groups[groupName].orientation) {
                if (groups[groupName].orientation === 'vertical') {
                    return (
                        <div className={'verticalGroup'} key={groupName}>
                            {this.fieldEvaluator(fields, formProps, groups[groupName].fields)}
                        </div>
                    )
                } else if (groups[groupName].orientation === 'horizontal') {
                    return (
                        <div className={'horizontalGroup'} key={groupName}>
                            {this.fieldEvaluator(fields, formProps, groups[groupName].fields)}
                        </div>
                    )
                }
            } else {
                return (
                    <div className={'verticalGroup'} key={groupName}>
                        {this.fieldEvaluator(fields, formProps, groups[groupName].fields)}
                    </div>
                )
            }
        }
    };

    handleOrientation = (orientation: any, layouts: Layout | Array<ILayout>, fields: Array<IFields> | Fields, formProps: any, layoutName?: string) => {
        if (layoutName) {
            if (orientation === 'vertical') {
                return (
                    <div className={'verticalLayout'} key={layoutName}>
                        {this.layoutEvaluator(layoutName, layouts, fields, formProps)}
                    </div>
                )
            } else if (orientation === 'horizontal') {
                return (
                    <div className={'horizontalLayout'} key={layoutName}>
                        {this.layoutEvaluator(layoutName, layouts, fields, formProps)}
                    </div>
                )
            }
        }
    };

    fieldRenderer = (field: any, index: number, formProps: any): any => {
        //TODO: Add functionality for document upload
        if (!field.name) {
            field.name = `defaultName${index}`
        }

        const assignFormData = () => {
            if (formProps.values.hasOwnProperty(field.name)) {
                let newObj: { [s: string]: any } = {};
                if(this.isArray) {
                    
                }
                newObj[field.name] = formProps.values[field.name];
                Object.assign(formData[currentEntity], newObj);
            }
        };

        if (this.props.componentFactory && this.props.componentFactory.hasOwnProperty(field.component)) {
            assignFormData();
            this.isArray = false;
            return (
                <Field
                    name={field.name}
                    component={this.props.componentFactory[field.component]}
                    key={`Field_name_${index}`}
                    displayName={field.displayName}
                    validate={(value) => (field.validators ? validators.required(value) : undefined)}
                    size={field.size ? field.size : 10}
                    enum={field.enum ? field.enum : []}
                />
            )
        } else if (field.component && field.name) {
            if (!field.entityName) {
                assignFormData();
                this.isArray = false;
            }
            return (
                <Field
                    name={field.name}
                    component={field.component}
                    key={`Field_name_${index}`}
                    displayName={field.displayName}
                    validate={(value) => (field.validators ? validators.required(value) : undefined)}
                    size={field.size ? field.size : 10}
                    enum={field.enum ? field.enum : []}
                />
            )
        } else if (field.type === 'string' || field.type === 'number') {
            if (!field.entityName) {
                assignFormData();
                this.isArray = false;
            }
            return (
                <Field
                    name={field.name}
                    key={`Field_name_${index}`}
                    displayName={field.displayName}
                    component={TextInputField}
                    validate={(value) => (field.validators ? composeValidator(field.validators, value) : undefined)}
                    type={field.type}
                    size={field.size ? field.size : 10}
                />
            )
        } else if (field.type === 'button') {
            this.isArray = false;
            return (
                <Field
                    name={field.name}
                    key={`Field_${field.name}_${index}`}
                    displayName={field.displayName}
                    component={Button}
                    enum={field.enum}
                    size={field.size ? field.size : 5}
                />
            )
        } else if (field.type === 'entity') {
            let newObj: { [s: string]: any } = {};
            if (field.entityType) {
                field.type = field.entityType;
            } else {
                field.type = 'string';
            }
            if (formData[currentEntity].hasOwnProperty(field.entityName)) {
                newObj[field.name] = formProps.values[field.name];
                Object.assign(formData[currentEntity][field.entityName], newObj)
            } else {
                newObj[field.entityName] = {};
                Object.assign(formData[currentEntity], newObj);
                newObj = {};
                newObj[field.name] = formProps.values[field.name];
                Object.assign(formData[currentEntity][field.entityName], newObj);
            }
            return this.fieldRenderer(field, index, formProps)
        } else if (field.type === 'array') {
            this.handleArray(field, formProps);
        }
    };

    handleArray = (field: any, formProps: any) => {
        //TODO: How to best handle this
        const {entities} = this.props.schema;
        entities.map((entity) => {
            if (entity.name === field.entityName) {
                this.isArray = true;
                this.previousEntity = currentEntity;
                return this.entityEvaluator(entity, formProps);
            } else return null
        });
    }

}

export default FormBuilder;

