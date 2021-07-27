// type UidVariable = {
//     type: string,
//     value: [string];
//     displayValue: string,
//     exposed: boolean
// }

/**
 * { myVariableName: "my default Label",
 *   get: Function, 
 *   set: Function
 * }
 */
type UidVariable = {
    [key: string]: string
}

type Property = {
    type: string,
    value: string,
}

type Properties = {
    [name: string]: Property
}

export type { UidVariable, Property, Properties };
/*
{
    "nomDeTaPage": [
        {
            "id": "uidVariable"
            "type": "constant",
            "value": ["Mu custom Label from variable"],
            "displayValue": "Mu custom Label from variable",
            "exposed": false
        },
        {
            "id": "secondVariable"
            "type": "constant",
            "value": ["123"],
            "displayValue": "123",
            "exposed": false
        },
    ]
    "monFragment":{
        "inputFrag":{};
        "input2Frag":{};
    }
}
*/