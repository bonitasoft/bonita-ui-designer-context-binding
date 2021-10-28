import {JsonResolver} from "./JsonResolver";
import {Resolver} from "./Resolver";
import {uidModel} from "./resolverType";
import {ConstantResolver} from "./ConstantResolver";

export class ResolverService {


    private readonly _resolvers: Map<string, Resolver>;

    constructor() {
        this._resolvers = new Map();
    }

    addResolverType(type:string,resolver:Resolver){
        this._resolvers.set(type,resolver);
    }

    createResolver(model: uidModel, name:string, data:any): Resolver | never {
        switch (data.type){
            case 'json':
                let jsonResolver = new JsonResolver(model,name,data.displayValue);
                this.addResolverType('json',jsonResolver);
                return jsonResolver;
            case 'constant':
                let constantResolver = new ConstantResolver(model,name,data.displayValue);
                this.addResolverType('constant',constantResolver);
                this.addResolverType('variable',constantResolver);
                return constantResolver;
            default:
                throw new Error(`Resolver is not implemented for this ${data.type}`);
        }
    }

    get resolvers(): Map<string, Resolver> {
        return this._resolvers;
    }

}