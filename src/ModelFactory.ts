import {VariableAccessor} from './VariableAccessor';
import {UidModelVariable} from './ContextBindingType';
import {ResolverService} from "./resolvers/ResolverService";
import {UidModel} from "./resolvers/resolverType";
import {Resolver} from "./resolvers/Resolver";
import onChange from 'on-change';

export class ModelFactory {
    variables: Map<string, UidModelVariable>;
    public model: UidModel;
    resolverService: ResolverService;
    variableAccessors: Map<string, VariableAccessor>;
    resolvers: Array<Resolver> = [];

    constructor(variables: Map<string, UidModelVariable>) {
        this.variables = variables;
        this.resolverService = new ResolverService();
        this.model = onChange({},  (path,value:any) => this.resolveSpecificDependencies(path));
        this.initResolvers();
        this.resolveDependencies();
        this.variableAccessors = new Map();
    }

    initResolvers() {
        this.variables.forEach((value: UidModelVariable, name: string) => {
            this.resolvers.push(this.resolverService.createResolver(this.model, name, value));
        });
    }

    resolveSpecificDependencies(path:string){
        Promise.all(this.resolvers
            .filter(resolver => resolver.dependencies.some((dependency) => dependency.includes(path)))
            .map(resolver => Promise.resolve(resolver.resolve())));
    }

    resolveDependencies(){
        Promise.all(this.resolvers
            .filter(resolver => !resolver.hasDependencies())
            .map(resolver => Promise.resolve(resolver.resolve())));
    }

    createVariableAccessors() {
        this.variables.forEach((value: UidModelVariable, variableName: string) => {
            // @ts-ignore
            this.variableAccessors.set(variableName, new VariableAccessor(this.model, variableName, value.displayValue));
        });
        return this.variableAccessors;
    }
};