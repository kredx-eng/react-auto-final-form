import React from 'react';
import {IFields} from "../interfaces/SchemaInterfaces";
import {Field} from "react-final-form";
import TextInputField from "./input/TextInputField";

interface IProps {
    fieldComponent: any;
    fieldData: IFields;
    values: any
}

const withValues = (props: IProps) => {
    const {fieldData, values} = props;
};