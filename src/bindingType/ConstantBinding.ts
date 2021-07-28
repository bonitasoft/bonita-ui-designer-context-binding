import { OneWayBinding } from './Binding';

export class ConstantBinding extends OneWayBinding {
    getValue(): string {
        return this.property.value;
    }
}
