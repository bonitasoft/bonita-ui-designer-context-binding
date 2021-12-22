import {Resolver} from "./Resolver";

export type UidModel = {
    [name: string]: string
}

type monTypeSansNom = Map<string,Array<Resolver>>;

export function modelProxyfied (obj:any, callback?:Function) {
    let dependencies:monTypeSansNom = new Map();
    //{'toto': [Resolver], complexVar1 : [], complexVar2 : []}
    const handler: any = {
        get: function (target: any, prop: string) {
            console.log('** get modelProxyfied', target,prop, target[prop]);
            return target[prop];
        },
        set: function (target: any, prop: string, value: any) {
            target[prop] = value;
            console.log('#### set modelProxyfied', target,prop, value);
           // this.dependencies[prop].forEach( (resolver:Resolver) => resolver.resolve());
            return true;
        }
    }
    let proxys = new Proxy(obj, handler);

    return proxys;
}
