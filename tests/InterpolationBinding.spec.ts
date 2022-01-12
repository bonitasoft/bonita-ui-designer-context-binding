import { expect } from "chai";
import { Property } from "../src/ContextBindingType";
import { InterpolationBinding } from "../src/bindingType/InterpolationBinding";
import { ModelAccessor } from "../src/ModelAccessor";

describe('interpolation binding object', () => {
    let binding: InterpolationBinding;
    let context = new Map();
    beforeEach(() => {
        let property: Property = { type: 'interpolation', value: 'My Default Label' };

        let model = {'anInterpolationToResolve':'My Default Label','anotherVariable':'Another label'};
        context.set('anInterpolationToResolve', new ModelAccessor(model,'anInterpolationToResolve'));
        context.set('anotherVariable', new ModelAccessor(model,'anotherVariable'));

        binding = new InterpolationBinding(property, context);
    });


    it('should return property.value when getValue is called ', () => {
        expect(binding.getValue()).to.equal('My Default Label')
    });

    it('should interpolate value when value contains only one {{variable}} syntax', () => {
        let property: Property = { type: 'interpolation', value: 'My label {{anInterpolationToResolve}}' };
        let model = {'anInterpolationToResolve':'is custom by interpolation','anotherVariable':'Another label'};
        context.set('anInterpolationToResolve', new ModelAccessor(model,'anInterpolationToResolve'));
        context.set('anotherVariable', new ModelAccessor(model,'anotherVariable'));

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal('My label is custom by interpolation')
    });

    it('should interpolate value when value contains more than one {{variable}} syntax', () => {
        let property: Property = { type: 'interpolation', value: '{{anLabel}} {{anInterpolationToResolve}}' };
        let model = {'anInterpolationToResolve':'is custom by interpolation','anLabel':'Another label'};
        context.set('anInterpolationToResolve', new ModelAccessor(model,'anInterpolationToResolve'));
        context.set('anLabel', new ModelAccessor(model,'anLabel'));

        binding = new InterpolationBinding(property, context);

        expect(binding.getValue()).to.equal('Another label is custom by interpolation')
    });

    it('should return empty when variable in expression is not set in context', () => {
        let property: Property = { type: 'interpolation', value: '{{anMissingLabel}} Label' };
        let context = new Map();
        let model = {'anLabel':'My default'};
        context.set('anLabel', new ModelAccessor(model,'anLabel'));

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal(' Label');
    });

    it('should return "0" when variable value is equals to 0', () => {
        let property: Property = { type: 'interpolation', value: '{{$index}}' };
        let context = new Map();
        let model = {'$index':0}
        context.set('$index', new ModelAccessor(model,'$index'));

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal("0");
    });

    it('should return empty string when property value is not defined', () => {
        let property: Property = { type: 'interpolation', value: null };
        let context = new Map();

        binding = new InterpolationBinding(property, context);
        expect(binding.getValue()).to.equal('')
    });

    it('should interpolate value when value is a json variable', () => {
        let property: Property = { type: 'interpolation', value: '{{myJsonVariable[0]}}'};
        let model= {'myJsonVariable':JSON.parse('[{"name":"Robert"},{"name":"Walter"}]')};
        context.set('myJsonVariable', new ModelAccessor(model,'myJsonVariable'));

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