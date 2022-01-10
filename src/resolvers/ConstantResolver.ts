import {Resolver} from "./Resolver";
import {UidModel} from "../resolvers/resolverType";

export class ConstantResolver extends Resolver {
    private i:number;
    constructor(model: UidModel, name: string, content: any, advancedOptions?: any) {
        super(model, name, content, advancedOptions);
        this.i=0;
    }

    watchDependencies() {}

    resolve(): void {
        Object.defineProperty(this.model, this.name, {
            value: this.content ?? undefined,
            writable: true,
            configurable:true
        });

    }
}