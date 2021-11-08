/**
 * {
 *  "id": "uidVariable"
 *  "type": "constant",
 *  "value": ["Mu custom Label from variable"],
 *  "displayValue": "Mu custom Label from variable",
 *  "exposed": false
 * },
 */
type UidModelVariable = {
    type: string,
    value: [string];
    displayValue: string,
    exposed: boolean
}

type Property = {
    type: string,
    value: string | null,
}

type Properties = {
    [name: string]: Property
}

interface Variables {
    [key: string]: UidModelVariable
}

type VariableContext = {
    [key: string]: string | number | boolean | object;
}

interface PropertyValues {
    [key: string]: string;
}

export type { UidModelVariable, Property, Properties, VariableContext };
export { Variables, PropertyValues };