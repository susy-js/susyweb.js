import {AbstractSusyWebModule} from 'susyweb-core';
import {GetAccountsMethod} from 'susyweb-core-method';
import SofGetAccountsMethod from '../../../src/methods/SofGetAccountsMethod';

// Mocks
jest.mock('susyweb-core');

/**
 * SofGetAccountsMethod test
 */
describe('SofGetAccountsMethodTest', () => {
    let method, moduleInstanceMock, accountsMock;

    beforeEach(() => {
        accountsMock = {};
        accountsMock.wallet = {0: {privateKey: '0x0', address: '0x0'}, accountsIndex: 1};

        new AbstractSusyWebModule({}, {}, {}, {});
        moduleInstanceMock = {};
        moduleInstanceMock.accounts = accountsMock;

        method = new SofGetAccountsMethod({}, {}, moduleInstanceMock);
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(GetAccountsMethod);
    });

    it('calls execute with unlocked accounts', async () => {
        const response = await method.execute();

        expect(response).toEqual(['0x0']);
    });
});
