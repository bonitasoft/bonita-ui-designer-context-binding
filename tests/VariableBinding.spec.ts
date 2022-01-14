import { expect } from "chai";
import { VariableBinding } from "../src/bindingType/VariableBinding";
import { Property } from "../src/ContextBindingType";
import { VariableAccessor } from "../src/VariableAccessor";

describe('variable binding object', () => {
    let binding: VariableBinding;
    let property: Property;
    let context = new Map();

    beforeEach(() => {
        property = { "type": "variable", "value": "uidVariable" };
    });

    it('should return property.value when getValue is called ', () => {
        let model = {'uidVariable':'My custom Label from variable','secondVariable':'123'};

        context.set('uidVariable', new VariableAccessor(model,'uidVariable'));
        context.set('secondVariable', new VariableAccessor(model,'secondVariable'));

        binding = new VariableBinding(property, context);
        let value: any = binding.getValue();

        expect(value).to.equal('My custom Label from variable')
    });


    it('should return property.value when mapped variable is not exist in context ', () => {
        let context = new Map();
        let model = {'firstVariable':'My custom Label from variable','secondVariable':'123'};

        context.set('firstVariable', new VariableAccessor(model,'firstVariable'));
        context.set('secondVariable', new VariableAccessor(model,'secondVariable'));

        binding = new VariableBinding(property, context);

        expect(binding.getValue()).to.equal(undefined)
    });

    it('should return value when property value is not define', () => {
        let context = new Map();
        let model = {'uidVariable':'My custom Label from variable','secondVariable':'123'};
        context.set('uidVariable', new VariableAccessor(model,'uidVariable'));
        property = { "type": "variable", "value": '' };

        binding = new VariableBinding(property, context);

        expect(binding.getValue()).to.equal('');
    });


    it('should update value we call setValue', () => {
        let context = new Map();
        let model = {'uidVariable':'My custom Label from variable','secondVariable':'123'};
        context.set('uidVariable', new VariableAccessor(model,'uidVariable'));
        context.set('secondVariable', new VariableAccessor(model,'secondVariable'));

        binding = new VariableBinding(property, context);
        binding.setValue('I\'m the new value');

        expect(binding.getValue()).to.equal('I\'m the new value');
    });

    it('should not update value when property to update is not define', () => {
        let context = new Map();
        property = { "type": "variable", "value": "badVariable" };
        let model = {'uidVariable':'My custom Label from variable','secondVariable':'123'};
        context.set('uidVariable', new VariableAccessor(model,'uidVariable'));
        context.set('secondVariable', new VariableAccessor(model,'secondVariable'));

        binding = new VariableBinding(property, context);
        binding.setValue('a new value on the worst variable');

        expect(binding.getValue()).to.equal(undefined);
    });

    it('should return value when variable name is a language syntax keyword', () => {
        property = { "type": "variable", "value": "var" };
        let context = new Map();
        let model = {'var':'A final value'};
        context.set('var', new VariableAccessor(model,'var'));
        binding = new VariableBinding(property, context);

        let value: any = binding.getValue();

        expect(value).to.equal('A final value')
    });


    it('should update value when property value referenced a child object in a complex parent', () => {
        property = { "type": "variable", "value": "names[1].name" };
        let model = {'names':JSON.parse('[{"name":"Robert"},{"name":"Walter"}]')};
        let context = new Map();
        context.set('names', new VariableAccessor(model,'names'));

        binding = new VariableBinding(property, context);
        expect(binding.getValue()).to.equal('Walter');

        binding.setValue("Walter2");

        expect(binding.getValue()).to.equal('Walter2');
    });

    it('should get and set property value when value referenced a complex object', () => {
        property = { "type": "variable", "value": "names[1].city[0].name" };
        let context = new Map();
        let model = {'names': JSON.parse('[{"person": [{"name": "Daffy"},{"name": "Donald"}]},' +
                '{"city": [{"name": "Grenoble"},{"name": "Paris"}]}]')};
        context.set('names', new VariableAccessor(model,'names'));
        binding = new VariableBinding(property, context);
        expect(binding.getValue()).to.equal('Grenoble');

        binding.setValue("Lyon");

        expect(binding.getValue()).to.equal('Lyon');
    });

    it('should update value when property value referenced a child object', () => {
        property = { "type": "variable", "value": "names.name" };
        let context = new Map();
        let model = {'names': JSON.parse('{"name":"Robert"}')};
        context.set('names', new VariableAccessor(model,'names'));
        binding = new VariableBinding(property, context);
        expect(binding.getValue()).to.equal('Robert');

        binding.setValue("Robert bis");

        expect(binding.getValue()).to.equal('Robert bis');
    });

});

