import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import GetUncleMethod from '../../../src/methods/GetUncleMethod';

/**
 * GetUncleMethodTest test
 */
describe('GetUncleMethodTest', () => {
    let getUncleMethod;

    beforeEach(() => {
        getUncleMethod = new GetUncleMethod(Utils, formatters, {});
    });

    it('constructor check', () => {
        expect(getUncleMethod.rpcMethod).toEqual('sof_getUncleByBlockNumberAndIndex');
    });

    it('calls execute with hash', () => {
        getUncleMethod.parameters = ['0x0'];

        getUncleMethod.beforeExecution({});

        expect(getUncleMethod.rpcMethod).toEqual('sof_getUncleByBlockHashAndIndex');
    });

    it('calls execute with number', () => {
        getUncleMethod.parameters = [100];

        getUncleMethod.beforeExecution({});

        expect(getUncleMethod.rpcMethod).toEqual('sof_getUncleByBlockNumberAndIndex');
    });
});
