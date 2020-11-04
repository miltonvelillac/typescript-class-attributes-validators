import 'reflect-metadata';

type ValidationFunction = (target: any,  propertyKey: string, validatorOptions?: any) => string | void;

interface ValidationRule {
    validationOptions?: any;
    validator: ValidationFunction;
}

export function isEmail(target: any, propertyKey: string) {
    Validation.addValidation(target, propertyKey, emailValidator);
}

export function required(target: any, propertyKey: string) {
    Validation.addValidation(target, propertyKey, requiredValidator);
}

export function length(minimum: number, maximum: number) {
    const options = { minimum, maximum };
    return function(target: any, propertyKey: string) {
        Validation.addValidation(target, propertyKey, lengthValidator, options);
    }
}

export function isPhone(target: any, propertyKey: string) {
    Validation.addValidation(target, propertyKey, phoneValidator);
}

export function isInteger(minimum: number, maximum: number) {
    const options = { minimum, maximum };
    return function (target: any, propertyKey: string) {
        Validation.addValidation(target, propertyKey, integerValidator, options);
    }
}

export class Validation {
    private static addValidationProperty(target: any, propertyKey: string): void {
        const objectProperties: string[] = Reflect.getMetadata('validation:properties', target) || [];
        if (!objectProperties.includes(propertyKey)) {
            objectProperties.push(propertyKey);
            Reflect.defineMetadata('validation:properties', objectProperties, target);
        }
    }

    private static addValidationRules(target: any, propertyKey: string, validator: ValidationFunction, validationOptions?: any): void {
        const validators: ValidationRule[] = Reflect.getMetadata('validation:rules', target, propertyKey) || [];
    
        const validtionRule = { validator, validationOptions };
        validators.push(validtionRule);
        Reflect.defineMetadata('validation:rules', validators, target, propertyKey);
    }
    
    
    static addValidation(target: any, propertyKey: string, validator: ValidationFunction, validationOptions?: any) {
        this.addValidationProperty(target, propertyKey);
        this.addValidationRules(target, propertyKey, validator, validationOptions);
    }

    static validate(object: any) {
        const keys = Reflect.getMetadata('validation:properties', object) as string[];
        let errorMap: any = {};
    
        if(!keys || !Array.isArray(keys)) { return errorMap; }
    
        for (const key of keys) {
            const rules: ValidationRule[] = Reflect.getMetadata('validation:rules', object, key) as ValidationRule[];
            if (!Array.isArray(rules)) { continue; }
            for (const rule of rules) {
                const errorMessage = rule.validator(object, key, rule.validationOptions);
                if (errorMessage) {
                    errorMap[key] = errorMap[key] || [];
                    errorMap[key].push(errorMessage);
                }
            }
        }
        return errorMap;
    }

}


function emailValidator(target: any, propertyKey: string): string | void {
    const value = target[propertyKey];
    if (!value) { return; }
    const isValid = false;
    console.log('EMAIL');
    if(!isValid) {
        return `Property ${propertyKey} must be a valid email.`;
    }
    return;
}

function requiredValidator(target: any, propertyKey: string): string | void {
    const value = target[propertyKey];
    if (value) { return; }
    return `Property ${propertyKey} is required.`;
}

function integerValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
    const value = target[propertyKey];
    if (value == null) { return; }
    const errorMessage =  `Property ${propertyKey} must be an integer between ${validatorOptions.minimum} and ${validatorOptions.maximum}.`;
    return Number.isInteger(value) && value <= validatorOptions.maximum && value >= validatorOptions.minimum
            ? undefined
            : errorMessage;
}

function lengthValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
    const value = target[propertyKey];
    if (value == null) { return; }
    if (value.length == null) { return `Property ${propertyKey} does not have length attribute`};
    const options = { minimum: validatorOptions.minimum, maximum: validatorOptions.maximum };

    const isValid: boolean = value.length >= validatorOptions.minimum && value.lenght <= validatorOptions.maximum;
    if(!isValid) {
        return `Property ${propertyKey} must be a string betwee ${validatorOptions.minimum} and ${validatorOptions.maximum}`;
    }
    return;
}

function phoneValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
    const value = target[propertyKey];
    if (value == null) { return; }
    const isValid: boolean = true;
    return isValid ? `Property ${propertyKey} must be a valid phone number` : undefined;
}
