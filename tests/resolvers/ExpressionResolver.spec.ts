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

    it('should resolve expression variable with another javascript variable in child dependency', () => {
        let expression = new ExpressionResolver(model, 'myJsVar', 'return $data.modelJsVar');

        expression.resolve();

        expect(expression.hasDependencies()).to.equal(true);
        expect(typeof model.myJsVar).to.equal("string");
        expect(model.myJsVar).to.equal('return "Hello here"');
    });

    it('should return undefined when referenced variable is not exist in model', () => {
        let expression = new ExpressionResolver(model, 'myJsVar', 'return $data.unknownVariable');

        expression.resolve();

        expect(expression.hasDependencies()).to.equal(true);
        expect(model.myJsVar).to.equal(undefined);
    });

    it('should return undefined when variable used in expression is invalid', () => {
        let expression = new ExpressionResolver(model, 'myJsVar', 'return $unknownVariable');

        expression.resolve();

        expect(expression.hasDependencies()).to.equal(false);
        expect(model.myJsVar).to.equal(undefined);
    });
});