import {UidModel} from "./resolvers/resolverType";

export class VariableAccessor {
    private model: UidModel;
    private readonly varName: string;

    constructor(model: UidModel,varName: string, value: string | number | boolean | object) {
        this.model = model;
        this.varName = varName;
    }

    get value(){
        return this.model[this.varName];
    }

    set value(newValue: string | number | boolean | object){
        // @ts-ignore
        this.model[this.varName] = newValue;
    }

}