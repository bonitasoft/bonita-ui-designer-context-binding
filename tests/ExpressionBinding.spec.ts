import { expect } from "chai";
import { ExpressionBinding } from "../src/bindingType/ExpressionBinding";
import { Property } from "../src/ContextBindingType";
import { VariableAccessor } from "../src/VariableAccessor";

describe('expression binding object', () => {
    let binding: ExpressionBinding;
    let property: Property;
    let expectedValue: any = { type: 'constant', value: ['2'], displayValue: '2', exposed: false };

    beforeEach(() => {
        property = { "type": "expression", "value": "tmpVar" };
    });


    it('should return property.value when getValue is called ', () => {
        let context = new Map();
        context.set('tmpVar', new VariableAccessor('2'));
        binding = new ExpressionBinding(property, context);
        expect(binding.getValue()).to.equal('2')
    });

    it('should create an expression binding for an expression property', function () {
        property = { "type": "expression", "value": "a + b" };

        let context = new Map();
        context.set('a', new VariableAccessor(3));
        context.set('b', new VariableAccessor(7));
        binding = new ExpressionBinding(property, context);

        expect(binding.getValue()).to.equals(10);
    });


    it('should resolve new valuee when a value inside an expression is updated ', () => {
        property = { "type": "expression", "value": "a + b" };

        let context = new Map();
        context.set('a', new VariableAccessor(3));
        context.set('b', new VariableAccessor(7));

        binding = new ExpressionBinding(property, context);

        expect(binding.getValue()).to.equals(10);
        expect(binding.getValue()).to.equals(10);

        context.set('b', new VariableAccessor(9));
        expect(binding.getValue()).to.equals(12);
    });

    it('should return undefined when variable is not exist ', () => {
        let context = new Map();
        context.set('temporaryVar', new VariableAccessor('3'));
        binding = new ExpressionBinding(property, context);
        expect(binding.getValue()).to.equals(undefined);
    });

    it('should return empty string when property value is null ', () => {
        let context = new Map();
        property = { "type": "expression", "value": null };
        binding = new ExpressionBinding(property, context);
        expect(binding.getValue()).to.equals('');
    });


});