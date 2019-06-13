import {formatters} from 'susyweb-core-helpers';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import SetSophyBaseMethod from '../../../../src/methods/miner/SetSophyBaseMethod';

// Mocks
jest.mock('susyweb-core-helpers');

/**
 * SetSophyBaseMethod test
 */
describe('SetSophyBaseMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new SetSophyBaseMethod(null, formatters, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('miner_setSophybase');

        expect(method.parametersAmount).toEqual(1);
    });

    it('calls beforeExecution and formats the given address', () => {
        formatters.inputAddressFormatter.mockReturnValueOnce('0x0');

        method.parameters = ['0x00'];
        method.beforeExecution();

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('0x00');

        expect(method.parameters[0]).toEqual('0x0');
    });
});
