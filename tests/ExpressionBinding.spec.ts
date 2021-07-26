import { expect } from "chai";
import { ExpressionBinding } from "../src/ExpressionBinding";
import { Property, UidVariable } from "../src/ContextBindingType";

describe('expression binding object', () => {
    let binding: ExpressionBinding;
    let property: Property;
    let expectedValue: any = { type: 'constant', value: ['2'], displayValue: '2', exposed: false };

    beforeEach(() => {
        property = { "type": "expression", "value": "tmpVar" };
    });


    it('should return property.value when getValue is called ', () => {
        let myMap: Map<string, UidVariable> = new Map([
            ['tmpVar', { "type": "constant", "value": ["2"], "displayValue": "2", "exposed": false }]
        ]);

        binding = new ExpressionBinding(property, myMap);
        let value: any = binding.getValue();
        expect(value.displayValue).to.equal(expectedValue.displayValue)
    });

    it('should create an expression binding for an expression property', function () {
        property = { "type": "expression", "value": "a + b" };

        let context = new Map();
        context.set('a', 3);
        context.set('b', 7);
        binding = new ExpressionBinding(property, context);

        expect(binding.getValue()).to.equals(10);
    });


    it('should reteurn undefined when variable is not exist ', () => {
        binding = new ExpressionBinding(property, new Map([
            ['temporaryVar', { "type": "constant", "value": ["2"], "displayValue": "2", "exposed": false }]
        ]));
        expect(binding.getValue()).to.equals(undefined);
    });

});