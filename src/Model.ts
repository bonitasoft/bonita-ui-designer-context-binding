import { UidModelVariable } from './ContextBindingType';
import { ModelFactory } from './ModelFactory';
import { ModelAccessor } from './ModelAccessor';

export class Model {
    variableAccessors: Map<string, ModelAccessor>;

    constructor() {
        this.variableAccessors = new Map();
    }

    fillVariableAccessors(uidVariables: Map<string, UidModelVariable>) {
        let modelFactory = new ModelFactory(uidVariables);
        this.variableAccessors = modelFactory.createVariableAccessors();
    }
}