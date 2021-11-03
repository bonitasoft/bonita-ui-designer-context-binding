import {VariableAccessor} from './VariableAccessor';
import {UidModelVariable} from './ContextBindingType';
import {ResolverService} from "./resolvers/ResolverService";
import {uidModel} from "./resolvers/resolverType";
import {Resolver} from "./resolvers/Resolver";

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

    fillVariablesResolved() {
        let resolvers: Array<Resolver> = [];

        this.variables.forEach((value: UidModelVariable, name: string) => {
            resolvers.push(this.resolverService.createResolver(this.model, name, value));
        });

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