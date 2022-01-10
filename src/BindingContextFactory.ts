import {VariableAccessor} from "./VariableAccessor";
import {SpecificVariablesScope} from "./ContextBindingType";
import {ModelFactory} from "./ModelFactory";
import {set} from 'lodash';

export class BindingContextFactory {
    private modelFactory: ModelFactory;

    constructor(_modelFactory: ModelFactory ) {
        this.modelFactory = _modelFactory;
    }

    expand(variableAccessors: Map<string, VariableAccessor>) {
        let modelByInstance = Object.assign( {}, this.modelFactory.getModel() || {});
        return {
            'with': function (name: string, value: any) {
                set(modelByInstance, name, value);
                variableAccessors.set(name, new VariableAccessor(modelByInstance,name, value));
                return this;
            }
        }
    }

    addSpecificKeywordOnAccessors(scope: SpecificVariablesScope) {
        let variableAccessors = new Map(this.modelFactory.getVariableAccessors());
        this.expand(variableAccessors)
            .with('$item', (scope.collection && scope.index != undefined) ? scope.collection[scope.index] : undefined)
            .with('$collection', scope.collection)
            .with('$index', scope.index)
            .with('$count', scope.count);
        return variableAccessors;
    }
}
