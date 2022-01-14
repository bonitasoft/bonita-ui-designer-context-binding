import {Resolver} from "./Resolver";
import {UidModel} from "./resolverType";

export class JsonResolver extends Resolver {

    constructor(model:UidModel, name:string, content:string, advancedOptions?:any) {
       super(model,name,content,advancedOptions);
    }

    resolve() : void {
        try{
            Object.defineProperty(this.model,this.name,  {
                value: JSON.parse(this.content),
                writable: true,
                configurable:true
            });
        } catch(e : any){
            console.error(`Error when resolved ${this.name}. =>`, e.message);
            throw e;
        }
    }
}