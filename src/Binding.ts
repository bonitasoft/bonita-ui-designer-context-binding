import { UidVariable, Property } from './ContextBindingType';
import { Logger } from "tslog";

export abstract class BindingReadOnly {
    property: Property;
    context: Map<string, UidVariable>;
    logger: Logger;

    constructor(property: Property, context: Map<string, UidVariable>) {
        this.logger = new Logger({ name: "Binding" });
        this.property = property;
        this.context = context;
    }

    abstract getValue(): string | undefined;

    wrappedEval(expressionToEvaluate: string, contextData: any) {
        let a: any = {};
        this.context.forEach((value, key) => (a[key] = value));
        try {
            return (new Function(`with(this) { ${expressionToEvaluate} }`)).call(a);
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

/**
 * Evaluate a js expression with context
 * @param expressionToEvaluate
 * @param contextData Equivalent of scope
 * @returns String | undefined if expression throw an error
 */