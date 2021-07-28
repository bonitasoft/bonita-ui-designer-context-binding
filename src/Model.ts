import { UidModelVariable } from './ContextBindingType';
import { ModelFactory } from './ModelFactory';
import { VariableAccessor } from './VariableAccessor';

export class Model {
    private readonly variableAccessors;


    constructor(uidVariables: Map<string, UidModelVariable>) {
        let modelFactory = new ModelFactory(uidVariables);
        this.variableAccessors = modelFactory.createVariableAccessors();
    }

    public getVariableAccessors(): Map<string, VariableAccessor> {
        return this.variableAccessors;
    }
}