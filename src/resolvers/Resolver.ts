import {UidModel} from "./resolverType";

export abstract class Resolver {
    protected model: UidModel;
    protected name: string;
    protected advancedOptions: any;
    protected content: any;
    protected varToUpdate: string[];

    protected constructor(model: UidModel, name: string, content: any, advancedOptions?: any) {
        this.content = content;
        this.name = name;
        this.model = model;
        this.varToUpdate = [];
        this.advancedOptions = advancedOptions;
    }

    abstract resolve(): void;

    watchDependencies() {
    };

    hasDependencies(): boolean {
        return false;
    }

    registerVarToUpdate(name: string): void {
        this.varToUpdate.push(name);
    }

}

