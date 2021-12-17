import {VariableAccessor} from './VariableAccessor';
import {UidModelVariable} from './ContextBindingType';
import {ResolverService} from "./resolvers/ResolverService";
import {UidModel} from "./resolvers/resolverType";
import {Resolver} from "./resolvers/Resolver";

export class ModelFactory {
    variables: Map<string, UidModelVariable>;
    public model: UidModel;
    resolverService: ResolverService;
    variableAccessors: Map<string, VariableAccessor>;
    resolvers: Array<Resolver> = [];

    constructor(variables: Map<string, UidModelVariable>) {
        this.variables = variables;
        this.model = {};
        this.resolverService = new ResolverService();
        this.fillVariablesResolved();
        this.variableAccessors = new Map();
    }

    fillVariablesResolved() {


        this.variables.forEach((value: UidModelVariable, name: string) => {
            this.resolvers.push(this.resolverService.createResolver(this.model, name, value));
        });

        Promise.all(this.resolvers
            .filter(resolver => !resolver.hasDependencies())
            .map(resolver => Promise.resolve(resolver.resolve())))
            .finally(() => this.resolvers.forEach((resolver) => resolver.watchDependencies()));
    }

    createVariableAccessors() {
        this.variables.forEach((value: UidModelVariable, variableName: string) => {
            // @ts-ignore
            this.variableAccessors.set(variableName, new VariableAccessor(this.model, variableName, value.displayValue));
        });
        return this.variableAccessors;
    }

};