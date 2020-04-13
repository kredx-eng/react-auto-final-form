import {Validators, validators, getErorr, functionValidator} from '../../../utils/Validators';

describe('Validators tests', () => {
   it('should return email error', () => {
      const retVal = validators.email('asdf');
      expect(retVal).toEqual('Please enter a valid email');
   });

   it('should return empty error', () => {
      const retVal = validators.required('');
      expect(retVal).toEqual('The field cannot be empty');
   });

   it('should return errors as undefined', () => {
      const emailError = validators.email('arshi.anand@gmail.com');
      const requiredError = validators.required('asdf');
      expect(emailError && requiredError).toBeUndefined();
   });

   it('should compose a string validator', () => {
      const validationString = 'required';
      const spy = jest.spyOn(validators, 'required');
      const retval = getErorr(validationString, '');
      expect(spy).toHaveBeenCalled();
      expect(retval).toEqual('The field cannot be empty');
   });

   it('should call function validator', () => {
      const funcValidator = {
         func: functionValidator,
      }
      const validationFunction: Validators = (value: any) => {
         return(value? undefined : 'Invalid');
      }
      const retval = funcValidator.func(validationFunction, '');
      expect(retval).toEqual('Invalid');
   });

   it('should take the array as input and call the functions', () => {
      const validationArray = ['required','email'];
      const requiredSpy = jest.spyOn(validators,'required');
      const emailSpy = jest.spyOn( validators, 'email');
      getErorr(validationArray, 'asdf');
      expect(requiredSpy && emailSpy).toHaveBeenCalledWith('asdf');
   });
});