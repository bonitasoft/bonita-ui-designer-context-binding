import { expect } from "chai";
import { ConstantBinding } from "../src/bindingType/ConstantBinding";
import { Property } from "../src/ContextBindingType";

describe('constant binding object', () => {
    let binding: ConstantBinding;

    beforeEach(() => {
        let property: Property = { type: 'constant', value: 'I\'m a constant value' };
        binding = new ConstantBinding(property, new Map());
    });

    it('should return property.value when getValue is called ', () => {
        expect(binding.getValue()).to.equal('I\'m a constant value')
    });
});