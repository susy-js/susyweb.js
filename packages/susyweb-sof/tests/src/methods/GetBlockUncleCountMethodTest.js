import {formatters} from 'susyweb-core-helpers';
import GetBlockUncleCountMethod from '../../../src/methods/GetBlockUncleCountMethod';

/**
 * GetBlockUncleCountMethod test
 */
describe('GetBlockUncleCountMethodTest', () => {
    let getBlockUncleCountMethod;

    beforeEach(() => {
        getBlockUncleCountMethod = new GetBlockUncleCountMethod({}, formatters, {});
    });

    it('constructor check', () => {
        expect(getBlockUncleCountMethod.rpcMethod).toEqual('sof_getUncleCountByBlockNumber');
    });

    it('calls execute with hash', () => {
        getBlockUncleCountMethod.parameters = ['0x0'];

        getBlockUncleCountMethod.beforeExecution({});

        expect(getBlockUncleCountMethod.rpcMethod).toEqual('sof_getUncleCountByBlockHash');
    });

    it('calls execute with number', () => {
        getBlockUncleCountMethod.parameters = [100];

        getBlockUncleCountMethod.beforeExecution({});

        expect(getBlockUncleCountMethod.rpcMethod).toEqual('sof_getUncleCountByBlockNumber');
    });
});
