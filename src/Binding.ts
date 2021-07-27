import { UidVariable, Property } from './ContextBindingType';

export abstract class BindingReadOnly {
    property: Property;
    context: Map<string, UidVariable>;

    constructor(property: Property, context: Map<string, UidVariable>) {
        this.property = property;
        this.context = context;
    }

    abstract getValue(): string | undefined;


    /**
     * Evaluate a js expression with context
     * @param expressionToEvaluate
     * @param contextData Equivalent of scope
     * @returns String | undefined if expression throw an error
     */
    wrappedEval(expressionToEvaluate: string, contextData: any) {
        let contextObject: any = {};
        this.context.forEach((value, key) => (contextObject[key] = value));
        try {
            return (new Function(`with(this) { ${expressionToEvaluate} }`)).call(contextObject);
        } catch (e) {
            return undefined;
        }
    }
}

export abstract class Binding extends BindingReadOnly {
    abstract setValue(newValue: string): void;
}

export enum enumBinding {
    Constant = "constant",
    Interpolation = "interpolation",
    Variable = "variable",
    Expression = "expression"
}
