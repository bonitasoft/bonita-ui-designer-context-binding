import {ModelFactory} from '../src/ModelFactory';
import {expect} from "chai";

describe('modelFactory initialization', () => {
    let modelFactory: ModelFactory;
    beforeEach(() => {
        let variables = new Map();
        variables.set('aVariable', {
            type: 'constant',
            value: ['Hello world'],
            displayValue: 'Hello world',
            exposed: false
        });
        variables.set('names', {
            type: 'json', value: [
                "[",
                "    {\"name\":\"Walter\"},",
                "    {\"name\":\"April\"},",
                "    {\"name\":\"Mauro\"}",
                "]"
            ], displayValue: '[\n' +
                '    {"name":"Walter"},\n' +
                '    {"name":"April"},\n' +
                '    {"name":"Mauro"}\n' +
                ']', exposed: false
        });
        variables.set('city', {
            type: 'json', value: [
                "[",
                "    {\"name\":\"Grenoble\"},",
                "    {\"name\":\"Paris\"},",
                "    {\"name\":\"Lyon\"}",
                "]"
            ], displayValue: '[\n' +
                '    {"name":"Grenoble"},\n' +
                '    {"name":"Lyon"},\n' +
                '    {"name":"Paris"}\n' +
                ']', exposed: false
        });
        modelFactory = new ModelFactory(variables);
    });

    it('should fill model when modelFactory is initialised with some variable', () => {
        expect(modelFactory.model.names[0]).to.eql({name: 'Walter'});
        expect(modelFactory.model.city[0]).to.eql({name: "Grenoble"});
    });

    it('should keep model empty when variables is empty', async () => {
        let emptyModelFactory = new ModelFactory(new Map())

        expect( () => new ModelFactory(new Map())).to.not.throw();
        expect(emptyModelFactory.model).to.eql({});
    });

    it('should throw error when a unknown variable type is defined', async () => {
        let variables = new Map();
        variables.set('unknownVariable', {
            type: 'api',
            value: ['https://www.url.com'],
            displayValue: 'https://www.url.com',
            exposed: false
        });

        expect( () => new ModelFactory(variables)).to.throw(Error);


    });

});

describe('modelFactory createVariableAccessors', () => {
    let modelFactory: ModelFactory;

    beforeEach(() => {
        let variables = new Map();
        variables.set('aVariable', {
            type: 'constant',
            value: ['Hello world'],
            displayValue: 'Hello world',
            exposed: false
        });
        modelFactory = new ModelFactory(variables);
    });

    it('should return the display value of variable when variableAccessor is created', () => {
        let variableAccessors = modelFactory.createVariableAccessors();

        expect(variableAccessors.get('aVariable')?.getValue()).to.equals('Hello world');
    });

    it('should return undefined when variable key is not exist', () => {
        let variableAccessors = modelFactory.createVariableAccessors();

        expect(variableAccessors.get('notExistVariableKey')).to.equals(undefined);
    });

    it('should return a object when accessor try to get value on json variable', () => {
        let variables = new Map();
        variables.set('bob', {type: 'json', value: ['{"name":"Bob"}'], displayValue: '{"name":"Bob"}', exposed: false});
        modelFactory = new ModelFactory(variables);
        let variableAccessors = modelFactory.createVariableAccessors();
        let jsonVariable = variableAccessors.get('bob')?.getValue();

        expect(typeof jsonVariable).to.equals("object");
        // @ts-ignore
        expect(jsonVariable['name']).to.equals('Bob');
    });
});

