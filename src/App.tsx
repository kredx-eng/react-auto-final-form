import React from 'react';
import logo from './logo.svg';
import './App.css';
import {newSchema} from "./schemas/Schema2";
import FormBuilder from "./components/FormBuilder";
import {Form, Field, FormSpyRenderProps} from 'react-final-form'
import TextInputField from "./components/input/TextInputField";
import SelectInputField from "./components/input/SelectInputField";
import Button from "./components/input/FormButton";
import {functionSchema} from "./schemas/Schema3";
import MainWindow from "./demo/MainWindow";
import {RenderOption} from "./interfaces/SchemaInterfaces";
import groupSchema from "./schemas/GroupSchema";

export const COMPONENT_FACTORY = {
    string: TextInputField,
    button: Button,
    Select: SelectInputField,
};

class App extends React.Component<any, any> {

    render() {
        return (
            //<MainWindow/>
            <FormBuilder
                onSubmit={this.handleSubmit}
                schema={newSchema}
                componentFactory={COMPONENT_FACTORY}
                entityName = {"contact"}
                subscription={{submitting: true,values: true}}
                bottomBar={Button}
                renderOption={this.renderOption}
                layoutName={'edit'}
            />
        );
    }

    handleSubmit = (formData: any): void => {
        console.log(formData, 'submitted');
        alert(JSON.stringify(formData, null, '\t'));
    };

    renderOption: RenderOption = (formSpyProps: FormSpyRenderProps, nextProps: any) => {
        const {formData} = nextProps;
        if(formData.values.name !== formSpyProps.values.name) {
            return true
        } else return false
    }

}

export default App;
