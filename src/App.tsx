import React from 'react';
import logo from './logo.svg';
import './App.css';
import {newSchema} from "./Schema2";
import FormBuilder from "./components/FormBuilder";
import {Form, Field} from 'react-final-form'
import TextInputField from "./components/input/TextInputField";
import SelectInputField from "./components/input/SelectInputField";
import Button from "./components/input/FormButton";
import {arraySchema} from "./Schema3";
import MainWindow from "./demo/MainWindow";

export const COMPONENT_FACTORY = {
    string: TextInputField,
    button: Button,
    select: SelectInputField,
};

class App extends React.Component<any, any> {

    render() {
        return (
            <MainWindow/>
            //<FormBuilder onSubmit={this.handleSubmit} schema={newSchema} componentFactory={COMPONENT_FACTORY}/>
        );
    }

    handleSubmit = (formData: any): void => {
        console.log(formData, 'called');
    }

}

export default App;
