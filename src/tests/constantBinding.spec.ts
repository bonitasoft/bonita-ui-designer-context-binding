import { expect } from "chai";
import { ConstantBinding } from "../../index";
import { Property } from "../UidType";

describe('constant binding object', () => {
    let binding: ConstantBinding;

    beforeEach(() => {
        let property: Property = { type: 'constant', value: 'I\'m a constant value' };
        binding = new ConstantBinding(property, {});
    });

    it('should return property.value when getValue is called ', () => {
        expect(binding.getValue()).to.equal('I\'m a constant value')
    });

    it('should throw an error when we call setValue', () => {
        expect(() => {
            binding.setValue('Try to set a value');
        }).to.throw(/Method not implemented/);
    })
});