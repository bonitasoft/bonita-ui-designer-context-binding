import { expect } from "chai";
import { UidVariable, Property } from "../src/ContextBindingType";
import { InterpolationBinding } from "../src/InterpolationBinding";

describe('interpolation binding object', () => {
    let binding: InterpolationBinding;

    let expectedValue: UidVariable = { "type": "constant", "value": ["My Default Label"], "displayValue": "My Default Label", "exposed": false };
    //['anotherVariable', { 'type': 'constant', 'displayValue': 'Another label' }
    beforeEach(() => {
        let property: Property = { type: 'expression', value: 'My Default Label' };
        let context = new Map();
        context.set('anInterpolationToResolve', expectedValue);
        context.set('anotherVariable', { 'type': 'constant', 'displayValue': 'Another label' });

        binding = new InterpolationBinding(property, context);
    });


    it('should return property.value when getValue is called ', () => {
        expect(binding.getValue()).to.equal(expectedValue.displayValue)
    });

    it('should interpolate value when value contains only one {{variable}} syntax', () => {
        let property: Property = { type: 'expression', value: 'My label {{anInterpolationToResolve}}' };
        let context = new Map();
        context.set('anInterpolationToResolve', { "type": "constant", "value": ["is custom by interpolation"], "displayValue": "is custom by interpolation", "exposed": false });
        context.set('anotherVariable', { 'type': 'constant', 'displayValue': 'Another label' });

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal('My label is custom by interpolation')
    });

    it('should interpolate value when value contains more than one {{variable}} syntax', () => {
        let property: Property = { type: 'expression', value: '{{anLabel}} {{anInterpolationToResolve}}' };
        let context = new Map();
        context.set('anInterpolationToResolve', { "type": "constant", "value": ["is custom by interpolation"], "displayValue": "is custom by interpolation", "exposed": false });
        context.set('anLabel', { 'type': 'constant', 'displayValue': 'Another label' });

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal('Another label is custom by interpolation')
    });
});