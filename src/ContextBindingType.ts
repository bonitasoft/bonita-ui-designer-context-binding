export type UidVariable = {
    type: string,
    value: [string];
    displayValue: string,
    exposed: boolean
}

export type Property = {
    type: string,
    value: string,
}

export type Properties = {
    [name: string]: Property
}

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