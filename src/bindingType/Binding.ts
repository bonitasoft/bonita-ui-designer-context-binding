import {Property, VariableContext} from '../ContextBindingType';
import {VariableAccessor} from '../VariableAccessor';
import evaluate from 'ts-expression-evaluator';

export abstract class OneWayBinding {
    protected readonly eachVariableBetweenDoubleBracket = /{{2}([^}]+)}{2}/g;
    protected readonly splitComplexVariablePattern = /(\$?\w+)\.?(.*)/;

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

    splitComplexVariableInArray(value: string): BindingVariableAccessor {
        return new BindingVariableAccessor(new RegExp(this.splitComplexVariablePattern, "g").exec(value) || []);
    }
}

export abstract class TwoWayBinding extends OneWayBinding {
    abstract setValue(newValue: string): void;
}

export class BindingVariableAccessor {
    variableAccessorsName:string;
    variableAccessorsProperty:string;
    constructor(input: Array<string>) {
        this.variableAccessorsName= input[1] ? input[1] : '';
        this.variableAccessorsProperty = input[2] ? input[2] : '';
    }
}
