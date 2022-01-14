/**
 * {
 *  "id": "uidVariable"
 *  "type": "constant",
 *  "value": ["Mu custom Label from variable"],
 *  "displayValue": "Mu custom Label from variable",
 *  "exposed": false
 * },
 */
export enum VariableType {
    CONSTANT = 'constant',
    JSON = 'json',
    EXPRESSION = 'expression'
}

export type UidModelVariable = {
    type: VariableType,
    value: [string];
    displayValue: string,
    exposed: boolean
}

export type Property = {
    type: string,
    value: string | null,
}

export type Properties = {
    [name: string]: Property
}

export interface Variables {
    [key: string]: UidModelVariable
}

export type VariableContext = {
    [key: string]: string | number | boolean | object;
}

export interface PropertyValues {
    [key: string]: string;
}

export type SpecificVariablesScope = {
    collection?: Array<any>,
    index?:number,
    count?:number
}
