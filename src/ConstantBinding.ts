import { BindingReadOnly } from './Binding';

export class ConstantBinding extends BindingReadOnly {
    getValue(): string {
        return this.property.value;
    }
}
