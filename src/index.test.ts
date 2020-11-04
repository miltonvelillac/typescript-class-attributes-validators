import { ValidateClassData } from ".";
import { AttributesValidation } from "./decorators/attributes-validation";


class EmailTest {
    @AttributesValidation.isEmail()
    email?: string;

    @AttributesValidation.isEmail('[A-Z]$')
    emailWithRegex?: string;

    @AttributesValidation.isEmail(undefined, 'My email error message')
    emailWithErrorMessage?: string;    
}

class LenghtTest {
    @AttributesValidation.lengthMinMax(10, 20)
    name?: string

    @AttributesValidation.lengthMinMax(10, 20, 'Custome error test message')
    nameCustomWrongMessage?: string;
}

class RequiredTest {
    @AttributesValidation.required()
    id: any;

    @AttributesValidation.required('Custome error test message for required')
    idCustomErrorMessage?: any;
}

class IntegerTest {
    @AttributesValidation.isInteger(10, 20)
    accountNumber: any;

    @AttributesValidation.isInteger(10, 20, 'Custome error test message for isInteger')
    accountNumberCustomErrorMessage?: any;

    @AttributesValidation.isInteger(-10, 20)
    negativeNumber?: any;
}

class NumberTest {
    @AttributesValidation.isNumber()
    accountNumber: any;

    @AttributesValidation.isNumber(-10, 20)
    accountNumberMaxMin: any;

    @AttributesValidation.isNumber(undefined, undefined, 'Custome error test message for Number')
    accountNumberCustomErrorMessage?: any;
}

describe('#validate Email', () => {
    test('validate a correct email', () => {
        // Arrange:
        const person = new EmailTest();
        person.email = 'mytest@mail.com';

        // Act:
        const errors = ValidateClassData.validate(person);

        // Assert:
        expect(Object.keys(errors).length).toBe(0);
    });

    test('validate a wrong email', () => {
        // Arrange:
        const person = new EmailTest();
        person.email = 'mytest@mail.com..';

        // Act:
        const errors = ValidateClassData.validate(person);

        // Assert:
        expect(Object.keys(errors).length).toBe(1);
        expect(errors.email).toEqual(['Property email must be a valid email.']);
    });

    test('validate a correct emailWithRegex', () => {
        // Arrange:
        const person = new EmailTest();
        person.emailWithRegex = 'MYEMAIL';

        // Act:
        const errors = ValidateClassData.validate(person);

        // Assert:
        expect(errors.emailWithRegex).toBeUndefined();
    });

    test('validate a wrong emailWithRegex', () => {
        // Arrange:
        const person = new EmailTest();
        person.emailWithRegex = 'mytest784@mail.com';

        // Act:
        const errors = ValidateClassData.validate(person);

        // Assert:
        expect(errors.emailWithRegex).toEqual(['Property emailWithRegex must be a valid email.']);
    });

    test('validate a wrong emailWithRegex', () => {
        // Arrange:
        const person = new EmailTest();
        person.emailWithErrorMessage = 'mytest784@mail.com.';

        // Act:
        const errors = ValidateClassData.validate(person);

        // Assert:
        expect(errors.emailWithErrorMessage).toEqual(['My email error message']);
    });    
});

describe('#validate lengthMinMax', () => {
    test('validate a name with fewer characters than configured', () => {
        // Arrange:
        const lenghtTest = new LenghtTest();
        lenghtTest.name = 'less';

        // Act:
        const errors = ValidateClassData.validate(lenghtTest);

        // Assert:
        expect(errors.name).toEqual(['Property name must be a string betwee 10 and 20']);
    });

    test('validate a name with more characters than configured', () => {
        // Arrange:
        const lenghtTest = new LenghtTest();
        lenghtTest.name = 'more characters than configured for this test';

        // Act:
        const errors = ValidateClassData.validate(lenghtTest);

        // Assert:
        expect(errors.name).toEqual(['Property name must be a string betwee 10 and 20']);
    });

    test('validate a name with correct characters number', () => {
        // Arrange:
        const lenghtTest = new LenghtTest();
        lenghtTest.name = 'enough characters';

        // Act:
        const errors = ValidateClassData.validate(lenghtTest);

        // Assert:
        expect(errors.name).toBeUndefined();
    });

    test('validate a nameCustomWrongMessage with correct characters number', () => {
        // Arrange:
        const lenghtTest = new LenghtTest();
        lenghtTest.nameCustomWrongMessage = 'enough characters';

        // Act:
        const errors = ValidateClassData.validate(lenghtTest);

        // Assert:
        expect(errors.name).toBeUndefined();
    });

    test('validate a nameCustomWrongMessage with wrong characters number', () => {
        // Arrange:
        const lenghtTest = new LenghtTest();
        lenghtTest.nameCustomWrongMessage = 'few';

        // Act:
        const errors = ValidateClassData.validate(lenghtTest);

        // Assert:
        console.log(errors);
        expect(errors.nameCustomWrongMessage).toEqual(['Custome error test message']);
    });
});


