import { expect } from "chai";
import { Binding } from "../src/Binding";
import { Property } from "../src/UidType";

describe('binding parent object', () => {
    let binding: Binding;

    beforeEach(() => {
        let property: Property = { type: "variable", value: "value" };
        binding = new Binding(property, {});
    });

    it('should throw an error when we call getVlue on this class', () => {
        expect(() => {
            binding.getValue();
        }).to.throw(/Method not implemented/);
    });

    it('should throw an error when we call setValue', () => {
        expect(() => {
            binding.setValue('Try to set a value');
        }).to.throw(/Method not implemented/);
    })
});