import {Resolver} from "./Resolver";
import {UidModel} from "./resolverType";

export class ExpressionResolver extends Resolver {
    protected dependencies: Array<string>;

    constructor(model: UidModel, name: string, content: string, advancedOptions?: any) {
        super(model, name, content, advancedOptions);
        this.dependencies = ExpressionResolver.extractDependencies(this.content);
    }

    resolve(): void {
        // use strict. Avoid pollution of the global object.
        console.log('aa');
        let expression = new Function(
            '$data',//inject all data
            'uiTranslate',//inject translate function
            '"use strict";' + this.content);

        console.log('resolve', this.name ,'with', this.content);
        try {
            this.model[this.name] = expression(
                this.model, // all data
                //TODO Implement Translate
                (text: string) => text// translate function
            );
            console.log("resolve JS", this.name, this.model[this.name]);
        } catch (e: any) {
            console.error(`Error when resolved ${this.name}. =>`, e.message);
            throw e;
        }
    }

    watchDependencies() {
        console.log("watchDependencies", this.name, this.model);
        this.resolve();

        // @ts-ignore
        // this.dependencies.forEach(
        //     (dependency) => {
        //         console.log('register watch for ' , dependency)
        //         // @ts-ignore
        //         return this.model.watch(dependency,() => console.log('toto'))
        //     }
        // );
    }

    hasDependencies(): boolean {
        console.log("hasDependencies", this.name,  this.dependencies.length > 0);
        return this.dependencies.length > 0;
    }

    static extractDependencies(impl: string) {
        //looking for dependencies in the form of '$data.XXX'
        return ((impl + '').match(/\$data\.([\w\$_]+)/g) || [])
            .map((dependency) => dependency.replace(/\$data\./, ''))
            //filter unique dependencies
            .filter((item, position, self) => self.indexOf(item) === position);
    }
}

