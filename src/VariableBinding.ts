import { Property, UidVariable } from './ContextBindingType';
import { Binding } from './Binding';

export class VariableBinding extends Binding {
    isBound: boolean;
    value: string = '';

    constructor(property: Property, context: Map<string, UidVariable>) {
        super(property, context);
        this.value = property.value;
        this.isBound = !property.value;
    }

    getValue() {
        try {
            return (!this.isBound) ? this.getter() : this.value;
        } catch (e) {
            // this.logger.debug(`Cannot getValue for ${this.property.value} ${e}`);
            return undefined;
        }
    }

    setValue(newValue: string): void {
        let variableToUpdate: UidVariable | undefined = this.context.get(this.value);
        if (variableToUpdate) {
            variableToUpdate.displayValue = newValue;
            this.context.set(this.value, variableToUpdate);
        }

        // return (!this.isBound) ? this.getter() : (this.value = newValue);
    }

    getter() {
        return this.wrappedEval(`return ${this.property.value}`, this.context)[this.value];
    }
}