export type Validators = (value: any) => string | undefined;

const requiredValidator: Validators = (value: any) => {
    return (value? undefined : 'The field cannot be empty');
}

const emailValidator: Validators = (value: string) => {
    const regex = '/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/';
    if(value.match(regex)) {
        return undefined
    } else {
        return 'Please enter a valid email'
    }
}

export const validators = {
    email: emailValidator,
    required: requiredValidator,
}

export const composeValidator=(validator: any, value: any) => {
    if(!value) {
        value = '';
    }
    switch (typeof validator) {
        case 'string':  return stringValidator(validator, value);

        case 'object': if(Array.isArray(validator)) {
           return( validator.map((val) => {
                switch(typeof val){
                    case 'string': return stringValidator(val, value);
                    case 'function': return functionValidator(val, value);
                    default: return undefined
                }
            }))
        } else {
            return undefined;
        }

        case 'function': return functionValidator(validator,value);

        default: return undefined;
    }
}

export const stringValidator = (validator: string, value: any) => {
    switch (validator) {
        case 'required': return validators.required(value);
        case 'email': return validators.email(value);
    }
}

export const functionValidator = (validator: Validators, value: any) => {
    return validator(value);
}