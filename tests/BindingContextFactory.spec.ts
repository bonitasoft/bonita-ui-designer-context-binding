import {expect} from "chai";
import * as sinon from "sinon";
import {BindingContextFactory} from "../src/BindingContextFactory";
import {SpecificVariablesScope} from "../src/ContextBindingType";
import {ModelFactory} from "../src/ModelFactory";

describe('Binding context factory', () => {
    let bindingContextFactory: BindingContextFactory;
    let modelFactory : ModelFactory;
    let sandbox  = sinon.createSandbox();
    beforeEach(() => {
        modelFactory = new ModelFactory(new Map());
        bindingContextFactory = new BindingContextFactory(modelFactory);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should fill accessors with specific keyword when scope is defined', () =>{
        let scope: SpecificVariablesScope = {index:0, collection: [{name:"Bertrand"}, {name:"Walter"}], count:2};
        let varAccessorResult = bindingContextFactory.addSpecificKeywordOnAccessors(scope);
        expect(varAccessorResult.get("$item")?.value).to.eql({name:"Bertrand"});
        expect(varAccessorResult.get("$index")?.value).to.equal(0);
    });

    it('should add undefined value when reference not exist in scope', () =>{
        let contextMap = new Map();
        bindingContextFactory.addSpecificKeywordOnAccessors({});

        expect(contextMap.get("$item")?.getValue()).to.equal(undefined);
        expect(contextMap.get("$index")?.getValue()).to.equal(undefined);
    });

    it('should add undefined value when index is out of array length', () =>{
        let contextMap = new Map();
        let scope = {index:3,collection: [{name:"Bertrand"}, {name:"Walter"}], count:2};
        bindingContextFactory.addSpecificKeywordOnAccessors(scope);

        expect(contextMap.get("$item")?.getValue()).to.equal(undefined);
    });
});