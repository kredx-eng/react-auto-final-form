import React from "react";
import {mount, render} from 'enzyme';
import FormBuilder from "../../../components/FormBuilder";
import {newSchema} from "../../../Schema2";
import TextInputField from "../../../components/input/TextInputField";
import SelectInputField from "../../../components/input/SelectInputField";
import Button from "../../../components/input/FormButton";

const COMPONENT_FACTORY = {
    string: TextInputField,
    array: SelectInputField,
    button: Button,
};


const submit = jest.fn();

describe('render tests', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = render(<FormBuilder schema={newSchema} onSubmit={submit} componentFactory={COMPONENT_FACTORY}/>);
    });
    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('mount tests', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(<FormBuilder schema={newSchema} onSubmit={submit}/>);
    });

    it('should invoke submit on submit', () => {
        expect(wrapper.find('button')).toHaveLength(1);
        const button = wrapper.find('button');
        button.simulate('submit');
        expect(submit).toHaveBeenCalled();
    });

    it('should test renders', () => {
        expect(wrapper.find('div.container')).toHaveLength(1);
        expect(wrapper.find('div.verticalLayout')).toHaveLength(2);
        expect(wrapper.find('div.horizontalGroup')).toHaveLength(2);
        expect(wrapper.find('div.field')).toHaveLength(12);
    })
});