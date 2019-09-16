import React from 'react';
import './App.css';
import { RenderOption } from "./interfaces/SchemaInterfaces";
export declare const COMPONENT_FACTORY: {
    string: (props: any) => JSX.Element;
    button: (props: any) => JSX.Element;
    Select: (props: any) => JSX.Element;
};
declare class App extends React.Component<any, any> {
    render(): JSX.Element;
    handleSubmit: (formData: any) => void;
    renderOption: RenderOption;
}
export default App;
