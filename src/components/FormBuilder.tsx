import React from 'react';
import {
    ComponentFactory,
    Fields,
    Group,
    IEntities,
    IFields,
    IGroups,
    ILayout,
    ILayoutFields,
    ISchema,
    Layout,
    LayoutFields,
    RenderOption,
    SimpleObj
} from "../interfaces/SchemaInterfaces";
import {Field, FieldRenderProps, Form, FormProps, FormSpy} from 'react-final-form';
import TextInputField from "./input/TextInputField";
import {composeValidator, validators} from "../utils/Validators";
import './FormBuilder.css';
import {FormHelper} from "../utils/FormHelper";
import {FieldArray} from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import SpyWrapper from "./SpyWrapper";


// let this.fieldNameStack: Array<string> = [];

interface IProps {
    onSubmit: (value: any) => void;
    schema: ISchema;
    componentFactory?: ComponentFactory;
    entityName: string;
    layoutName?: string;
    initialValues?: SimpleObj;
    subscription?: { [formStateName: string]: boolean };
    bottomBar: React.FC<FieldRenderProps<any, HTMLElement>> | React.ComponentClass<FieldRenderProps<any, HTMLElement>>;
    allFieldsSubscription?: { [fieldStateName: string]: boolean };
    renderOption?: RenderOption;
}

class FormBuilder extends React.Component<IProps, any> {
    formData: any;
    previousEntity: string;
    isArray: boolean;
    currentEntity: any;
    nested: boolean;
    formProps: any | FormProps;
    currentArrayName: string;
    fieldNameStack: Array<string>;

    constructor(props: IProps) {
        super(props);
        this.previousEntity = '';
        this.isArray = false;
        this.currentEntity = {};
        this.formProps = {};
        this.nested = false;
        this.fieldNameStack = [];
        this.currentArrayName = ''
    }

    handleSubmit = (submitData: any) => {
        this.props.onSubmit(submitData);
    };

    checkSchema = () => {
        let isPresent = false;
        for (let entity of this.props.schema.entities) {
            if (entity.name === this.props.entityName) {
                isPresent = true;
            }
        }
        if (!isPresent) {
            throw Error("The given schema doesn't contain any entity with the given entityName");
        }
    };

    render = () => {
        try {
            const {entities} = this.props.schema;
            this.checkSchema();
            return (
                <div className={'container'} key={'container'}>
                    <Form
                        onSubmit={this.handleSubmit}
                        initialValues={this.props.initialValues ? this.props.initialValues : undefined}
                        subscription={this.props.subscription ? this.props.subscription : undefined}
                        validateOnBlur={true}
                        mutators={{...arrayMutators}}
                        render={(formProps) => {
                            this.formProps = formProps;
                            FormHelper.updateFormState(formProps);
                            return (
                                <form onSubmit={formProps.handleSubmit}>
                                    {entities.map((entity: IEntities) => {
                                        if (entity.name === this.props.entityName) {
                                            return (this.entityEvaluator(entity))
                                        } else {
                                            return undefined;
                                        }
                                    })}
                                    <Field name={'bottomBar'} component={this.props.bottomBar} key={'bottomBar'}/>
                                </form>
                            );
                        }}
                    />
                </div>
            )
        } catch (e) {
            console.error(e);
            return (<h1>Oops! Seems like there was an Error, please check the provided Schema</h1>)
        }
    };

