import { Context } from "./UidType";

export class ModelFactory {
    variable: any;

    constructor(variable: any) {
        this.variable = variable;
    }

    create(variable: any) {
        //TODO: use ResolverService here
        // ResolverService.createResolver(model, name,data[name]));
        // And remove .displayValue plus bas        
        const resolvers = Object.keys(variable).map((name: string) => { });
    }

    createContextVariable() {
        let context: Context = {};
        Object.keys(this.variable).forEach((property: string) => {
            Object.defineProperty(context, property, {
                get: () => {
                    return this.variable[property].displayValue;
                },
                set: (value) => {
                    //TODO: Found a solution to set generic display value here      
                    this.variable[property].displayValue = value;
                },
                enumerable: true
            });
        });
        console.log('this.context', context);
        return context;
    }

}