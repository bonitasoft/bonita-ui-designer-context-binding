import {Property, VariableContext} from '../ContextBindingType';
import {VariableAccessor} from '../VariableAccessor';
import evaluate from 'ts-expression-evaluator';


export abstract class OneWayBinding {
    protected readonly eachVariableBetweenDoubleBracket = /{{2}([^}{2}]+)}{2}/g;
    protected readonly slitComplexVariablePattern = /(\$?\w+)\.?(.*)/;

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
        // Allow to declare variable with syntax keyword (var/while/private...)
        if (contextObject.hasOwnProperty(expressionToEvaluate)) {
            return contextObject[expressionToEvaluate];
        }
        try {
            return evaluate(expressionToEvaluate, contextObject);
        } catch (e) {
            return expressionToEvaluate;
        }

    }

    /**
     *
     * @param value
     * @return an array or null with:
     *  array[0] the complete match
     *      ex: names[0].name
     *  array[1] the uid variable name
     *      ex: names
     *  array[2] the accessor on this variable ex:
     *      [0].name
     */
    splitComplexVariableInArray(value: string): Array<string> | null {
        return new RegExp(this.slitComplexVariablePattern, "g").exec(value);
    }



}

export abstract class TwoWayBinding extends OneWayBinding {
    abstract setValue(newValue: string): void;
}