    //Evaluates a single entity, checks for layouts, if layouts isn't present directly maps and renders the fields
    entityEvaluator = (entity: IEntities, arrayName?: string) => {
        if (entity.layouts) {
            const {fields, layouts} = entity;
            if (!this.props.layoutName) {
                throw Error('When using layouts please specify the property layoutName')
            }
            if (Array.isArray(layouts)) {
                let isPresent = false;
                for (let layout of layouts) {
                    if (layout.name === this.props.layoutName) {
                        isPresent = true;
                        if (layout.orientation) {
                            return this.handleOrientation(layout.orientation, layouts, fields, layout.name)
                        } else {
                            return this.layoutEvaluator(layout.name, layouts, fields)
                        }
                    }
                    if (!isPresent) {
                        throw Error("The provided prop layoutName doesn't match with any layout name given the schema")
                    }
                }
            } else {
                if (layouts.hasOwnProperty(this.props.layoutName)) {
                    if (layouts[this.props.layoutName].orientation) {
                        return this.handleOrientation(layouts[this.props.layoutName].orientation, layouts, fields, layouts[this.props.layoutName].name)
                    } else {
                        return this.layoutEvaluator(this.props.layoutName, layouts, fields)
                    }
                } else {
                    throw Error("The provided prop layoutName doesn't match with any layout name given the schema")
                }
            }
        } else {
            return this.fieldEvaluator(entity.fields)
        }
    };

    layoutEvaluator = (layoutName: any, layouts: Layout | Array<ILayout>, fields: Array<IFields> | Fields) => {
        if (Array.isArray(layouts)) {
            for (let layout of layouts) {
                if (layout.name === this.props.layoutName) {
                    if (layout.groups) {
                        return this.fieldEvaluator(fields, layout.fields, layout.groups);

                    } else {
                        return this.fieldEvaluator(fields, layout.fields);
                    }
                }
            }
        } else {
            if (layouts[layoutName].groups) {
                return this.fieldEvaluator(fields, layouts[layoutName].fields, layouts[layoutName].groups);

            } else {
                return this.fieldEvaluator(fields, layouts[layoutName].fields);
            }
        }
    };

