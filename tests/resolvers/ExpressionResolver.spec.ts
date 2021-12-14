import {expect} from "chai";
import {JsonResolver} from "../../src/resolvers/JsonResolver";
import {UidModel} from "../../src/resolvers/resolverType";
import {ExpressionResolver} from "../../src/resolvers/ExpressionResolver";

describe('expressionResolver', () => {
    let model: UidModel;

    beforeEach(() => {
        model = {'modelJsVar': 'return "Hello here"'};
    });

    it('should resolve simple expression variable and return the js execution', () => {
        let expression = new ExpressionResolver(model, 'myJsVar', 'return "hello world"');

        expression.resolve();

        expect(typeof model.myJsVar).to.equal("string");
        expect(model.myJsVar).to.equal("hello world");
    });

    it('should resolve expression variable with antother vara dependency', () => {
        let expression = new ExpressionResolver(model, 'myJsVar', 'return $data.modelJsVar');

        expression.watchDependencies();

        expect(typeof model.myJsVar).to.equal("string");
        expect(model.myJsVar).to.equal("hello here");
    });
});