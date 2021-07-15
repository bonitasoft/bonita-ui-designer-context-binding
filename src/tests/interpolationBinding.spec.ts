import { expect } from "chai";
import { InterpolationBinding } from "../../index";
import { Property } from "../UidType";

describe('interpolation binding object', () => {
    let binding: InterpolationBinding;
    let expectedValue: any = { "type": "constant", "value": ["My Default Label"], "displayValue": "My Default Label", "exposed": false };
    beforeEach(() => {
        let property: Property = { type: 'expression', value: '{{anInterpolationToResolve}}' };
        binding = new InterpolationBinding(property, { 'anInterpolationToResolve': expectedValue, 'anotherVariable': { 'type': 'constant', 'displayValue': 'Another label' } });
    });


    it('should return property.value when getValue is called ', () => {
        expect(binding.getValue()).to.equal(expectedValue)
    });

    it('should throw an error when we call setValue', () => {
        expect(() => {
            binding.setValue('Try to set a value');
        }).to.throw(/Method not implemented/);
    })
});