    fieldEvaluator = (fields: Array<IFields> | Fields, layoutFields?: Array<ILayoutFields> | LayoutFields, groups?: Group) => {
        const checkGroups = (field: IFields, index: number) => {
            if (field.group && groups) {
                if (groups.hasOwnProperty(field.group)) {
                    return (
                        <label>
                            {field.displayName}
                            {this.groupEvaluator(groups[field.group], fields, index)}
                        </label>
                    )
                } else {
                    throw Error("The given group name doesn't exist")
                }
            } else {
                return this.fieldRenderer(field, index);
            }
        };
        if (layoutFields) {
            if (Array.isArray(layoutFields)) {
                // Field of type Array or Object both are handled as array in each cases, every block has its own variable fieldArray for block scoping
                let fieldArray = [];
                if (Array.isArray(fields)) {
                    for (let layoutFieldIndex in layoutFields) {
                        for (let fieldIndex in fields) {
                            if (layoutFields[layoutFieldIndex].name === fields[fieldIndex].name) {
                                const mergedField = {
                                    ...layoutFields[layoutFieldIndex],
                                    ...fields[fieldIndex],
                                };
                                fieldArray.push(mergedField);
                            }
                        }
                    }
                    if (fieldArray.length > 0) {
                        return fieldArray.map((field, index) => {
                            try {
                                return checkGroups(field, index);
                            } finally {
                                if (index === fieldArray.length - 1) {
                                    this.fieldNameStack.pop();
                                }
                            }
                        });
                    }
                } else {
                    //When fields are of type object with key as the name
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
                            try {
                                return checkGroups(field, index);
                            } finally {
                                if (index === fieldArray.length - 1) {
                                    this.fieldNameStack.pop();
                                }
                            }
                        })
                    }
                }
            } else {
                //when layout fields are of type object with key as the name
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
                                try {
                                    return checkGroups(mergedField, index);
                                } finally {
                                    if (index === fields.length - 1) {
                                        this.fieldNameStack.pop();
                                    }
                                }
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
                        try {
                            return checkGroups(field, index);
                        } finally {
                            if (index === fieldArray.length - 1) {
                                this.fieldNameStack.pop();
                            }
                        }
                    })
                }
            }
        } else {
            if (Array.isArray(fields)) {
                return fields.map((field, index) => {
                    try {
                        return this.fieldRenderer(field, index);
                    } finally {
                        if (index === fields.length - 1) {
                            this.fieldNameStack.pop();
                        }
                    }
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
                    try {
                        return checkGroups(field, index);
                    } finally {
                        if (index === fieldArray.length - 1) {
                            this.fieldNameStack.pop();
                        }
                    }
                });
            }
        }
    };

    groupEvaluator = (group: IGroups, fields: Fields | Array<IFields>, index?: number) => {
        if (group.orientation) {
            if (group.orientation === 'vertical') {
                return (
                    <div className={'verticalGroup'} key={`${group.orientation}.${index}`}>
                        {this.fieldEvaluator(fields, group.fields)}
                    </div>
                )
            } else if (group.orientation === 'horizontal') {
                return (
                    <div className={'horizontalGroup'} key={`${group.orientation}.${index}`}>
                        {this.fieldEvaluator(fields, group.fields)}
                    </div>
                )
            }
        } else {
            return (
                <div className={'verticalGroup'} key={`verticalGroup.${index}`}>
                    {this.fieldEvaluator(fields, group.fields)}
                </div>
            )
        }
    };

    handleOrientation = (orientation: any, layouts: Layout | Array<ILayout>, fields: Array<IFields> | Fields, layoutName?: string) => {
        if (layoutName) {
            if (orientation === 'vertical') {
                return (
                    <div className={'verticalLayout'} key={`${layoutName}`}>
                        {this.layoutEvaluator(layoutName, layouts, fields)}
                    </div>
                )
            } else if (orientation === 'horizontal') {
                return (
                    <div className={'horizontalLayout'} key={`${layoutName}`}>
                        {this.layoutEvaluator(layoutName, layouts, fields)}
                    </div>
                )
            }
        }
    };

    public fieldRenderer = (field: any, index?: number): any => {
        let fieldName = '';
        //TODO: Add functionality for document upload

        if (this.fieldNameStack.length !== 0) {
            fieldName = `${this.fieldNameStack.join('.')}.${field.name}`
        } else {
            fieldName = field.name
        }

        if (this.fieldPropertyCheck(field)) {
            field.name = fieldName;
            return (
                <FormSpy
                    render={(formSpyProps) => {
                        return (
                            <div className={'fieldContainer'} style={this.buildCustomStyle(field)} key={fieldName}>
                                <SpyWrapper
                                    field={field} formData={formSpyProps}
                                    renderOptions={this.props.renderOption ? this.props.renderOption : undefined}
                                    subscription={this.fieldSubscriptionEvaluator(field)}
                                    componentFactory={this.props.componentFactory ? this.props.componentFactory : undefined}
                                    key={fieldName}
                                />
                            </div>
                        )
                    }}
                />
            )
        } else if (this.props.componentFactory && this.props.componentFactory.hasOwnProperty(field.component)) {
            return (
                <div className={'fieldContainer'} style={this.buildCustomStyle(field)} key={fieldName}>
                    <Field
                        name={fieldName}
                        component={this.props.componentFactory[field.component]}
                        key={fieldName}
                        displayName={field.displayName}
                        validate={(value) => (field.validators ? validators.required(value) : undefined)}
                        enum={field.enum ? field.enum : []}
                        subscription={this.fieldSubscriptionEvaluator(field)}
                        hidden={field.hidden ? field.hidden : undefined}
                    />
                </div>
            )
        } else if (field.component && this.props.componentFactory && !this.props.componentFactory.hasOwnProperty(field.component)) {
            throw Error(`The given component in the field with name '${field.name}' doesn't exist in given componentFactory`)
        } else if (field.type === 'string' || field.type === 'number') {
            return (
                <div className={'fieldContainer'} style={this.buildCustomStyle(field)} key={fieldName}>
                    <Field
                        name={fieldName}
                        key={fieldName}
                        displayName={field.displayName}
                        component={TextInputField}
                        validate={(value) => (field.validators ? composeValidator(field.validators, value) : undefined)}
                        type={field.type}
                        subscription={this.fieldSubscriptionEvaluator(field)}
                        placeholder={field.displayName}
                        hidden={field.hidden ? field.hidden : undefined}
                    />
                </div>
            )
        } else if (field.type === 'entity') {
            if (!field.entityName) {
                throw Error('There should be an entityName for schema for a field of type entity');
            }
            let isPresent = false;
            this.fieldNameStack.push(field.name);
            for (let entity of this.props.schema.entities) {
                if (entity.name === field.entityName) {
                    this.currentEntity = entity;
                    isPresent = true;
                    return (
                        <label>
                            {field.displayName}
                            {this.entityEvaluator(entity)}
                        </label>
                    );
                }
            }
            if (!isPresent) {
                throw Error("The given entityName of the field doesn't match with the entities in the schema");
            }
        } else if (field.type === 'array') {
            if (!field.arrayType) {
                throw Error('There should be an arrayType for a field of type array')
            } else if (!field.entityName) {
                throw Error('There should be an entityName for schema for a field of type array');
            } else if (field.arrayType !== 'entity') {
                throw Error('Currently only arrayType of entity is supported')
            }
            // let mergedFieldName = (this.fieldNameStack !== []) ? `${this.fieldNameStack.join('.')}.${field.name}` : field.name;
            return (
                <div className={'array'} style={this.buildCustomStyle(field)} key={fieldName}>
                    <label>{field.displayName}</label>
                    <FieldArray
                        name={fieldName}
                        render={(fieldArrayProps: any) => {
                            return fieldArrayProps.fields.map((name: any) => {
                                try {
                                    this.currentArrayName = name;
                                    this.fieldNameStack.push(this.currentArrayName);
                                    return (this.handleArray(fieldArrayProps, field.entityName, name));
                                } finally {
                                    this.fieldNameStack.pop();
                                }
                            })
                        }}
                    />
                    <button type={'button'}
                            onClick={() => this.formProps.form.mutators.push(fieldName, undefined)}
                    >
                        {field.addText ? field.addText : 'Add +'}
                    </button>
                </div>
            )
        }
    };

    handleArray = (fieldArrayProps: any, entityName: string, arrayName: string) => {
        this.currentArrayName = arrayName;
        for (let entity of this.props.schema.entities) {
            if (entity.name === entityName) {
                this.currentEntity = entity;
            }
        }
        return (this.entityEvaluator(this.currentEntity, arrayName));
    };

    //To check whether any field property is of type function
    fieldPropertyCheck = (field: any) => {
        for (let key in field) {
            if (typeof field[key] === 'function') {
                return true;
            }
        }
        return false
    };

    fieldSubscriptionEvaluator = (field: IFields) => {
        if (field.subscription) {
            return field.subscription;
        } else if (this.props.allFieldsSubscription) {
            return this.props.allFieldsSubscription
        } else return undefined
    };

    //Builds style object dependent upon the size property passed in the field
    buildCustomStyle = (field: IFields) => {
        let size: number;
        let styleObj = {};
        if (field.hidden) {
            Object.assign(styleObj, {display: 'hidden'})
        }
        if (field.size && typeof field.size !== 'function') {
            size = field.size * 10;
            let minSize = size / 4;
            if (field.type !== 'array') {
                Object.assign(styleObj, {
                    flex: field.size,
                    maxWidth: `${size}vw`,
                    flexWrap: 'wrap',
                    // minWidth: `${minSize}vw`
                })
            } else {
                Object.assign(styleObj, {
                    flex: field.size,
                    maxWidth: `${size}vw`,
                    flexWrap: 'wrap',
                    minWidth: `${minSize}vw`,
                    width: `${size}vw`
                })
            }
        } else {
            size = 100;
            let minSize = size / 4;
            Object.assign(styleObj, {
                flex: size / 10,
                maxWidth: `${size}vw`,
                flexWrap: 'wrap',
                minWidth: `${minSize}vw`,
                width: `${size}vw`
            })
        }
        return styleObj;
    };

}

export default FormBuilder;
