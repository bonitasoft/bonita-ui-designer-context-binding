import { expect } from "chai";
import { Property } from "../src/ContextBindingType";
import { InterpolationBinding } from "../src/bindingType/InterpolationBinding";
import { VariableAccessor } from "../src/VariableAccessor";

describe('interpolation binding object', () => {
    let binding: InterpolationBinding;

    beforeEach(() => {
        let property: Property = { type: 'interpolation', value: 'My Default Label' };
        let context = new Map();
        context.set('anInterpolationToResolve', new VariableAccessor('My Default Label'));
        context.set('anotherVariable', new VariableAccessor('Another label'));

        binding = new InterpolationBinding(property, context);
    });


    it('should return property.value when getValue is called ', () => {
        expect(binding.getValue()).to.equal('My Default Label')
    });

    it('should interpolate value when value contains only one {{variable}} syntax', () => {
        let property: Property = { type: 'interpolation', value: 'My label {{anInterpolationToResolve}}' };
        let context = new Map();
        context.set('anInterpolationToResolve', new VariableAccessor('is custom by interpolation'));
        context.set('anotherVariable', new VariableAccessor('Another label'));

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal('My label is custom by interpolation')
    });

    it('should interpolate value when value contains more than one {{variable}} syntax', () => {
        let property: Property = { type: 'interpolation', value: '{{anLabel}} {{anInterpolationToResolve}}' };
        let context = new Map();
        context.set('anInterpolationToResolve', new VariableAccessor('is custom by interpolation'));
        context.set('anLabel', new VariableAccessor('Another label'));

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal('Another label is custom by interpolation')
    });

    it('should return empty when variable in expression is not set in context', () => {
        let property: Property = { type: 'interpolation', value: '{{anMissingLabel}} Label' };
        let context = new Map();
        context.set('anLabel', new VariableAccessor('My default'));

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal(' Label');
    });

    it('should return empty string when property value is not defined', () => {
        let property: Property = { type: 'interpolation', value: null };
        let context = new Map();

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal('')
    });

    it('should interpolate value when value is a json variable', () => {
        let property: Property = { type: 'interpolation', value: '{{myJsonVariable[0]}}'};
        let context = new Map();
        context.set('myJsonVariable', new VariableAccessor(JSON.parse('[{"name":"Robert"},{"name":"Walter"}]')));

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal('{"name":"Robert"}');

        property = { type: 'interpolation', value: '{{myJsonVariable[1].name}}'};
        binding = new InterpolationBinding(property, context);

        expect(binding.getValue()).to.equal("Walter");
    });

    it('should interpolate javascript expression when a js expression is given', () => {
        let property: Property = { type: 'interpolation', value: '{{2 + 2}}'};

        binding = new InterpolationBinding(property, new Map());
        expect(binding.getValue()).to.equal('4');
    });

});