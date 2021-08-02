import { VariableAccessor } from './VariableAccessor';
import { Variables, UidModelVariable } from './ContextBindingType';


export class ModelFactory {
    variables: Map<string, UidModelVariable>;

    constructor(variables: Map<string, UidModelVariable>) {
        this.variables = variables;
    }

    //TODO: use ResolverService here
    //create(variable: Variables) {    
    // ResolverService.createResolver(model, name,data[name]));
    // And remove .displayValue plus bas        
    //const resolvers = Object.keys(variable).map((name: string) => { });
    //}

    createVariableAccessors() {
        let variableAccessors: Map<string, VariableAccessor> = new Map();
        this.variables.forEach((value: UidModelVariable, variableName: string) => {
            variableAccessors.set(variableName, new VariableAccessor(value.displayValue));
        });
        return variableAccessors;
    }

};