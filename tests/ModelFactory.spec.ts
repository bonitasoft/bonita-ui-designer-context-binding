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

        expect(variableAccessors.get('aVariable')?.value).to.equals('Hello world');
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
        let jsonVariable : any = variableAccessors.get('bob')?.value;

        expect(typeof jsonVariable).to.equals("object");
        expect(jsonVariable.name).to.equals('Bob');
    });

    it('should trigger resolve dependencies when a variable with dependencies is updated', () => {
        let variables = new Map();
        variables.set('dinoList', {
            type: 'expression',
            value: ['return [{"name": "Denver", "carnivorous" : "true"},{"name": "Diplodocus", "carnivorous" : "false"}]'],
            displayValue: 'return [{"name": "Denver", "carnivorous" : "true"},{"name": "Diplodocus", "carnivorous" : "false"}]',
            exposed: false
        });
        variables.set('getAllCarnivorous', {
            type: 'expression',
            value: ['return $data.dinoList.filter(dino => dino.carnivorous === "true")'],
            displayValue: 'return $data.dinoList.filter(dino => dino.carnivorous === "true")',
            exposed: false
        });

        variables.set('giveMeAll', {
            type: 'expression',
            value: ['return $data.dinoList'],
            displayValue: 'return $data.dinoList',
            exposed: false
        });

        modelFactory = new ModelFactory(variables);
        let variableAccessors = modelFactory.createVariableAccessors();
        let model = modelFactory.getModel();

        model.dinoList[1].carnivorous= 'true';

        expect(variableAccessors.get('giveMeAll')?.value.length).to.equals(2);
        expect(variableAccessors.get('getAllCarnivorous')?.value.length).to.equals(2);

        model.dinoList.push({"name": "T-Rex", "carnivorous" : "true"});

        expect(variableAccessors.get('giveMeAll')?.value.length).to.equals(3);
        expect(variableAccessors.get('getAllCarnivorous')?.value.length).to.equals(3);
    });

    it('with String value', () => {
        let variables = new Map();
        variables.set('a', {
            type: 'expression',
            value: ['return "hello"'],
            displayValue: 'return "hello"',
            exposed: false
        });
        variables.set('b', {
            type: 'expression',
            value: ['return $data.a + " world"'],
            displayValue: 'return $data.a.concat(" world")',
            exposed: false
        });

        modelFactory = new ModelFactory(variables);
        let variableAccessors = modelFactory.createVariableAccessors();
        let model = modelFactory.getModel();
        model.a = "salut";

        expect(variableAccessors.get('a')?.value).to.equals("salut");
        expect(variableAccessors.get('b')?.value).to.equals("salut world");

    });
});

