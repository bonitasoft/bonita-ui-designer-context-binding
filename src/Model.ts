import { ModelFactory } from './ModelFactory';
import { Context } from './UidType';

export class Model {
    private createContextVariable: any;

    constructor(modelValues: any) {
        let modelFactory = new ModelFactory(modelValues);
        this.createContextVariable = () => modelFactory.createContextVariable();
    }

    get context(): Context {
        return this.createContextVariable();
    }
}