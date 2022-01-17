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
        try {
            let expression = new Function(
                '$data',//inject all data
                'uiTranslate',//inject translate function
                '"use strict";' + this.content);

            this.model[this.name] = expression(
                this.model, // all data
                //TODO Implement Translate
                (text: string) => text// translate function
            );
        }catch (e) {
            console.error('This following error occur on expression resolution',e);
        }
    }

    hasDependencies(): boolean {
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

