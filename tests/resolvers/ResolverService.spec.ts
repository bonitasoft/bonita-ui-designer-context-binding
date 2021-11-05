import {expect} from "chai";
import {JsonResolver} from "../../src/resolvers/JsonResolver";
import {ResolverService} from "../../src/resolvers/ResolverService";
import {UidModel} from "../../src/resolvers/resolverType";

describe('ResolverService', () => {
    let jsonResolver: JsonResolver;
    let resolverService = new ResolverService();
    let model: UidModel;

    beforeEach(() => {
        model = {'firstUidVariable':'aValue'};
    });

    it('should resolve json variable ', () => {
        aData(model, 'myData', {
            type: 'json',
            value: ['{"name":"Marsu","lastName":"Pilami"}'],
            displayValue: '{"name":"Marsu","lastName":"Pilami"}',
            exposed: false
        });

        expect(typeof model.myData).to.equal("object");
        expect(typeof model.myData).to.not.equal("string");

        // @ts-ignore
        expect(model.myData['name']).to.equal("Marsu");

    });

    it('should throw syntax error when json value is incorrect', () => {
        expect(function(){
            aData(model, 'myData', {
                type: 'json',
                value: ['"name":"Marsu","lastName":"Pilami"}'],
                displayValue: '"name":"Marsu","lastName":"Pilami"}',
                exposed: false
            })
        }).to.throw(SyntaxError);
    });



    function aData(model: UidModel, name: string, data: any) {
            let resolver = resolverService.createResolver(model, name, data);
            resolver.resolve();
            resolver.watchDependencies();
    }
});