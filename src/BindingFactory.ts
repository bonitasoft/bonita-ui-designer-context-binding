import { ModelAccessor } from './ModelAccessor';
import type { Property, Properties, PropertyValues } from "./ContextBindingType";
import { OneWayBinding, TwoWayBinding } from './bindingType/Binding';
import { ConstantBinding } from './bindingType/ConstantBinding';
import { InterpolationBinding } from './bindingType/InterpolationBinding';
import { EnumBinding } from './bindingType/EnumBinding';
import { ExpressionBinding } from './bindingType/ExpressionBinding';
import { VariableBinding } from './bindingType/VariableBinding';
/**
 * Define destination properties allowing to
 * access the context object as described in properties.
 *
 * @param properties - also known as properties. { type: <data | constant>, value: <expression> }
 * @param variableAccessors - against which property.value expression will be executed.
 * @param destination - object where to bind the resulting properties.
 */

export class BindingFactory {

    static createPropertiesBinding(properties: Properties, variableAccessors: Map<string, ModelAccessor>, propertyAccessor: PropertyValues) {
        Object.keys(properties).forEach(function (name: string) {
            const propertyBinding: any = createBindingService(properties[name], variableAccessors);
            if (propertyBinding instanceof TwoWayBinding) {
                Object.defineProperty(propertyAccessor, name, {
                    get: function () {
                        return propertyBinding.getValue();
                    },
                    set: function (value) {
                        //TODO @BP: Found a solution to get detail here                
                        console.warn('ToDo: get value on event (value.detail object by default)', propertyBinding.constructor.name);
                        return propertyBinding.setValue && propertyBinding.setValue(value.detail);
                    },
                    enumerable: true
                });
            } else {
                Object.defineProperty(propertyAccessor, name, {
                    get: function () {
                        return propertyBinding.getValue();
                    },
                    enumerable: true
                });
            }
        });
    };

}

function createBindingService(property: Property, variableAccessors: Map<string, ModelAccessor>): OneWayBinding {
    switch (property.type) {
        case EnumBinding.Constant:
            return new ConstantBinding(property, variableAccessors);
        case EnumBinding.Interpolation:
            return new InterpolationBinding(property, variableAccessors);
        case EnumBinding.Expression:
            return new ExpressionBinding(property, variableAccessors);
        case EnumBinding.Variable:
            return new VariableBinding(property, variableAccessors);
        default:
            throw 'No binding for this property' + property
            break;
    }

}
