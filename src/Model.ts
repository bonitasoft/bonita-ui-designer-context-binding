import { UidModelVariable } from './ContextBindingType';
import { ModelFactory } from './ModelFactory';
import { VariableAccessor } from './VariableAccessor';

export class Model {
    private _variableAccessors: Map<string, VariableAccessor>;

    constructor() {
        this._variableAccessors = new Map();
    }

    fillVariableAccessors(uidVariables: Map<string, UidModelVariable>) {
        let modelFactory = new ModelFactory(uidVariables);
        this._variableAccessors = modelFactory.createVariableAccessors();
    }

    public getVariableAccessors(): Map<string, VariableAccessor> {
        return this._variableAccessors;
    }
}