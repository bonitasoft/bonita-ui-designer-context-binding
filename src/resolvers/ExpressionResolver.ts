import {Resolver} from "./Resolver";
import {UidModel} from "./resolverType";


export class ExpressionResolver extends Resolver {
    public dependencies: Array<string>;

    constructor(model: UidModel, name: string, content: string, advancedOptions?: any) {
        super(model, name, content, advancedOptions);
        this.dependencies = ExpressionResolver.extractDependencies(this.content);
    }

    resolve(): void {
        // use strict. Avoid pollution of the global object.
        let expression = new Function(
            '$data',//inject all data
            'uiTranslate',//inject translate function
            '"use strict";' + this.content);

        try {
            Object.defineProperty(this.model, this.name, {
                value: expression(
                    this.model, // all data
                    //TODO Implement Translate
                    (text: string) => text// translate function
                ),
                configurable: true
            });
            console.log("resolve JS", this.name, this.model[this.name]);
        } catch (e: any) {
            console.error(`Error when resolved ${this.name}. =>`, e.message);
            throw e;
        }
    }

    watchDependencies() {
        console.log("watchDependencies", this.name, this.model);
        //this.resolve();
        //let a = this.model;
        //toto= "tututu";
        //complexVar = $data.toto;
        //complexVar2 = $data.toto;


        /*this.dependencies.forEach(dependency=>{
            console.log('dependencies', dependency, this.name)
            //@ts-ignore
            this.model = onChange(this.model, () => console.log('### onChange'));
        });*/
        //dependeciens ["toto"];
        /*
        this.dependencies.forEach(
            (dependency) => {
                console.log('register watch for ', this.model, dependency);
                Object.defineProperty(this.model, dependency, {
                    // @ts-ignore
                    get() {
                        console.log('on watch', this.model, dependency);
                        return 'pouet';
                    },
                    // @ts-ignore
                    set(target: any, prop: string, value: any) {
                        target[prop] = value;
                        console.log('** watch set', target, prop, value);
                        this.resolve();
                        return true;
                    }
                });
            }
        );*/
        // console.log('model',this.model);
    }

    hasDependencies(): boolean {
        // console.log("hasDependencies", this.name,  this.dependencies.length > 0);
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

