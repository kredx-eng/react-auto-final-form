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
import {Field, Form, FormProps} from 'react-final-form';
import TextInputField from "./input/TextInputField";
import {composeValidator, validators} from "../utils/Validators";
import './FormBuilder.css';
import Button from "./input/FormButton";
import {FormHelper} from "../utils/FormHelper";

interface IProps {
    onSubmit: (value: any) => void;
    schema: ISchema;
    componentFactory?: ComponentFactory;
    entityName: string;
    layoutName?: string;
}

let formData: { [s: string]: any } = {};

class FormBuilder extends React.Component<IProps, any> {
    formData: any;
    previousEntity: string;
    isArray: boolean;
    currentEntity: any;
    nested: boolean;
    formProps: Object | FormProps;

    constructor(props: IProps) {
        super(props);
        this.state = {
            formData: {},
        };
        this.formData = formData;
        this.previousEntity = '';
        this.isArray = false;
        this.currentEntity = {};
        this.formProps = {};
        this.nested = false;
    }

    handleSubmit = (submitData: any) => {
        this.props.onSubmit(formData);
    };

    checkSchema = () => {
        let isPresent = false;
        for(let entity of this.props.schema.entities) {
            if(entity.name === this.props.entityName) {
                isPresent = true;
            }
        }
        if(!isPresent) {
            const e = new Error("The given schema doesn't contain any entity with the given entityName");
            console.error(e);
        }
    };

    //TODO: Figure out a way to Handle form re-renders much better(Priority)
    render = () => {
        const {entities} = this.props.schema;
        this.checkSchema();
        return (
            <div className={'container'}>
                <Form
                    onSubmit={this.handleSubmit}
                    initialValues={{gender: '', email: ''}}
                    subscription={{values: true,submitting: true}}
                    validateOnBlur={true}
                    render={(formProps) => {
                        FormHelper.updateFormState(formProps);
                        this.formProps = formProps;
                        return (
                            <form onSubmit={formProps.handleSubmit}>
                                {entities.map((entity: IEntities) => {
                                    if(entity.name === this.props.entityName){
                                        return (this.entityEvaluator(entity))
                                    } else {
                                        return undefined;
                                    }
                                })}
                            </form>
                        );
                    }}
                />
            </div>
        )
    };

    //Evaluates a single entity, checks for layouts, if layouts isn't present directly maps and renders the fields
    entityEvaluator = (entity: IEntities, nested?: boolean) => {
        this.nested = !!nested;
        if (entity.layouts) {
            const {fields, layouts} = entity;
            if (Array.isArray(layouts)) {
                for (let layout of layouts) {
                    if (layout.orientation) {
                        return this.handleOrientation(layout.orientation, layouts, fields, layout.name)
                    } else {
                        return this.layoutEvaluator(layout.name, layouts, fields)
                    }
                }
            } else {
                for (let layoutName in layouts) {
                    if (layouts[layoutName].orientation) {
                        return this.handleOrientation(layouts[layoutName].orientation, layouts, fields, layoutName)
                    } else {
                        return this.layoutEvaluator(layoutName, layouts, fields);
                    }
                }
            }
        } else {
            return this.fieldEvaluator(entity.fields)
        }
    };

    layoutEvaluator = (layoutName: any, layouts: Layout | Array<ILayout>, fields: Array<IFields> | Fields) => {
        if (Array.isArray(layouts)) {
            for (let layout of layouts) {
                if (layout.groups) {
                    const retArray = [];
                    for (let keys in layout) {
                        if (keys == 'fields') {
                            retArray.push(this.fieldEvaluator(fields, layout.fields));
                        } else if (keys == 'groups') {
                            retArray.push(this.groupEvaluator(fields, layout.groups));
                        }
                    }
                    return retArray.map(values => values);
                } else {
                    return this.fieldEvaluator(fields, layout.fields);
                }
            }
        } else {
            if (layouts[layoutName].groups) {
                for (let keys in layouts[layoutName]) {
                    if (keys === 'fields') {
                        return this.fieldEvaluator(fields, layouts[layoutName].fields)
                    } else if (keys === 'groups') {
                        return this.groupEvaluator(fields, layouts[layoutName].groups);
                    }
                }
            } else {
                return this.fieldEvaluator(fields, layouts[layoutName].fields);
            }
        }
    };

