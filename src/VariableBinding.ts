import { Context, Property } from './UidType';
import { Binding, wrappedEval } from './Binding';

export class VariableBinding extends Binding {
    getter: Function;
    isBound: boolean;
    value: String = '';

    constructor(property: Property, context: Context) {
        super(property, context);
        this.value = property.value;
        this.getter = () => wrappedEval(`return ${property.value}`, context);;
        this.isBound = !property.value;
    }

    getValue() {
        try {
            let a = this.getter(this.context);
            this.logger.debug(`Can not getValue for ${this.property.value}`);
            return (!this.isBound) ? this.getter() : this.value;
        } catch (e) {
            this.logger.debug(`Can not getValue for ${this.property.value} ${e}`);
            return undefined;
        }
    }

    setValue(newValue: string) {
        const variableKey: string = Object.keys(this.context).filter(e => e == this.property.value)[0];
        this.context[variableKey] = newValue;

        return (!this.isBound) ? this.getter() : (this.value = newValue);
    }
}