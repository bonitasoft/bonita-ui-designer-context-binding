import { expect } from "chai";
import { VariableBinding } from "../src/Binding";
import { Property } from "../src/UidType";
describe('variable binding object', () => {
    let binding: VariableBinding;
    let expectedValue: any = { "type": "constant", "value": ["My Default Label"], "displayValue": "My Default Label", "exposed": false };
    beforeEach(() => {
        let property: Property = { type: 'expression', value: '{{anInterpolationToResolve}}' };
        binding = new VariableBinding(property, { 'anInterpolationToResolve': expectedValue, 'anotherVariable': { 'type': 'constant', 'displayValue': 'Another label' } });
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

