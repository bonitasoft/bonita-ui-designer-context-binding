import {Resolver} from "./Resolver";
import {uidModel} from "../resolvers/resolverType";

export class ConstantResolver extends Resolver {

    constructor(model:uidModel, name:string, content:any, advancedOptions?:any) {
       super(model,name,content,advancedOptions);
    }

    watchDependencies(){}

    resolve() : void {
        try{
            Object.defineProperty(this.model,this.name,  {
                value: this.content || undefined,
                writable: true
            });
        } catch(e){
            console.error(`Error when resolved ${this.name}. => `,e.message);
            throw e;
        }

    }
}