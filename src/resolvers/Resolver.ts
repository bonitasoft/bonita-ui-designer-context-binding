import {uidModel} from "./resolverType";

export abstract class Resolver {
    protected model: uidModel;
    protected name: string;
    protected advancedOptions: any;
    protected content: any;

    protected constructor(model:uidModel, name:string, content:any, advancedOptions?:any) {
        this.content = content;
        this.name = name;
        this.model = model;
        this.advancedOptions = advancedOptions;
    }

    abstract resolve():void;
    watchDependencies(){};
    hasDependencies() { return false; }

}

