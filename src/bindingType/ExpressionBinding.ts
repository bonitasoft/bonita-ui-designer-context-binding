import { Property } from '../ContextBindingType';
import { OneWayBinding } from './Binding';
import { ModelAccessor } from '../ModelAccessor';

export class ExpressionBinding extends OneWayBinding {
    currentValue: string = '';

    constructor(property: Property, variableAccessors: Map<string, ModelAccessor>) {
        super(property, variableAccessors);
    }

    getValue() {
        let newValue = '';
        if (this.property.value) {
            newValue = this.wrappedEval(`${this.property.value}`);
        }
        if (!Object.is(this.currentValue, newValue)) {
            this.currentValue = newValue;
        }
        return this.currentValue;
    }
}
