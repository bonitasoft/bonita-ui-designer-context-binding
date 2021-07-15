import { Binding, ConstantBinding, enumBinding, ExpressionBinding, InterpolationBinding, VariableBinding } from "./Binding";
import { Context, Property, Properties } from "./UidType";

/**
 * Define destination properties allowing to
 * access the context object as described in properties.
 *
 * @param properties - also known as properties. { type: <data | constant>, value: <expression> }
 * @param context - against which property.value expression will be executed.
 * @param destination - object where to bind the resulting properties.
 */
export function createBinding(properties: Properties, context: Context, destination: Object) {
    Object.keys(properties).forEach(function (name: string) {
        const binding: Binding = createBindingService({ property: properties[name], context });
        Object.defineProperty(destination, name, {
            get: function () {
                return binding.getValue();
            },
            set: function (value) {
                //TODO: Found a solution to get detail here                
                console.warn('ToDo: get value on event (value.detail object by default)');
                return binding.setValue && binding.setValue(value.detail);
            },
            enumerable: true
        });
    });
};

function createBindingService({ property, context }: { property: Property; context: Context; }): Binding {
    switch (property.type) {
        case enumBinding.constant:
            return new ConstantBinding(property, context);
        case enumBinding.interpolation:
            return new InterpolationBinding(property, context);
        case enumBinding.expression:
            return new ExpressionBinding(property, context);
        case enumBinding.variable:
            return new VariableBinding(property, context);
        default:
            throw 'No binding for this property' + property
            break;
    }

}
