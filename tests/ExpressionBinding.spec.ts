import { expect } from "chai";
import { ExpressionBinding } from "../src/Binding";
import { Property } from "../src/UidType";

describe('expression binding object', () => {
    let binding: ExpressionBinding;
    let expectedValue: any = { "type": "constant", "value": ["2"], "displayValue": "2", "exposed": false };

    beforeEach(() => {
        let property: Property = { "type": "expression", "value": "toto" };
        binding = new ExpressionBinding(property, { "toto": { "type": "constant", "value": ["2"], "displayValue": "2", "exposed": false } });
    });


    xit('should return property.value when getValue is called ', () => {
        expect(binding.getValue()).to.equal(expectedValue)
    });

    xit('should throw an error when we call setValue', () => {
        expect(() => {
            binding.setValue('Try to set a value');
        }).to.throw(/Method not implemented/);
    })
});