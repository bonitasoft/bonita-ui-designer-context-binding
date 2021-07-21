import { Context, Property } from './UidType';
import { Binding } from './Binding';

//TODO BP: Use translation mecanisme here
export class InterpolationBinding extends Binding {

    constructor(property: Property, context: Context) {
        super(property, context);
    }

    getValue() {
        console.warn('To be implemented - InterpolationBinding is not ready to production');

        //Todo: make possible to use | from angular (ex: | uppercase, | date ...)
        // return gettextCatalog.getString(this.property.value || '', this.context);               

        const replaceVariable = (match: any, inner: any) => {
            return this.context[inner].displayValue || "";
        }

        const replaced = this.property.value.replace(/\{\{(\w+)\}\}/gi, replaceVariable);
        return replaced;
    }
}