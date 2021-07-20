import { expect } from "chai";
import { VariableBinding } from "../src/Binding";
import { Property } from "../src/UidType";
describe('variable binding object', () => {
    let binding: VariableBinding;
    let expectedValue: any = { "type": "constant", "value": ["Mu custom Label from variable"], "displayValue": "Mu custom Label from variable", "exposed": false };
    let property: Property;

    beforeEach(() => {
        property = { "type": "variable", "value": "uidVariable" };
    });


    it('should return property.value when getValue is called ', () => {
        binding = new VariableBinding(property, { "uidVariable": { "type": "constant", "value": ["Mu custom Label from variable"], "displayValue": "Mu custom Label from variable", "exposed": false }, "secondVariable": { "type": "constant", "value": ["123"], "displayValue": "123", "exposed": false } },);
        let value: any = binding.getValue();
        expect(value.displayValue).to.equal(expectedValue.displayValue)
    });


    it('should return property.value when mapped variable is not exist in context ', () => {
        binding = new VariableBinding(property, { "firstVariable": { "type": "constant", "value": ["Mu custom Label from variable"], "displayValue": "Mu custom Label from variable", "exposed": false }, "secondVariable": { "type": "constant", "value": ["123"], "displayValue": "123", "exposed": false } },);
        expect(() => {
            binding.getValue();
        }).to.throw(/is not defined/);
    });

    xit('should throw an error when we call setValue', () => {
        expect(() => {
            binding.setValue('Try to set a value');
        }).to.throw(/Method not implemented/);
    })
});

