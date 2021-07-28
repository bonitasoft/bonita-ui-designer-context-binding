import { Property } from '../ContextBindingType';
import { TwoWayBinding } from './Binding';
import { VariableAccessor } from '../VariableAccessor';

export class VariableBinding extends TwoWayBinding {
    isBound: boolean;
    value: string = '';

    constructor(property: Property, variableAccessors: Map<string, VariableAccessor>) {
        super(property, variableAccessors);
        this.value = property.value;
        this.isBound = !property.value;
    }

    getValue() {
        try {
            return (!this.isBound) ? this.getter() : this.value;
        } catch (e) {
            return undefined;
        }
    }

    setValue(newValue: string): void {
        let variableToUpdate: VariableAccessor | undefined = this.variableAccessors.get(this.value);
        if (variableToUpdate) {
            variableToUpdate.setValue(newValue);
            this.variableAccessors.set(this.value, variableToUpdate);
        }

        // return (!this.isBound) ? this.getter() : (this.value = newValue);
    }

    getter() {
        return this.wrappedEval(`return ${this.property.value}`, this.variableAccessors);
    }
}