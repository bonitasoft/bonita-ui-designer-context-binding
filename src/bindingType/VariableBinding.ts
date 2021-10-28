import { Property } from '../ContextBindingType';
import { TwoWayBinding } from './Binding';
import { VariableAccessor } from '../VariableAccessor';
import {get, set} from 'lodash';

export class VariableBinding extends TwoWayBinding {
    isBound: boolean;
    value: string = '';
    variableAccessorsName: string;
    variableAccessorsProperty: string;
    variableAccessor: VariableAccessor | undefined;

    constructor(property: Property, variableAccessors: Map<string, VariableAccessor>) {
        super(property, variableAccessors);
        this.value = property.value || '';
        this.isBound = !property.value;

        let variableBindingSplitted:  Array<string> | null= this.splitComplexVariableInArray(this.value);
        this.variableAccessorsName = variableBindingSplitted ? variableBindingSplitted[1] : this.value;
        this.variableAccessorsProperty= variableBindingSplitted && variableBindingSplitted[2] ? variableBindingSplitted[2] : '';
        this.variableAccessor= this.variableAccessors.get(this.variableAccessorsName);
    }

    getValue() {
        return (!this.isBound) ? this.getter() : this.value;
    }

    setValue(newValue: string): void {
        let variableValue: any= this.variableAccessor?.getValue();
       if(this.variableAccessor){
           if(variableValue && typeof variableValue === 'object' && this.variableAccessorsProperty) {
               set(variableValue, this.variableAccessorsProperty,newValue);
           }else {
               this.variableAccessor.setValue(newValue);
           }
       }
    }

    getter() {
        if(this.variableAccessorsProperty) {
            return get(this.variableAccessor?.getValue(), this.variableAccessorsProperty);
        }else{
            return this.variableAccessor?.getValue();
        }
    }
}