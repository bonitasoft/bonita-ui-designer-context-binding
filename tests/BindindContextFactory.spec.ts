import {expect} from "chai";
import {BindingContextFactory} from "../src/BindingContextFactory";
import {SpecificVariablesScope} from "../src/ContextBindingType";

describe('Binding context factory', () => {
    let bindingContextFactory: BindingContextFactory;
    beforeEach(() => {
        bindingContextFactory = new BindingContextFactory();
    });

    it('should fill accessors with specific keyword when scope is defined', () =>{
        let contextMap = new Map();
        let scope: SpecificVariablesScope = {index:0, collection: [{name:"Bertrand"}, {name:"Walter"}], count:2};
        bindingContextFactory.addSpecificKeywordOnAccessors(contextMap,scope);

        expect(contextMap.get("$item")?.getValue()?.name).to.equal("Bertrand");
        expect(contextMap.get("$index")?.getValue()).to.equal(0);
    });

    it('should add undefined value when reference not exist in scope', () =>{
        let contextMap = new Map();
        bindingContextFactory.addSpecificKeywordOnAccessors(contextMap,{});

        expect(contextMap.get("$item")?.getValue()).to.equal(undefined);
        expect(contextMap.get("$index")?.getValue()).to.equal(undefined);
    });

    it('should add undefined value when index is out of array length', () =>{
        let contextMap = new Map();
        let scope = {index:3,collection: [{name:"Bertrand"}, {name:"Walter"}], count:2};
        bindingContextFactory.addSpecificKeywordOnAccessors(contextMap,scope);

        expect(contextMap.get("$item")?.getValue()).to.equal(undefined);
    });
});