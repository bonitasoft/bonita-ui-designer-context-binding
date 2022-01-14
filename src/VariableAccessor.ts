import {UidModel} from "./resolvers/resolverType";

export class VariableAccessor {
    private readonly model: UidModel;
    private readonly varName: string;

    constructor(model: UidModel,varName: string) {
        this.model = model;
        this.varName = varName;
    }

    get value(){
        return this.model[this.varName];
    }

    set value(newValue: string | number | boolean | object){
        this.model[this.varName] = newValue;
    }

}