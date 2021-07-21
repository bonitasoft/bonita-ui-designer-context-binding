import { Context, Property } from './UidType';
import { Binding, wrappedEval } from './Binding';


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
