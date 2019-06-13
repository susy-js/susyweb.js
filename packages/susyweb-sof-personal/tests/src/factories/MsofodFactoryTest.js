import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import {
    EcRecoverMethod,
    GetAccountsMethod,
    ImportRawKeyMethod,
    LockAccountMethod,
    NewAccountMethod,
    PersonalSendTransactionMethod,
    PersonalSignMethod,
    PersonalSignTransactionMethod,
    UnlockAccountMethod
} from 'susyweb-core-method';

import MethodFactory from '../../../src/factories/MethodFactory';

// Mocks
jest.mock('susyweb-utils');
jest.mock('susyweb-core-helpers');

/**
 * MethodFactory test
 */
describe('MethodFactoryTest', () => {
    let methodFactory;

    beforeEach(() => {
        methodFactory = new MethodFactory(Utils, formatters);
    });

    it('constructor check', () => {
        expect(methodFactory.utils).toEqual(Utils);

        expect(methodFactory.formatters).toEqual(formatters);
    });

    it('JSON-RPC methods check', () => {
        expect(methodFactory.methods).toEqual({
            getAccounts: GetAccountsMethod,
            newAccount: NewAccountMethod,
            unlockAccount: UnlockAccountMethod,
            lockAccount: LockAccountMethod,
            importRawKey: ImportRawKeyMethod,
            sendTransaction: PersonalSendTransactionMethod,
            signTransaction: PersonalSignTransactionMethod,
            sign: PersonalSignMethod,
            ecRecover: EcRecoverMethod
        });
    });
});
