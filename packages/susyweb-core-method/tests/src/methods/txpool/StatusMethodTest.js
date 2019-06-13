import * as Utils from 'susyweb-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import StatusMethod from '../../../../src/methods/txpool/StatusMethod';

// Mocks
jest.mock('susyweb-utils');

/**
 * StatusMethod test
 */
describe('StatusMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new StatusMethod(Utils, {}, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('txpool_status');

        expect(method.parametersAmount).toEqual(0);
    });

    it('calls afterExecution and returns the expected object', () => {
        Utils.hexToNumber.mockReturnValue(1);

        expect(method.afterExecution({pending: '0x1', queued: '0x1'})).toEqual({pending: 1, queued: 1});

        expect(Utils.hexToNumber).toHaveBeenNthCalledWith(1, '0x1');
        expect(Utils.hexToNumber).toHaveBeenNthCalledWith(2, '0x1');
    });
});
