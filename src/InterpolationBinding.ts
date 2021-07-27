import { UidVariable, Property } from './ContextBindingType';
import { BindingReadOnly } from './Binding';

//TODO BP: Use translation mecanisme here
export class InterpolationBinding extends BindingReadOnly {

    constructor(property: Property, context: Map<string, UidVariable>) {
        super(property, context);
    }

    getValue() {
        // console.warn('To be implemented - InterpolationBinding is not ready to production');

        //Todo: make possible to use | from angular (ex: | uppercase, | date ...)
        // return gettextCatalog.getString(this.property.value || '', this.context);               

        // console.log('interpolation context', this.context);
        const replaceVariable = (match: any, inner: any) => {
            let variable: UidVariable | undefined = this.context.get(inner);
            // console.log('Interpolation inner', variable);
            return variable?.displayValue || '';
        }
        let res = this.property.value.replace(/\{\{(\w+)\}\}/gi, replaceVariable);
        // console.log('interpolation res', res);
        return this.property.value.replace(/\{\{(\w+)\}\}/gi, replaceVariable);
    }
}