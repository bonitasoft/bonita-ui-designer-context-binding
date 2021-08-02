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
});