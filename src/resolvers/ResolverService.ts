import {JsonResolver} from "./JsonResolver";
import {Resolver} from "./Resolver";
import { UidModel} from "./resolverType";
import {ConstantResolver} from "./ConstantResolver";
import {UidModelVariable, VariableType} from "../ContextBindingType";
import {ExpressionResolver} from "./ExpressionResolver";

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
            case VariableType.JSON:
                let jsonResolver = new JsonResolver(model,name,uidModelVariable.displayValue);
                this.addResolverType(VariableType.JSON,jsonResolver);
                return jsonResolver;
            case VariableType.CONSTANT:
                let constantResolver = new ConstantResolver(model,name,uidModelVariable.displayValue);
                this.addResolverType(VariableType.CONSTANT,constantResolver);
                return constantResolver;
            case VariableType.EXPRESSION:
                let expressionResolver = new ExpressionResolver(model,name,uidModelVariable.displayValue);
                this.addResolverType(VariableType.EXPRESSION, expressionResolver);
                return expressionResolver;
            default:
                throw new Error(`Resolver is not implemented for this ${uidModelVariable.type}`);
        }
    }

}