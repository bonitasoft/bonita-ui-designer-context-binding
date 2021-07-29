import { expect } from "chai";
import { VariableBinding } from "../src/bindingType/VariableBinding";
import { Property } from "../src/ContextBindingType";
import { VariableAccessor } from "../src/VariableAccessor";
describe('variable binding object', () => {
    let binding: VariableBinding;
    let property: Property;

    beforeEach(() => {
        property = { "type": "variable", "value": "uidVariable" };

    });

    it('should return property.value when getValue is called ', () => {
        let context = new Map();
        context.set('uidVariable', new VariableAccessor('My custom Label from variable'));
        context.set('secondVariable', new VariableAccessor('123'));
        binding = new VariableBinding(property, context);
        let value: any = binding.getValue();
        expect(value).to.equal('My custom Label from variable')
    });


    it('should return property.value when mapped variable is not exist in context ', () => {
        let context = new Map();
        context.set('firstVariable', new VariableAccessor('Mu custom Label from variable'));
        context.set('secondVariable', new VariableAccessor('123'));
        binding = new VariableBinding(property, context);
        expect(binding.getValue()).to.equal(undefined)
    });

    it('should return value when property value is not define', () => {
        let context = new Map();
        context.set('uidVariable', new VariableAccessor('Mu custom Label from variable'));
        property = { "type": "variable", "value": '' };
        binding = new VariableBinding(property, context);
        expect(binding.getValue()).to.equal('');
    });


    it('should update value we call setValue', () => {
        let context = new Map();
        context.set('uidVariable', new VariableAccessor('Mu custom Label from variable'));
        context.set('secondVariable', new VariableAccessor('123'));
        binding = new VariableBinding(property, context);
        binding.setValue('I\'m the new value');
        expect(binding.getValue()).to.equal('I\'m the new value');
    });

    it('should not update value when property to update is not define', () => {
        let context = new Map();
        property = { "type": "variable", "value": "badVariable" };
        context.set('uidVariable', new VariableAccessor('Mu custom Label from variable'));
        context.set('secondVariable', new VariableAccessor('123'));
        binding = new VariableBinding(property, context);
        binding.setValue('a new value on the worst variable');
        expect(binding.getValue()).to.equal(undefined);
    });


});

