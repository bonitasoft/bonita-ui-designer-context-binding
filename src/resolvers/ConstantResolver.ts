import {Resolver} from "./Resolver";
import {uidModel} from "../resolvers/resolverType";

export class ConstantResolver extends Resolver {

    constructor(model: uidModel, name: string, content: any, advancedOptions?: any) {
        super(model, name, content, advancedOptions);
    }

    watchDependencies() {}

    resolve(): void {
        Object.defineProperty(this.model, this.name, {
            value: this.content || undefined,
            writable: true
        });

    }
}