    fieldEvaluator = (fields: Array<IFields> | Fields, layoutFields?: Array<ILayoutFields> | LayoutFields) => {
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
                            return this.fieldRenderer(field, index);
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
                            return this.fieldRenderer(field, index);
                        })
                    }
                }
            } else {
                if (Array.isArray(fields)) {
                    return fields.map((field, index) => {
                        if (field.name) {
                            // @ts-ignore
                            if (layoutFields.hasOwnProperty(field.name)) {
                                const mergedField = {
                                    // @ts-ignore
                                    ...layoutFields[field.name],
                                    ...field
                                };
                                return this.fieldRenderer(mergedField, index)
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
                        return this.fieldRenderer(field, index);
                    })
                }
            }
        } else {
            if (Array.isArray(fields)) {
                return fields.map((field, index) => {
                    return this.fieldRenderer(field, index);
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
                    return this.fieldRenderer(field, index);
                });
            }
        }
    };

    groupEvaluator = (fields: Array<IFields> | Fields, groups?: Group) => {
        //TODO: To be handled differently
        for (let groupName in groups) {
            if (groups[groupName].orientation) {
                if (groups[groupName].orientation === 'vertical') {
                    return (
                        <div className={'verticalGroup'} key={groupName}>
                            {this.fieldEvaluator(fields, groups[groupName].fields)}
                        </div>
                    )
                } else if (groups[groupName].orientation === 'horizontal') {
                    return (
                        <div className={'horizontalGroup'} key={groupName}>
                            {this.fieldEvaluator(fields, groups[groupName].fields)}
                        </div>
                    )
                }
            } else {
                return (
                    <div className={'verticalGroup'} key={groupName}>
                        {this.fieldEvaluator(fields, groups[groupName].fields)}
                    </div>
                )
            }
        }
    };

    handleOrientation = (orientation: any, layouts: Layout | Array<ILayout>, fields: Array<IFields> | Fields, layoutName?: string) => {
        orientation = FormHelper.metaDataEvaluator(orientation);
        if (layoutName) {
            if (orientation === 'vertical') {
                return (
                    <div className={'verticalLayout'} key={layoutName}>
                        {this.layoutEvaluator(layoutName, layouts, fields)}
                    </div>
                )
            } else if (orientation === 'horizontal') {
                return (
                    <div className={'horizontalLayout'} key={layoutName}>
                        {this.layoutEvaluator(layoutName, layouts, fields)}
                    </div>
                )
            }
        }
    };

    fieldRenderer = (field: any, index: number): any => {
        let fieldName = '';
        //TODO: Add functionality for document upload

        if(this.currentEntity!=={} && this.nested) {
            if(index === this.currentEntity.fields.length - 1) {
                this.nested = false;
            }
            fieldName = `${this.currentEntity.name}.${field.name}`
        } else {
            fieldName = field.name;
        }

        if (this.props.componentFactory && this.props.componentFactory.hasOwnProperty(field.component)) {
            this.isArray = false;
            return (
                <Field
                    name={fieldName}
                    component={this.props.componentFactory[field.component]}
                    key={`Field_${field.name}_${index}`}
                    displayName={FormHelper.metaDataEvaluator(field.displayName)}
                    validate={(value) => (field.validators ? validators.required(value) : undefined)}
                    size={field.size ? FormHelper.metaDataEvaluator(field.size) : 10}
                    enum={field.enum ? field.enum : []}
                    subscription={{value: true, touched: true, error: true}}
                />
            )
        } else if (field.component && field.name) {
            if (!field.entityName) {
                this.isArray = false;
            }
            return (
                <Field
                    name={fieldName}
                    component={field.component}
                    key={`Field_${field.name}_${index}`}
                    displayName={FormHelper.metaDataEvaluator(field.displayName)}
                    validate={(value) => (field.validators ? validators.required(value) : undefined)}
                    size={field.size ? FormHelper.metaDataEvaluator(field.size) : 10}
                    enum={field.enum ? field.enum : []}
                    subscription={{value: true, touched: true, error: true}}
                />
            )
        } else if (field.type === 'string' || field.type === 'number') {
            if (!field.entityName) {
                this.isArray = false;
            }
            return (
                <Field
                    name={fieldName}
                    key={`Field_${field.name}_${index}`}
                    displayName={FormHelper.metaDataEvaluator(field.displayName)}
                    component={TextInputField}
                    validate={(value) => (field.validators ? composeValidator(field.validators, value) : undefined)}
                    type={field.type}
                    size={field.size ? FormHelper.metaDataEvaluator(field.size) : 10}
                    subscription={{value: true, touched: true, error: true}}
                />
            )
        } else if (field.type === 'button') {
            this.isArray = false;
            return (
                <Field
                    name={fieldName}
                    key={`Field_${field.name}_${index}`}
                    displayName={FormHelper.metaDataEvaluator(field.displayName)}
                    component={Button}
                    enum={field.enum}
                    size={field.size ? FormHelper.metaDataEvaluator(field.size) : 5}
                    subscription={{value: true, touched: true, error: true}}
                />
            )
        } else if (field.type === 'entity') {
            let isPresent = false;
            for(let entity of this.props.schema.entities) {
                if(entity.name === field.entityName) {
                    this.currentEntity = entity;
                    isPresent = true;
                    return (
                        <label>
                            {field.name}
                            {this.entityEvaluator(entity,true)}
                        </label>
                    );
                }
            }
            if(!isPresent) {
                const e = new Error("The given entityName of the field doesn't match with the entities in the schema");
                console.error(e);
            }
        } else if (field.type === 'array') {
            //TODO: How to best handle this
        }
    };

}

export default FormBuilder;

