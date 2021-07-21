import { expect } from "chai";
import { ExpressionBinding } from "../src/ExpressionBinding";
import { Property } from "../src/UidType";

describe('expression binding object', () => {
    let binding: ExpressionBinding;
    let property: Property;
    let expectedValue: any = { type: 'constant', value: ['2'], displayValue: '2', exposed: false };

    beforeEach(() => {
        property = { "type": "expression", "value": "tmpVar" };
    });


    it('should return property.value when getValue is called ', () => {
        binding = new ExpressionBinding(property, { "tmpVar": { "type": "constant", "value": ["2"], "displayValue": "2", "exposed": false } });
        let value: any = binding.getValue();
        expect(value.displayValue).to.equal(expectedValue.displayValue)
    });

    it('should create an expression binding for an expression property', function () {
        let context: any = {};
        property = { "type": "expression", "value": "a + b" };

        context = { a: 3, b: 7 };

        binding = new ExpressionBinding(property, context);

        expect(binding.getValue()).to.equals(10);
    });


    it('should reteurn undefined when variable is not exist ', () => {
        binding = new ExpressionBinding(property, { "temporaryVar": { "type": "constant", "value": ["2"], "displayValue": "2", "exposed": false } });
        expect(binding.getValue()).to.equals(undefined);
    });


    it('should throw an error when we call setValue', () => {
        expect(() => {
            binding.setValue('Try to set a value');
        }).to.throw(/Method not implemented/);
    })
});