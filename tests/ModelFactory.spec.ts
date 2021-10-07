import { expect } from "chai";
import { ModelFactory } from '../src/ModelFactory';

describe('modelFactory', () => {
    let modelFactory: ModelFactory;

    beforeEach(() => {
        let variables = new Map();
        variables.set('aVariable', { type: 'constant', value: ['Hello world'], displayValue: 'Hello world', exposed: false });
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

    it('should return a object when accessor try to get value on json variable',()=> {
        let variables = new Map();
        variables.set('bob', { type: 'json', value: ['{"name":"Bob"}'], displayValue: '{"name":"Bob"}', exposed: false });
        modelFactory = new ModelFactory(variables);
        let variableAccessors = modelFactory.createVariableAccessors();
        let jsonVariable = variableAccessors.get('bob')?.getValue();

        expect(typeof jsonVariable).to.equals("object");
        // @ts-ignore
        expect(jsonVariable['name'] ).to.equals('Bob');
    });
});