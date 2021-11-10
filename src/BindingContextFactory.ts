import {VariableAccessor} from "./VariableAccessor";
import {SpecificVariablesScope} from "./ContextBindingType";

export class BindingContextFactory {

    expand(variableAccessors: Map<string,VariableAccessor>) {
        return {
            'with': function (name: string, value: any) {
                variableAccessors.set(name, new VariableAccessor(value));
                return this;
            }
        }
    };

    addSpecificKeywordOnAccessors(variableAccessors: Map<string, VariableAccessor>, scope: SpecificVariablesScope) {
        this.expand(variableAccessors)
            .with('$item', (scope.collection && scope.index != undefined) ? scope.collection[scope.index] : undefined)
            .with('$collection', scope.collection)
            .with('$index',scope.index)
            .with('$count',scope.count);
        return variableAccessors;
    }
}
