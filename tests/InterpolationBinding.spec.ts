import { expect } from "chai";
import { InterpolationBinding } from "../src/Binding";
import { Property } from "../src/UidType";

describe('interpolation binding object', () => {
    let binding: InterpolationBinding;
    let expectedValue: any = { "type": "constant", "value": ["My Default Label"], "displayValue": "My Default Label", "exposed": false };
    beforeEach(() => {
        let property: Property = { type: 'expression', value: 'My Default Label' };
        binding = new InterpolationBinding(property, { 'anInterpolationToResolve': expectedValue, 'anotherVariable': { 'type': 'constant', 'displayValue': 'Another label' } });
    });


    it('should return property.value when getValue is called ', () => {
        expect(binding.getValue()).to.equal(expectedValue.displayValue)
    });

    it('should interpolate value when value contains only one {{variable}} syntax', () => {
        let property: Property = { type: 'expression', value: 'My label {{anInterpolationToResolve}}' };
        binding = new InterpolationBinding(property, { 'anInterpolationToResolve': { "type": "constant", "value": ["is custom by interpolation"], "displayValue": "is custom by interpolation", "exposed": false }, 'anotherVariable': { 'type': 'constant', 'displayValue': 'Another label' } });
        expect(binding.getValue()).to.equal('My label is custom by interpolation')
    });

    it('should interpolate value when value contains more than one {{variable}} syntax', () => {
        let property: Property = { type: 'expression', value: '{{anLabel}} {{anInterpolationToResolve}}' };
        binding = new InterpolationBinding(property, { 'anInterpolationToResolve': { "type": "constant", "value": ["is custom by interpolation"], "displayValue": "is custom by interpolation", "exposed": false }, 'anLabel': { 'type': 'constant', 'displayValue': 'Another label' } });
        expect(binding.getValue()).to.equal('Another label is custom by interpolation')
    });

    it('should throw an error when we call setValue', () => {
        expect(() => {
            binding.setValue('Try to set a value');
        }).to.throw(/Method not implemented/);
    })
});