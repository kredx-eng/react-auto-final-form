const _evaluator = (evaluatee: Function, formState: any ) => {
    const evaluated = evaluatee(_formState, _formState.value );
    return evaluated;
};

let _formState: any = {};
let renderCount: number = 0;

const _updateFormState = (formProps: any) => {
    _formState = formProps;
    renderCount += 1;
    console.log(renderCount,_formState, 'OKAY')
};

const _metadataEvaluator = (value: any) => {
    if(typeof value === 'function') {
        return FormHelper.evaluator(value, _formState)
    } else {
        return value
    }
};

export const FormHelper = {
    evaluator: _evaluator,
    formState: _formState,
    updateFormState: _updateFormState,
    metaDataEvaluator: _metadataEvaluator,
};