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

export interface Variables {
    [key: string]: UidModelVariable
}

export interface PropertyValues {
    [key: string]: string;
}

export type { UidModelVariable, Property, Properties };