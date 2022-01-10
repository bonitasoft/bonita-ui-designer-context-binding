import {Property} from '../ContextBindingType';
import {BindingVariableAccessor, TwoWayBinding} from './Binding';
import {VariableAccessor} from '../VariableAccessor';
import {get, set} from 'lodash';

export class VariableBinding extends TwoWayBinding {
    isBound: boolean;
    value: string = '';
    variableAccessorsName: string;
    variableAccessorsProperty: string;
    variableAccessor: VariableAccessor | undefined;

    constructor(property: Property, variableAccessors: Map<string, VariableAccessor>) {
        super(property, variableAccessors);
        this.value = property.value ?? '';
        this.isBound = !property.value;

        let bindingVariableAccessor: BindingVariableAccessor = this.splitComplexVariableInArray(this.value);
        this.variableAccessorsName = bindingVariableAccessor.variableAccessorsName ?? this.value;
        this.variableAccessorsProperty = bindingVariableAccessor.variableAccessorsProperty;
        this.variableAccessor = this.variableAccessors.get(this.variableAccessorsName);
    }

    getValue() {
        return (!this.isBound) ? this.getter() : this.value;
    }

    setValue(newValue: string): void {
        let variableValue: any = this.variableAccessor?.value;
        if (this.variableAccessor) {
            if (variableValue && typeof variableValue === 'object' && this.variableAccessorsProperty) {
                set(variableValue, this.variableAccessorsProperty, newValue);
            } else {
                this.variableAccessor.value = newValue;
            }
        }
    }

    getter() {
        if (this.variableAccessorsProperty) {
            return get(this.variableAccessor?.value, this.variableAccessorsProperty);
        } else {
            return this.variableAccessor?.value;
        }
    }
}