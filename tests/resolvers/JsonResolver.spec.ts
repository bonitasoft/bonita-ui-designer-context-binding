import {expect} from "chai";
import {JsonResolver} from "../../src/resolvers/JsonResolver";
import {UidModel} from "../../src/resolvers/resolverType";

describe('jsonResolver', () => {
    let model: UidModel;

    beforeEach(() => {
        model = {'firstUidVariable': 'aValue'};
    });

    it('should resolve json variable and return a js object', () => {
        let json = new JsonResolver(model, 'myData', '{"name":"Marsu","lastName":"Pilami"}');

        json.resolve();

        expect(typeof model.myData).to.equal("object");
        expect(typeof model.myData).to.not.equal("string");
        // @ts-ignore
        expect(model.myData['name']).to.equal("Marsu");
    });

    it('should throw syntax error when json value is incorrect', () => {
        let json = new JsonResolver(model, 'myData', '"name":"Marsu","lastName":"Pilami"}');

        expect(function () {
            json.resolve()
        }).to.throw(SyntaxError);
    });
});