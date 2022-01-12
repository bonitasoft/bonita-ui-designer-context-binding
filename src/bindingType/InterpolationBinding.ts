import {Property} from '../ContextBindingType';
import {OneWayBinding} from './Binding';
import {ModelAccessor} from '../ModelAccessor';

// TODO: make possible to use | from angular (ex: | uppercase, | date ...)
//       Use translation mechanism here
export class InterpolationBinding extends OneWayBinding {

    constructor(property: Property, variableAccessors: Map<string, ModelAccessor>) {
        super(property, variableAccessors);
    }

    getValue() {
        const replaceVariable = (match: any, groupCapturingToReplace: any) => {
            let value = this.wrappedEval(`${groupCapturingToReplace}`) ?? '';
            return typeof value === 'object' ? JSON.stringify(value) : value;
        }

        if (!this.property.value) {
            return '';
        }
        return this.property.value.replace(this.eachVariableBetweenDoubleBracket, replaceVariable);
    }
}