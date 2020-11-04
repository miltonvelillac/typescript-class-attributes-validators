"use strict";
exports.__esModule = true;
exports.ValidateClassData = void 0;
require("reflect-metadata");
var constants_1 = require("./utilities/constants");
var ValidateClassData = /** @class */ (function () {
    function ValidateClassData() {
    }
    ValidateClassData.addValidationProperty = function (target, propertyKey) {
        var objectProperties = Reflect.getMetadata(constants_1.MetadataConstant.properties, target) || [];
        if (!objectProperties.includes(propertyKey)) {
            objectProperties.push(propertyKey);
            Reflect.defineMetadata(constants_1.MetadataConstant.properties, objectProperties, target);
        }
    };
    ValidateClassData.addValidationRules = function (target, propertyKey, validator, validationOptions) {
        var validators = Reflect.getMetadata(constants_1.MetadataConstant.rules, target, propertyKey) || [];
        var validtionRule = { validator: validator, validationOptions: validationOptions };
        validators.push(validtionRule);
        Reflect.defineMetadata(constants_1.MetadataConstant.rules, validators, target, propertyKey);
    };
    ValidateClassData.addValidation = function (target, propertyKey, validator, validationOptions) {
        this.addValidationProperty(target, propertyKey);
        this.addValidationRules(target, propertyKey, validator, validationOptions);
    };
    ValidateClassData.validate = function (object) {
        var keys = Reflect.getMetadata(constants_1.MetadataConstant.properties, object);
        var errors = {};
        if (!keys || !Array.isArray(keys)) {
            return errors;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var rules = Reflect.getMetadata(constants_1.MetadataConstant.rules, object, key);
            if (!Array.isArray(rules)) {
                continue;
            }
            for (var _a = 0, rules_1 = rules; _a < rules_1.length; _a++) {
                var rule = rules_1[_a];
                var errorMessage = rule.validator(object, key, rule.validationOptions);
                if (errorMessage) {
                    errors[key] = errors[key] || [];
                    errors[key].push(errorMessage);
                }
            }
        }
        return errors;
    };
    return ValidateClassData;
}());
exports.ValidateClassData = ValidateClassData;
