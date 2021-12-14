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

        var expression = new Function(
            '$data',//inject all data
            'uiTranslate',//inject translate function
            '"use strict";' + this.content);

        console.log("resolve", this.content, );
        try {
            Object.defineProperty(this.model, this.name, {
                value: expression(
                    this.model, // all data
                    //TODO Implement Translate
                    (text: string) => text// translate function
                ),
                writable: true
            });
            console.log("resolve JS", this.name, this.model[this.name]);
        } catch (e: any) {
            console.error(`Error when resolved ${this.name}. =>`, e.message);
            throw e;
        }
    }

    watchDependencies() {
        this.resolve();
        console.log("watchDependencies", this.name);
        this.dependencies.forEach(
            (dependency) => this.resolveOnChange(this.model[dependency])
        );
    }

    private resolveOnChange(resolver: any) {
        console.log("resolveOnChange", resolver);
        new Proxy(resolver, {
            set: function(target: any, property: string, value: any) {
                target[property] = value;
                console.log("Proxy resolveOnChange", this, resolver);
                // @ts-ignore
                this.resolve();
                //indicate success
                return true;
            }
        });
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

