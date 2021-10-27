import {Property} from '../ContextBindingType';
import {OneWayBinding,} from './Binding';
import {VariableAccessor} from '../VariableAccessor';

// TODO: make possible to use | from angular (ex: | uppercase, | date ...)
//       Use translation mecanisme here
export class InterpolationBinding extends OneWayBinding {

    constructor(property: Property, variableAccessors: Map<string, VariableAccessor>) {
        super(property, variableAccessors);
    }

    getValue() {
        // return gettextCatalog.getString(this.property.value || '', this.context);               
        const replaceVariable = (match: any, p1: any) => {
            let value = this.wrappedEval(`${p1}`);
            return typeof value === 'object' ? JSON.stringify(value) : value;
        }

        if (!this.property.value) {
            return '';
        }

        return this.property.value.replace(/\{\{(.*)\}\}/gi, replaceVariable);
    }
}