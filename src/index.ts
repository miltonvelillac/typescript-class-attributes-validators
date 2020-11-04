import 'reflect-metadata';
import { MetadataConstant } from './utilities/constants';

type ValidationFunction = (target: any,  propertyKey: string, validatorOptions?: any) => string | void;

interface ValidationRule {
    validationOptions?: any;
    validator: ValidationFunction;
}



export class ValidateClassData {
    private static addValidationProperty(target: any, propertyKey: string): void {
        const objectProperties: string[] = Reflect.getMetadata(MetadataConstant.properties, target) || [];
        if (!objectProperties.includes(propertyKey)) {
            objectProperties.push(propertyKey);
            Reflect.defineMetadata(MetadataConstant.properties, objectProperties, target);
        }
    }

    private static addValidationRules(target: any, propertyKey: string, validator: ValidationFunction, validationOptions?: any): void {
        const validators: ValidationRule[] = Reflect.getMetadata(MetadataConstant.rules, target, propertyKey) || [];
    
        const validtionRule = { validator, validationOptions };
        validators.push(validtionRule);
        Reflect.defineMetadata(MetadataConstant.rules, validators, target, propertyKey);
    }
    
    
    static addValidation(target: any, propertyKey: string, validator: ValidationFunction, validationOptions?: any) {
        this.addValidationProperty(target, propertyKey);
        this.addValidationRules(target, propertyKey, validator, validationOptions);
    }

    static validate(object: any) {
        const keys = Reflect.getMetadata(MetadataConstant.properties, object) as string[];
        let errors: any = {};
    
        if(!keys || !Array.isArray(keys)) { return errors; }
    
        for (const key of keys) {
            const rules: ValidationRule[] = Reflect.getMetadata(MetadataConstant.rules, object, key) as ValidationRule[];
            if (!Array.isArray(rules)) { continue; }
            for (const rule of rules) {
                const errorMessage = rule.validator(object, key, rule.validationOptions);
                if (errorMessage) {
                    errors[key] = errors[key] || [];
                    errors[key].push(errorMessage);
                }
            }
        }
        return errors;
    }

}

