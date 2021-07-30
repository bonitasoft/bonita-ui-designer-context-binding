import { Property } from '../ContextBindingType';
import { OneWayBinding } from './Binding';
import { VariableAccessor } from '../VariableAccessor';

export class ExpressionBinding extends OneWayBinding {
    currentValue: string = '';

    constructor(property: Property, variableAccessors: Map<string, VariableAccessor>) {
        super(property, variableAccessors);
    }

    getValue() {
        let newValue = '';
        if (this.property.value) {
            newValue = this.wrappedEval(`return ${this.property.value}`, this.variableAccessors);
        }
        if (!Object.is(this.currentValue, newValue)) {
            this.currentValue = newValue;
        }
        return this.currentValue;
    }
}
