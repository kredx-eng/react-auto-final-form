import {FormSpyRenderProps} from "react-final-form";

const _evaluator = (evaluatee: Function, formState: any ) => {
    const evaluated = evaluatee(_formState, _formState.value );
    return evaluated;
};

let _formState: any = {};
let renderCount: number = 0;

const _updateFormState = (formProps: any) => {
    _formState = formProps;
    renderCount += 1;
    const getFieldState = _formState.form.getFieldState('name')
    // console.log(getFieldState, 'OKAY')
};

const _getFieldState = (fieldName: string) => {
    let fieldState = _formState.form.getFieldState(fieldName);
    if(fieldState && fieldState.value === 'asd') {
        console.log('here')
        return ('WHEEEWWWW')
    } else return('nope');
}

const _metadataEvaluator = (value: any, formSpyProps: FormSpyRenderProps) => {
    if(typeof value === 'function') {
        return value(formSpyProps, formSpyProps.values);
    } else {
        return value
    }
};

export const FormHelper = {
    evaluator: _evaluator,
    formState: _formState,
    updateFormState: _updateFormState,
    metaDataEvaluator: _metadataEvaluator,
    getFieldState: _getFieldState,
};