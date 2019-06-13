import * as Utils from 'susyweb-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import NewAccountMethod from '../../../../src/methods/personal/NewAccountMethod';

// Mocks
jest.mock('susyweb-utils');

/**
 * NewAccountMethod test
 */
describe('NewAccountMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new NewAccountMethod(Utils, null, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('personal_newAccount');

        expect(method.parametersAmount).toEqual(1);

        expect(method.utils).toEqual(Utils);

        expect(method.formatters).toEqual(null);
    });

    it('afterExecution should map the response', () => {
        Utils.toChecksumAddress.mockReturnValueOnce('0x0');

        expect(method.afterExecution('0x0')).toEqual('0x0');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('0x0');
    });
});
