import { Context, Property } from './UidType';

export class Binding {
    property: Property;
    context: Context;

    constructor(property: Property, context: Context) {
        this.property = property;
        this.context = context;
    }

    setValue(value: string): void {
        throw new Error("Method not implemented.");
    }
    getValue(): string {
        throw new Error("Method not implemented.");
    }
}

export class ConstantBinding extends Binding {
    getValue(): string {
        return this.property.value;
    }
}

export class ExpressionBinding extends Binding {
    getter: Function;
    currentValue: string = '';

    constructor(property: Property, context: Context) {
        super(property, context);
        this.getter = () => wrappedEval(`return ${property.value}`, context);
    }

    getValue() {
        const newValue = this.getter(this.context, this.property.value);
        if (!Object.is(this.currentValue, newValue)) {
            this.currentValue = newValue;
        }
        return this.currentValue;
    }
}

//TODO BP: Use translation mecanisme here
export class InterpolationBinding extends Binding {

    constructor(property: Property, context: Context) {
        super(property, context);
    }

    getValue() {
        console.warn('To be implemented - InterpolationBinding is not ready to production');
        //Todo: make possible to use | from angular (ex: | uppercase, | date ...)
        // return gettextCatalog.getString(this.property.value || '', this.context);

        let finalValue = this.property.value;
        // Match in value each {{ variable }} to replace it by real value


        let arrStr = this.property.value.match(/({{.*?}})/gs) || [];
        arrStr.forEach(match => {
            let varName = match.slice(2, match.length - 2);
            finalValue = this.property.value.replace(match, this.context[varName].displayValue);
        });

        return finalValue;
    }
}


export class VariableBinding extends Binding {
    getter: Function;
    isBound: boolean;
    value: String = '';

    constructor(property: Property, context: Context) {
        super(property, context);
        this.value = property.value;
        this.getter = () => wrappedEval(eval('return ${`' + property.value + '}`'), context);
        this.isBound = !property.value;
    }

    getValue() {
        return (!this.isBound) ? this.getter(this.context) : this.value;
    }

    setValue(newValue: string) {
        const variableKey: string = Object.keys(this.context).filter(e => e == this.property.value)[0];
        this.context[variableKey] = newValue;

        return (!this.isBound) ? this.getter(this.context) : (this.value = newValue);
    }
}

export enum enumBinding {
    constant = "constant",
    interpolation = "interpolation",
    variable = "variable",
    expression = "expression"
}


function wrappedEval(expressionToEvaluate: string, contextData: any) {
    // return (new Function(...Object.keys(contextData), expressionToEvaluate))(...Object.values(contextData));
    return (new Function(`with(this) { ${expressionToEvaluate} }`)).call(contextData);
}