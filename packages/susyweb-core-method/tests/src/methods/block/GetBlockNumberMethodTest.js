import * as Utils from 'susyweb-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import GetBlockNumberMethod from '../../../../src/methods/block/GetBlockNumberMethod';

// Mocks
jest.mock('susyweb-utils');

/**
 * GetBlockNumberMethod test
 */
describe('GetBlockNumberMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new GetBlockNumberMethod(Utils, null, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('sof_blockNumber');

        expect(method.parametersAmount).toEqual(0);

        expect(method.utils).toEqual(Utils);

        expect(method.formatters).toEqual(null);
    });

    it('afterExecution should map theresponse', () => {
        Utils.hexToNumber.mockReturnValueOnce(100);

        expect(method.afterExecution('0x0')).toEqual(100);

        expect(Utils.hexToNumber).toHaveBeenCalledWith('0x0');
    });
});
