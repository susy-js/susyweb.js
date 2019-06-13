import AbstractObservedTransactionMethod from '../../../../lib/methods/transaction/AbstractObservedTransactionMethod';
import SendRawTransactionMethod from '../../../../src/methods/transaction/SendRawTransactionMethod';
import {formatters} from 'susyweb-core-helpers';

// Mocks
jest.mock('susyweb-core-helpers');

/**
 * SendRawTransactionMethod test
 */
describe('SendRawTransactionMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new SendRawTransactionMethod(null, formatters, null, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractObservedTransactionMethod);

        expect(method.rpcMethod).toEqual('sof_sendRawTransaction');
    });

    it('calls afterExecution and returns the expected value', () => {
        formatters.outputTransactionFormatter.mockReturnValueOnce({status: true});

        expect(method.afterExecution({status: false})).toEqual({status: true});

        expect(formatters.outputTransactionFormatter).toHaveBeenCalledWith({status: false});
    });
});
