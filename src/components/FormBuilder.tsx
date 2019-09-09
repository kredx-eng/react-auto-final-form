import React from 'react';
import {
    ComponentFactory,
    Fields,
    Group,
    IEntities,
    IFields, IGroups,
    ILayout,
    ILayoutFields,
    ISchema,
    Layout,
    LayoutFields,
    RenderOption,
    SimpleObj
} from "../interfaces/SchemaInterfaces";
import {Field, FieldRenderProps, Form, FormProps, FormSpy, FormSpyRenderProps} from 'react-final-form';
import TextInputField from "./input/TextInputField";
import {composeValidator, validators} from "../utils/Validators";
import './FormBuilder.css';
import {FormHelper} from "../utils/FormHelper";
import {FieldArray} from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import SpyWrapper from "./SpyWrapper";


let fieldNameStack: Array<string> = [];

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
    currentArrayName: string | undefined;

    constructor(props: IProps) {
        super(props);
        this.previousEntity = '';
        this.isArray = false;
        this.currentEntity = {};
        this.formProps = {};
        this.nested = false;
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
                <div className={'container'}>
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
                                            return (this.entityEvaluator(entity, false, false))
                                        } else {
                                            return undefined;
                                        }
                                    })}
                                    <Field name={'bottomBar'} component={this.props.bottomBar}/>
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
    entityEvaluator = (entity: IEntities, nested: boolean, isArray: boolean, arrayName?: string) => {
        this.nested = nested;
        this.isArray = isArray;
        if (fieldNameStack != []) {
            this.currentArrayName = `${fieldNameStack.join('.')}.${arrayName}`
        } else {
            this.currentArrayName = `${arrayName}`
        }
        fieldNameStack = !nested ? [] : fieldNameStack;
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
                            if(field.group && groups) {
                                if(groups.hasOwnProperty(field.group)) {
                                    return this.groupEvaluator(groups[field.group], fields)
                                } else {
                                    throw Error("The given group name doesn't exist")
                                }
                            } else {
                                return this.fieldRenderer(field, index);
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
                            if(field.group && groups) {
                                if(groups.hasOwnProperty(field.group)) {
                                    return this.groupEvaluator(groups[field.group], fields)
                                } else {
                                    throw Error("The given group name doesn't exist")
                                }
                            } else {
                                return this.fieldRenderer(field, index);
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
                                if(field.group && groups) {
                                    if(groups.hasOwnProperty(field.group)) {
                                        return this.groupEvaluator(groups[field.group], fields)
                                    } else {
                                        throw Error("The given group name doesn't exist")
                                    }
                                } else {
                                    return this.fieldRenderer(mergedField, index);
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
                        if(field.group && groups) {
                            if(groups.hasOwnProperty(field.group)) {
                                return this.groupEvaluator(groups[field.group], fields)
                            } else {
                                throw Error("The given group name doesn't exist")
                            }
                        } else {
                            return this.fieldRenderer(field, index);
                        }
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
                    if(field.group && groups) {
                        if(groups.hasOwnProperty(field.group)) {
                            return this.groupEvaluator(groups[field.group], fields)
                        } else {
                            throw Error("The given group name doesn't exist")
                        }
                    } else {
                        return this.fieldRenderer(field, index);
                    }
                });
            }
        }
    };

    groupEvaluator = (group: IGroups, fields: Fields | Array<IFields>) => {
        //TODO: To be handled differently
            if (group.orientation) {
                if (group.orientation === 'vertical') {
                    return (
                        <div className={'verticalGroup'}>
                            {this.fieldEvaluator(fields, group.fields)}
                        </div>
                    )
                } else if (group.orientation === 'horizontal') {
                    return (
                        <div className={'horizontalGroup'}>
                            {this.fieldEvaluator(fields, group.fields)}
                        </div>
                    )
                }
            } else {
                return (
                    <div className={'verticalGroup'}>
                        {this.fieldEvaluator(fields, group.fields)}
                    </div>
                )
            }
    };

    handleOrientation = (orientation: any, layouts: Layout | Array<ILayout>, fields: Array<IFields> | Fields, layoutName?: string) => {
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

    public fieldRenderer = (field: any, index?: number): any => {
        let fieldName = '';
        //TODO: Add functionality for document upload

        if (this.currentEntity !== {} && this.nested) {
            if (index === this.currentEntity.fields.length - 1) {
                this.nested = false;
            }
            fieldName = `${fieldNameStack.join('.')}.${field.name}`
        } else if (this.currentArrayName && this.isArray) {
            fieldName = `${this.currentArrayName}.${field.name}`;
        } else {
            fieldName = field.name;
        }

        if (this.fieldPropertyCheck(field)) {
            field.name = fieldName;
            return (
                <FormSpy
                    render={(formSpyProps) => {
                        field = this.fieldFunctionEvaluator(field, formSpyProps);
                        return (
                            <div className={'fieldContainer'} style={this.buildCustomStyle(field)}>
                                <SpyWrapper
                                    field={field} formData={formSpyProps}
                                    renderOptions={this.props.renderOption ? this.props.renderOption : undefined}
                                    subscription={this.fieldSubscriptionEvaluator(field)}
                                />
                            </div>
                        )
                    }}
                />
            )
        } else if (this.props.componentFactory && this.props.componentFactory.hasOwnProperty(field.component)) {
            return (
                <div className={'fieldContainer'} style={this.buildCustomStyle(field)}>
                    <Field
                        name={fieldName}
                        component={this.props.componentFactory[field.component]}
                        key={`Field_${field.name}_${index}`}
                        displayName={field.displayName}
                        validate={(value) => (field.validators ? validators.required(value) : undefined)}
                        enum={field.enum ? field.enum : []}
                        subscription={this.fieldSubscriptionEvaluator(field)}
                        hidden={field.hidden ? field.hidden : undefined}
                    />
                </div>
            )
        } else if (field.component && field.name) {
            return (
                <div className={'fieldContainer'} style={this.buildCustomStyle(field)}>
                    <Field
                        name={fieldName}
                        component={field.component}
                        key={`Field_${field.name}_${index}`}
                        displayName={field.displayName}
                        validate={(value) => (field.validators ? validators.required(value) : undefined)}
                        enum={field.enum ? field.enum : []}
                        subscription={this.fieldSubscriptionEvaluator(field)}
                        hidden={field.hidden ? field.hidden : undefined}
                    />
                </div>
            )
        } else if (field.type === 'string' || field.type === 'number') {
            return (
                <div className={'fieldContainer'} style={this.buildCustomStyle(field)}>
                    <Field
                        name={fieldName}
                        key={`Field_${field.name}_${index}`}
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
            } else if (this.isArray) {
                throw Error('Currently only type string is only supported in a array of entities')
            }
            let isPresent = false;
            fieldNameStack.push(field.name);
            for (let entity of this.props.schema.entities) {
                if (entity.name === field.entityName) {
                    this.currentEntity = entity;
                    isPresent = true;
                    return (
                        <label>
                            {field.displayName}
                            {this.entityEvaluator(entity, true, false)}
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
            return (
                <div className={'array'} style={this.buildCustomStyle(field)}>
                    <label>{field.displayName}</label>
                    <button type={'button'}
                            onClick={() => this.formProps.form.mutators.push(field.name, undefined)}
                    >
                        {field.addText ? field.addText : 'Add +'}
                    </button>
                    <FieldArray
                        name={fieldName}
                        render={(fieldArrayProps: any) => {
                            return fieldArrayProps.fields.map((name: any) => {
                                return (this.handleArray(fieldArrayProps, field.entityName, name));
                            })
                        }}
                    />
                </div>
            )
        }
    };

    handleArray = (fieldArrayProps: any, entityName: string, arrayName: string) => {
        for (let entity of this.props.schema.entities) {
            if (entity.name === entityName) {
                this.currentEntity = entity;
            }
        }
        return (this.entityEvaluator(this.currentEntity, false, true, arrayName));
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
    }

    //Builds style object dependent upon the size property passed in the field
    buildCustomStyle = (field: IFields) => {
        let size: number;
        let styleObj = {};
        if (field.hidden) {
            Object.assign(styleObj, {display: 'hidden'})
        }
        if (field.size && typeof field.size !== 'function') {
            size = field.size * 10;
            let minSize = size / 2;
            if (field.type !== 'array') {
                Object.assign(styleObj, {
                    flex: field.size,
                    maxWidth: `${size}vw`,
                    flexWrap: 'wrap',
                    minWidth: `${minSize}vw`
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
            let minSize = size / 2;
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

    //Evaluates all the properties in the field when the type of field property is function
    fieldFunctionEvaluator = (field: any, formSpyProps: FormSpyRenderProps) => {
        for (let key in field) {
            field[key] = FormHelper.metaDataEvaluator(field[key], formSpyProps)
        }
        return field;
    }

}

export default FormBuilder;
