import React from "react";
import FormBuilder from "../components/FormBuilder";
import {Field, Form} from "react-final-form";
import './MainWindow.css';
import SchemaSelect from "./SchemaSelect";
import {DEMO_SCHEMAS} from "./DemoSchemas";
import {UnControlled as CodeMirror} from 'react-codemirror2';
import _ from 'lodash';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import {COMPONENT_FACTORY} from "../App";

const codeMirrorOptions = {
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true,
    lineWrapping: true,
};

class MainWindow extends React.Component <any, any> {
    editorValue: any;

    constructor(props: any) {
        super(props);
        this.state = {
            currentSchema: {},
            editorValue: {}
        };
        this.editorValue = this.state.currentSchema;
    }

    getSelectValue = () => {

    };

    render = () => {
        return (
            <div className={'container'}>
                <div className={'leftPanel'}>
                    <div className={'controls'}>
                        <Form
                            onSubmit={this.handleSubmit}
                            initialValues={{currentSchema: 'Simple'}}
                            render={(formProps) => {
                                return (
                                    <form id={'inputForm'}>
                                        <Field
                                            name={'currentSchema'}
                                            component={SchemaSelect}
                                            schemas={DEMO_SCHEMAS}
                                            handleChange={this.handleSelectInputChange}
                                        />
                                    </form>
                                )
                            }}
                        />
                        <button id={'updateButton'} onClick={this.updateSchema}>
                            Update
                        </button>
                    </div>
                    <label>
                        Schema
                        <CodeMirror
                            value={
                                !_.isEmpty(this.state.currentSchema) ?
                                    JSON.stringify(this.state.currentSchema, null, '\t') :
                                    JSON.stringify(DEMO_SCHEMAS['Simple'].value, null, '\t')
                            }
                            options={{
                                mode: 'javascript',
                                ...codeMirrorOptions,
                            }}
                            onChange={(editor, data, value) => {
                                this.editorValue = value;
                            }}
                        />
                    </label>
                </div>
                <div className={'rightPanel'}>
                    <div className={'renderDock'}>
                        {this.renderFormBuilder()}
                    </div>
                </div>
            </div>
        )
    };

    handleSubmit = (formData: any) => {
        console.log('called', formData);
    };

    handleSelectInputChange = (value: any) => {
        this.setState({currentSchema: DEMO_SCHEMAS[value].value});
        console.log(value, 'called', DEMO_SCHEMAS[value])
    };

    updateSchema = () => {
        console.log(JSON.parse(this.editorValue));
        this.setState({currentSchema: JSON.parse(this.editorValue)});
    };

    renderFormBuilder = () => {
        if (_.isEmpty(this.state.currentSchema)) {
            return (
                <FormBuilder onSubmit={this.handleSubmit} schema={DEMO_SCHEMAS['Simple'].value} componentFactory={COMPONENT_FACTORY}/>
            )
        } else {
            return (
                <FormBuilder onSubmit={this.handleSubmit} schema={this.state.currentSchema} componentFactory={COMPONENT_FACTORY}/>
            )
        }
    };

}

export default MainWindow;