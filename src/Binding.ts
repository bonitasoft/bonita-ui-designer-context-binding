import { Context, Property } from './UidType';
import { Logger } from "tslog";

export class Binding {
    property: Property;
    context: Context;
    logger: Logger;

    constructor(property: Property, context: Context) {
        this.logger = new Logger({ name: "Bidning" });
        this.property = property;
        this.context = context;
    }

    setValue(value: string): void {
        throw new Error("Method not implemented.");
    }
    getValue(): string | undefined {
        throw new Error("Method not implemented.");
    }
}

export class ConstantBinding extends Binding {
    getValue(): string {
        return this.property.value;
    }
}

export enum enumBinding {
    constant = "constant",
    interpolation = "interpolation",
    variable = "variable",
    expression = "expression"
}

/**
 * Evaluate a js expression with context
 * @param expressionToEvaluate 
 * @param contextData Equivalent of scope
 * @returns String | undefined if expression throw an error
 */
export function wrappedEval(expressionToEvaluate: string, contextData: any) {
    try {
        return (new Function(`with(this) { ${expressionToEvaluate} }`)).call(contextData);
    } catch (e) {
        return undefined;
    }
}