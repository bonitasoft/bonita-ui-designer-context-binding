import { Property, VariableContext } from '../ContextBindingType';
import { VariableAccessor } from '../VariableAccessor';
import evaluate from 'ts-expression-evaluator';

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
        // Allow to declare variable with synthax keywork (var/while/private...)
        if (contextObject.hasOwnProperty(expressionToEvaluate)) {
            return contextObject[expressionToEvaluate];
        }
        try {
            return evaluate(expressionToEvaluate, contextObject);
        } catch (e) {
            return expressionToEvaluate;
        }

    }
}

export abstract class TwoWayBinding extends OneWayBinding {
    abstract setValue(newValue: string): void;
}