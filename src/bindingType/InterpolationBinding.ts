import { Property } from '../ContextBindingType';
import { OneWayBinding } from './Binding';
import { VariableAccessor } from '../VariableAccessor';

// TODO: make possible to use | from angular (ex: | uppercase, | date ...)
//       Use translation mecanisme here
export class InterpolationBinding extends OneWayBinding {

    constructor(property: Property, variableAccessors: Map<string, VariableAccessor>) {
        super(property, variableAccessors);
    }

    getValue() {
        console.warn('To be implemented - InterpolationBinding is not ready to production');
        // return gettextCatalog.getString(this.property.value || '', this.context);               
        const replaceVariable = (match: any, inner: any) => {
            let variable: VariableAccessor | undefined = this.variableAccessors.get(inner);
            return String(variable?.getValue() || '');
        }

        if (!this.property.value) {
            return '';
        }

        return this.property.value.replace(/\{\{(\w+)\}\}/gi, replaceVariable);
    }
}