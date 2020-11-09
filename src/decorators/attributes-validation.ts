import { ValidateClassData } from "../index";
import { ValidationsBusiness } from "../business/validations-business";

export class AttributesValidation {
    static isEmail(regex?: RegExp | string, customeErrorMessage?: string) {
        const options = { regex, customeErrorMessage };
        return function(target: any, propertyKey: string) {
            ValidateClassData.addValidation(target, propertyKey, ValidationsBusiness.emailValidator, options);
        }
    }
    
    static required(customeErrorMessage?: string) {
        const options = { customeErrorMessage };
        return function(target: any, propertyKey: string) {
            ValidateClassData.addValidation(target, propertyKey, ValidationsBusiness.requiredValidator, options);
        }
    }
    
    static lengthMinMax(minimum: number, maximum: number, customeErrorMessage?: string) {
        const options = { minimum, maximum, customeErrorMessage };
        return function(target: any, propertyKey: string) {
            ValidateClassData.addValidation(target, propertyKey, ValidationsBusiness.lengthValidator, options);
        }
    }
    
    static isNumber(minimum?: number, maximum?: number, customeErrorMessage?: string) {
        const options = { minimum, maximum, customeErrorMessage };
        return function(target: any, propertyKey: string) {
            ValidateClassData.addValidation(target, propertyKey, ValidationsBusiness.isNumberValidator, options);
        }
    }
    
    static isInteger(minimum: number, maximum: number, customeErrorMessage?: string) {
        const options = { minimum, maximum, customeErrorMessage };
        return function (target: any, propertyKey: string) {
            ValidateClassData.addValidation(target, propertyKey, ValidationsBusiness.integerValidator, options);
        }
    }

    static custom(regex: RegExp | string, customeErrorMessage?: string) {
        const options = { regex, customeErrorMessage };
        return function (target: any, propertyKey: string) {
            ValidateClassData.addValidation(target, propertyKey, ValidationsBusiness.integerValidator, options);
        }
    }
}