describe('#validate required', () => {
    test('validate a required attribute', () => {
        // Arrange:
        const requiredTest = new RequiredTest();
        requiredTest.id = '1234555478';
        requiredTest.idCustomErrorMessage = 12315456787;

        // Act:
        const errors = ValidateClassData.validate(requiredTest);

        // Assert:
        expect(errors.id).toBeUndefined();
        expect(errors.idCustomErrorMessage).toBeUndefined();
    });

    test('validate a required attribute with undefined value', () => {
        // Arrange:
        const requiredTest = new RequiredTest();

        // Act:
        const errors = ValidateClassData.validate(requiredTest);

        // Assert:
        expect(errors.id).toEqual(['Property id is required.']);
        expect(errors.idCustomErrorMessage).toEqual(['Custome error test message for required']);
    });

    test('validate a required attribute with null value', () => {
        // Arrange:
        const requiredTest = new RequiredTest();
        requiredTest.id = null;
        requiredTest.idCustomErrorMessage = null;

        // Act:
        const errors = ValidateClassData.validate(requiredTest);

        // Assert:
        expect(errors.id).toEqual(['Property id is required.']);
        expect(errors.idCustomErrorMessage).toEqual(['Custome error test message for required']);
    });
});

describe('#validate isInteger', () => {
    test('validate if a data is an integer', () => {
        // Arrange:
        const requiredTest = new IntegerTest();
        requiredTest.accountNumber = 11;
        requiredTest.accountNumberCustomErrorMessage = 15;

        // Act:
        const errors = ValidateClassData.validate(requiredTest);

        // Assert:
        expect(errors.accountNumber).toBeUndefined();
        expect(errors.accountNumberCustomErrorMessage).toBeUndefined();
    });

    test('validate if a data is an integer with float and string', () => {
        // Arrange:
        const requiredTest = new IntegerTest();
        requiredTest.accountNumber = 123.4555478;
        requiredTest.accountNumberCustomErrorMessage = '12315456787';

        // Act:
        const errors = ValidateClassData.validate(requiredTest);

        // Assert:
        expect(errors.accountNumber).toEqual(['Property accountNumber must be an integer between 10 and 20.']);
        expect(errors.accountNumberCustomErrorMessage).toEqual(['Custome error test message for isInteger']);
    });

    test('validate if a data is an integer whit wrong numbers limit', () => {
        // Arrange:
        const requiredTest = new IntegerTest();
        requiredTest.accountNumber = 21;
        requiredTest.accountNumberCustomErrorMessage = 9;

        // Act:
        const errors = ValidateClassData.validate(requiredTest);

        // Assert:
        expect(errors.accountNumber).toEqual(['Property accountNumber must be an integer between 10 and 20.']);
        expect(errors.accountNumberCustomErrorMessage).toEqual(['Custome error test message for isInteger']);
    });

    test('validate if a data is an integer whit negative number', () => {
        // Arrange:
        const requiredTest = new IntegerTest();
        requiredTest.negativeNumber = -10;

        // Act:
        const errors = ValidateClassData.validate(requiredTest);

        // Assert:
        expect(errors.negativeNumber).toBeUndefined();
    });
});
describe('#validate isNumber', () => {
    test('validate if the data is a number', () => {
        // Arrange:
        const requiredTest = new NumberTest();
        requiredTest.accountNumber = 11;
        requiredTest.accountNumberMaxMin = -4;
        requiredTest.accountNumberCustomErrorMessage = 15.99;

        // Act:
        const errors = ValidateClassData.validate(requiredTest);

        // Assert:
        expect(errors.accountNumber).toBeUndefined();
        expect(errors.accountNumberMaxMin).toBeUndefined();
        expect(errors.accountNumberCustomErrorMessage).toBeUndefined();
    });

    test('validate isNumber with wrong data', () => {
        // Arrange:
        const requiredTest = new NumberTest();
        requiredTest.accountNumber = false;
        requiredTest.accountNumberMaxMin = -11;
        requiredTest.accountNumberCustomErrorMessage = '12315456787';

        // Act:
        const errors = ValidateClassData.validate(requiredTest);

        // Assert:
        expect(errors.accountNumber).toEqual(['Property accountNumber must be a number.']);
        expect(errors.accountNumberMaxMin).toEqual(['Property accountNumberMaxMin must be a number between -10 and 20.']);
        expect(errors.accountNumberCustomErrorMessage).toEqual(['Custome error test message for Number']);
    });

});