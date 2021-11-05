import {JsonResolver} from "./JsonResolver";
import {Resolver} from "./Resolver";
import {UidModel} from "./resolverType";
import {ConstantResolver} from "./ConstantResolver";
import {UidModelVariable} from "../ContextBindingType";

export class ResolverService {


    private readonly resolvers: Map<string, Resolver>;

    constructor() {
        this.resolvers = new Map();
    }

    addResolverType(type:string,resolver:Resolver){
        this.resolvers.set(type,resolver);
    }

    createResolver(model: UidModel, name:string, uidModelVariable:UidModelVariable): Resolver {
        switch (uidModelVariable.type){
            case 'json':
                let jsonResolver = new JsonResolver(model,name,uidModelVariable.displayValue);
                this.addResolverType('json',jsonResolver);
                return jsonResolver;
            case 'constant':
                let constantResolver = new ConstantResolver(model,name,uidModelVariable.displayValue);
                this.addResolverType('constant',constantResolver);
                //this.addResolverType('variable',constantResolver);
                return constantResolver;
            default:
                throw new Error(`Resolver is not implemented for this ${uidModelVariable.type}`);
        }
    }

}