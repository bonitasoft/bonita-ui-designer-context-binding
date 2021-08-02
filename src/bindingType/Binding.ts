import { Property, VariableContext } from '../ContextBindingType';
import { VariableAccessor } from '../VariableAccessor';

export abstract class OneWayBinding {
    property: Property;
    variableAccessors: Map<string, VariableAccessor>;

    constructor(property: Property, context: Map<string, VariableAccessor>) {
        this.property = property;
        this.variableAccessors = context;
    }

    abstract getValue(): string;


    /**
     * Evaluate a js expression with context
     * @param expressionToEvaluate     
     * @returns String | undefined if expression throw an error
     */
    wrappedEval(expressionToEvaluate: string) {
        let contextObject: VariableContext = {};
        this.variableAccessors.forEach((value, key) => (contextObject[key] = value.getValue()));
        try {
            return (new Function(`with(this) { ${expressionToEvaluate} }`)).call(contextObject);
        } catch (e) {
            return undefined;
        }
    }
}

export abstract class TwoWayBinding extends OneWayBinding {
    abstract setValue(newValue: string): void;
}


