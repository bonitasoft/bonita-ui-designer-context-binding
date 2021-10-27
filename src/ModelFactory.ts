import {VariableAccessor} from './VariableAccessor';
import {UidModelVariable} from './ContextBindingType';
import {ResolverService} from "./resolvers/ResolverService";
import {uidModel} from "./resolvers/resolverType";


export class ModelFactory {
    variables: Map<string, UidModelVariable>;
    model: uidModel;
    resolverService: ResolverService;

    constructor(variables: Map<string, UidModelVariable>) {
        this.variables = variables;
        this.model = {};
        this.resolverService = new ResolverService();
        this.fillVariablesResolved();
    }

    private fillVariablesResolved() {
        this.variables.forEach((value: UidModelVariable, name: string) => {
            this.resolverService.createResolver(this.model, name, value)
        });

        let resolvers = Array.from(this.resolverService.resolvers.values());
        Promise.all(resolvers
            .filter(resolver => !resolver.hasDependencies())
            .map(resolver => Promise.resolve(resolver.resolve())))
            .finally(() => resolvers.forEach((resolver) => resolver.watchDependencies()));
    }

    createVariableAccessors() {
        let variableAccessors: Map<string, VariableAccessor> = new Map();
        this.variables.forEach((value: UidModelVariable, variableName: string) => {
            variableAccessors.set(variableName, new VariableAccessor(this.model[variableName]));
        });
        return variableAccessors;
    }

};