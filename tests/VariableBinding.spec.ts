import { expect } from "chai";
import { VariableBinding } from "../src/VariableBinding";
import { Property } from "../src/ContextBindingType";
describe('variable binding object', () => {
    let binding: VariableBinding;
    let expectedValue: any = { "type": "constant", "value": ["Mu custom Label from variable"], "displayValue": "Mu custom Label from variable", "exposed": false };
    let property: Property;

    beforeEach(() => {
        property = { "type": "variable", "value": "uidVariable" };

    });

    it('should return property.value when getValue is called ', () => {
        let context = new Map();
        context.set('uidVariable', { "type": "constant", "value": ["Mu custom Label from variable"], "displayValue": "Mu custom Label from variable", "exposed": false });
        context.set('secondVariable', { "type": "constant", "value": ["123"], "displayValue": "123", "exposed": false });
        binding = new VariableBinding(property, context);
        let value: any = binding.getValue();
        expect(value.displayValue).to.equal(expectedValue.displayValue)
    });


    it('should return property.value when mapped variable is not exist in context ', () => {
        let context = new Map();
        context.set('firstVariable', { "type": "constant", "value": ["Mu custom Label from variable"], "displayValue": "Mu custom Label from variable", "exposed": false });
        context.set('secondVariable', { "type": "constant", "value": ["123"], "displayValue": "123", "exposed": false });
        binding = new VariableBinding(property, context);
        expect(binding.getValue()).to.equal(undefined)
    });

    it('should update value we call setValue', () => {
        let context = new Map();
        context.set('uidVariable', { "type": "constant", "value": ["Mu custom Label from variable"], "displayValue": "Mu custom Label from variable", "exposed": false });
        context.set('secondVariable', { "type": "constant", "value": ["123"], "displayValue": "123", "exposed": false });
        binding = new VariableBinding(property, context);
        binding.setValue("I'm the new value");
        let a = binding.getValue();
        expect(a.displayValue).to.equal('I\'m the new value');
    })
});

