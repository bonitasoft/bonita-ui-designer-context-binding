import { UidVariable, Property } from './ContextBindingType';
import { BindingReadOnly } from './Binding';


export class ExpressionBinding extends BindingReadOnly {
    currentValue: string = '';

    constructor(property: Property, context: Map<string, UidVariable>) {
        super(property, context);
    }

    getValue() {
        const newValue = this.wrappedEval(`return ${this.property.value}`, this.context);
        if (!Object.is(this.currentValue, newValue)) {
            this.currentValue = newValue;
        }
        return this.currentValue;
    }
}
