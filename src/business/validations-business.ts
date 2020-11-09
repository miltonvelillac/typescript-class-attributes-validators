import { RegexData } from "../utilities/regex";

export class ValidationsBusiness {
    static emailValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
        const value = target[propertyKey];
        if (!value) { return; }
        const regex: RegExp = validatorOptions.regex || RegexData.emailRegex;
        const isValid: boolean = RegexData.validateRegexData(value, regex);
        return !isValid ? (validatorOptions.customeErrorMessage || `Property ${propertyKey} must be a valid email.`) : undefined;
    }
    
    static requiredValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
        const value = target[propertyKey];
        if (value) { return; }
        return validatorOptions.customeErrorMessage || `Property ${propertyKey} is required.`;
    }
    
    static integerValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
        const value = target[propertyKey];
        if (value == null) { return; }
        return Number.isInteger(value) && value <= validatorOptions.maximum && value >= validatorOptions.minimum
                ? undefined
                : validatorOptions.customeErrorMessage || `Property ${propertyKey} must be an integer between ${validatorOptions.minimum} and ${validatorOptions.maximum}.`;
    }
    
    static lengthValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
        const value = target[propertyKey];
        if (value == null) { return; }
        if (value.length == null) { return `Property ${propertyKey} does not have length attribute`};
        if (validatorOptions.minimum > validatorOptions.maximum) {
            return `Property ${propertyKey} has a wrong configuration, minimum is greater than maximum check the class`
        }
        const valueLength = value.length;
        const isValid: boolean = valueLength >= validatorOptions.minimum && valueLength <= validatorOptions.maximum;

        if(!isValid) {
            const errorMessage = validatorOptions.customeErrorMessage || `Property ${propertyKey} must be a string betwee ${validatorOptions.minimum} and ${validatorOptions.maximum}`;
            return errorMessage;
        }
        return;
    }
    
    static isNumberValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
        const value = target[propertyKey];
        if (value == null) { return; }
        if (validatorOptions.minimum && !validatorOptions.maximum) { return `Property ${propertyKey} must define maximum value too.`; }
        if (validatorOptions.maximum && !validatorOptions.minimum) { return `Property ${propertyKey} must define minimum value too.`; }
        if (typeof value !== 'number') { return validatorOptions.customeErrorMessage || `Property ${propertyKey} must be a number.`; }
        if (validatorOptions.minimum && validatorOptions.maximum 
            && (value < validatorOptions.minimum || value > validatorOptions.maximum)
        ) {
            return `Property ${propertyKey} must be a number between ${validatorOptions.minimum} and ${validatorOptions.maximum}.`;
        }
        return;
    }

    static customValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
        const value = target[propertyKey];
        if (!value) { return; }
        if (!validatorOptions.regex) { return `Property ${propertyKey} should have a regex`;}
        const isValid: boolean = RegexData.validateRegexData(value, validatorOptions.regex);
        return !isValid ? (validatorOptions.customeErrorMessage || `Property ${propertyKey} must be a valid data.`) : undefined;
    }

}
