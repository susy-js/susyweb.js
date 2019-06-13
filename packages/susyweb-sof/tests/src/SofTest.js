import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import {AbstractSubscription, LogSubscription} from 'susyweb-core-subscriptions';
import {AbiCoder} from 'susyweb-sof-abi';
import {Accounts} from 'susyweb-sof-accounts';
import {Ens} from 'susyweb-sof-ens';
import {Iban} from 'susyweb-sof-iban';
import {Personal} from 'susyweb-sof-personal';
import {Network} from 'susyweb-net';
import {ContractModuleFactory} from 'susyweb-sof-contract';
import MethodFactory from '../../src/factories/MethodFactory';
import TransactionSigner from '../../src/signers/TransactionSigner';
import SubscriptionsFactory from '../../src/factories/SubscriptionsFactory';
import Sof from '../../src/Sof';

// Mocks
jest.mock('susyweb-core');
jest.mock('susyweb-core-subscriptions');
jest.mock('susyweb-sof-abi');
jest.mock('susyweb-sof-accounts');
jest.mock('susyweb-sof-ens');
jest.mock('susyweb-sof-iban');
jest.mock('susyweb-sof-personal');
jest.mock('susyweb-net');
jest.mock('susyweb-sof-contract');
jest.mock('susyweb-utils');
jest.mock('susyweb-core-helpers');
jest.mock('../../src/factories/MethodFactory');
jest.mock('../../src/signers/TransactionSigner');
jest.mock('../../src/factories/SubscriptionsFactory');

/**
 * Sof test
 */
describe('SofTest', () => {
    let sof,
        providerMock,
        methodFactoryMock,
        contractModuleFactoryMock,
        networkMock,
        accountsMock,
        personalMock,
        abiCoderMock,
        ensMock,
        subscriptionsFactoryMock,
        transactionSignerMock;

    beforeEach(() => {
        providerMock = {send: jest.fn(), clearSubscriptions: jest.fn()};

        new MethodFactory();
        methodFactoryMock = MethodFactory.mock.instances[0];

        new ContractModuleFactory();
        contractModuleFactoryMock = ContractModuleFactory.mock.instances[0];

        new Network();
        networkMock = Network.mock.instances[0];

        new Accounts();
        accountsMock = Accounts.mock.instances[0];

        new Personal();
        personalMock = Personal.mock.instances[0];

        new AbiCoder();
        abiCoderMock = AbiCoder.mock.instances[0];

        new Ens();
        ensMock = Ens.mock.instances[0];

        new SubscriptionsFactory();
        subscriptionsFactoryMock = SubscriptionsFactory.mock.instances[0];

        new TransactionSigner();
        transactionSignerMock = TransactionSigner.mock.instances[0];

        sof = new Sof(
            providerMock,
            methodFactoryMock,
            networkMock,
            accountsMock,
            personalMock,
            Iban,
            abiCoderMock,
            ensMock,
            Utils,
            formatters,
            subscriptionsFactoryMock,
            contractModuleFactoryMock,
            {transactionSigner: transactionSignerMock},
            {}
        );
    });

    it('constructor check', () => {
        expect(sof.contractModuleFactory).toEqual(contractModuleFactoryMock);

        expect(sof.net).toEqual(networkMock);

        expect(sof.accounts).toEqual(accountsMock);

        expect(sof.personal).toEqual(personalMock);

        expect(sof.Iban).toEqual(Iban);

        expect(sof.abi).toEqual(abiCoderMock);

        expect(sof.ens).toEqual(ensMock);

        expect(sof.utils).toEqual(Utils);

        expect(sof.formatters).toEqual(formatters);

        expect(sof.initiatedContracts).toEqual([]);

        expect(sof.Contract).toBeInstanceOf(Function);
    });

    it('sets the defaultGasPrice property', () => {
        sof.initiatedContracts = [{defaultGasPrice: 20}];

        sof.defaultGasPrice = 10;

        expect(sof.initiatedContracts[0].defaultGasPrice).toEqual(10);

        expect(sof.defaultGasPrice).toEqual(10);

        expect(networkMock.defaultGasPrice).toEqual(10);

        expect(personalMock.defaultGasPrice).toEqual(10);
    });

    it('sets the defaultGas property', () => {
        sof.initiatedContracts = [{defaultGas: 20}];
        sof.defaultGas = 10;

        expect(sof.initiatedContracts[0].defaultGas).toEqual(10);

        expect(sof.defaultGas).toEqual(10);

        expect(networkMock.defaultGas).toEqual(10);

        expect(personalMock.defaultGas).toEqual(10);
    });

    it('sets the transactionBlockTimeout property', () => {
        sof.initiatedContracts = [{transactionBlockTimeout: 20}];
        sof.transactionBlockTimeout = 10;

        expect(sof.initiatedContracts[0].transactionBlockTimeout).toEqual(10);

        expect(sof.transactionBlockTimeout).toEqual(10);

        expect(networkMock.transactionBlockTimeout).toEqual(10);

        expect(personalMock.transactionBlockTimeout).toEqual(10);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        sof.initiatedContracts = [{transactionConfirmationBlocks: 20}];
        sof.transactionConfirmationBlocks = 10;

        expect(sof.initiatedContracts[0].transactionConfirmationBlocks).toEqual(10);

        expect(sof.transactionConfirmationBlocks).toEqual(10);

        expect(networkMock.transactionConfirmationBlocks).toEqual(10);

        expect(personalMock.transactionConfirmationBlocks).toEqual(10);
    });

    it('sets the transactionPollingTimeout property', () => {
        sof.initiatedContracts = [{transactionPollingTimeout: 20}];
        sof.transactionPollingTimeout = 10;

        expect(sof.initiatedContracts[0].transactionPollingTimeout).toEqual(10);

        expect(sof.transactionPollingTimeout).toEqual(10);

        expect(networkMock.transactionPollingTimeout).toEqual(10);

        expect(personalMock.transactionPollingTimeout).toEqual(10);
    });

    it('sets the defaultAccount property', () => {
        sof.initiatedContracts = [{defaultAccount: '0x0'}];

        Utils.toChecksumAddress.mockReturnValueOnce('0x1');

        sof.defaultAccount = '0x1';

        expect(sof.initiatedContracts[0].defaultAccount).toEqual('0x1');

        expect(sof.defaultAccount).toEqual('0x1');

        expect(networkMock.defaultAccount).toEqual('0x1');

        expect(personalMock.defaultAccount).toEqual('0x1');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('0x1');
    });

    it('sets the defaultBlock property', () => {
        sof.initiatedContracts = [{defaultBlock: 20}];
        sof.defaultBlock = 10;

        expect(sof.initiatedContracts[0].defaultBlock).toEqual(10);

        expect(sof.defaultBlock).toEqual(10);

        expect(networkMock.defaultBlock).toEqual(10);

        expect(personalMock.defaultBlock).toEqual(10);
    });

    it('calls subscribe wih "logs" as type', () => {
        subscriptionsFactoryMock.createLogSubscription = jest.fn();

        new LogSubscription();
        const logSubscriptionMock = LogSubscription.mock.instances[0];

        logSubscriptionMock.subscribe.mockReturnValueOnce(logSubscriptionMock);

        subscriptionsFactoryMock.getSubscription.mockReturnValueOnce(logSubscriptionMock);

        const callback = () => {};

        expect(sof.subscribe('logs', {}, callback)).toBeInstanceOf(LogSubscription);

        expect(subscriptionsFactoryMock.getSubscription).toHaveBeenCalledWith(sof, 'logs', {});

        expect(logSubscriptionMock.subscribe).toHaveBeenCalledWith(callback);
    });

    it('calls subscribe wih "newBlockHeaders" as type', () => {
        subscriptionsFactoryMock.createNewHeadsSubscription = jest.fn();

        new AbstractSubscription();
        const abstractSubscriptionMock = AbstractSubscription.mock.instances[0];

        abstractSubscriptionMock.subscribe.mockReturnValueOnce(abstractSubscriptionMock);

        subscriptionsFactoryMock.getSubscription.mockReturnValueOnce(abstractSubscriptionMock);

        const callback = () => {};

        expect(sof.subscribe('newBlockHeaders', {}, callback)).toBeInstanceOf(AbstractSubscription);

        expect(subscriptionsFactoryMock.getSubscription).toHaveBeenCalledWith(sof, 'newBlockHeaders', {});

        expect(abstractSubscriptionMock.subscribe).toHaveBeenCalledWith(callback);
    });

    it('calls subscribe wih "pendingTransactions" as type', () => {
        subscriptionsFactoryMock.createNewPendingTransactionsSubscription = jest.fn();

        new AbstractSubscription();
        const abstractSubscriptionMock = AbstractSubscription.mock.instances[0];

        abstractSubscriptionMock.subscribe.mockReturnValueOnce(abstractSubscriptionMock);

        subscriptionsFactoryMock.getSubscription.mockReturnValueOnce(abstractSubscriptionMock);

        const callback = () => {};

        expect(sof.subscribe('pendingTransactions', {}, callback)).toBeInstanceOf(AbstractSubscription);

        expect(subscriptionsFactoryMock.getSubscription).toHaveBeenCalledWith(sof, 'pendingTransactions', {});

        expect(abstractSubscriptionMock.subscribe).toHaveBeenCalledWith(callback);
    });

    it('calls subscribe wih "syncing" as type', () => {
        subscriptionsFactoryMock.createSyncingSubscription = jest.fn();

        new AbstractSubscription();
        const abstractSubscriptionMock = AbstractSubscription.mock.instances[0];

        abstractSubscriptionMock.subscribe.mockReturnValueOnce(abstractSubscriptionMock);

        subscriptionsFactoryMock.getSubscription.mockReturnValueOnce(abstractSubscriptionMock);

        const callback = () => {};

        expect(sof.subscribe('syncing', {}, callback)).toBeInstanceOf(AbstractSubscription);

        expect(subscriptionsFactoryMock.getSubscription).toHaveBeenCalledWith(sof, 'syncing', {});

        expect(abstractSubscriptionMock.subscribe).toHaveBeenCalledWith(callback);
    });

    it('calls the Contract factory method with options from the constructor', () => {
        contractModuleFactoryMock.createContract.mockReturnValueOnce({});

        sof.currentProvider = providerMock;
        expect(new sof.Contract([], '0x0', {data: '', from: '0x0', gas: '0x0', gasPrice: '0x0'})).toEqual({});

        expect(sof.initiatedContracts).toHaveLength(1);

        expect(contractModuleFactoryMock.createContract).toHaveBeenCalledWith(providerMock, sof.accounts, [], '0x0', {
            defaultAccount: '0x0',
            defaultBlock: sof.defaultBlock,
            defaultGas: '0x0',
            defaultGasPrice: '0x0',
            transactionBlockTimeout: sof.transactionBlockTimeout,
            transactionConfirmationBlocks: sof.transactionConfirmationBlocks,
            transactionPollingTimeout: sof.transactionPollingTimeout,
            transactionSigner: sof.transactionSigner,
            data: ''
        });
    });

    it('calls the Contract factory method without options from the constructor', () => {
        contractModuleFactoryMock.createContract.mockReturnValueOnce({});

        sof.currentProvider = providerMock;
        expect(new sof.Contract([], '0x0', {})).toEqual({});

        expect(sof.initiatedContracts).toHaveLength(1);

        expect(contractModuleFactoryMock.createContract).toHaveBeenCalledWith(providerMock, sof.accounts, [], '0x0', {
            defaultAccount: sof.defaultAccount,
            defaultBlock: sof.defaultBlock,
            defaultGas: sof.defaultGas,
            defaultGasPrice: sof.defaultGasPrice,
            transactionBlockTimeout: sof.transactionBlockTimeout,
            transactionConfirmationBlocks: sof.transactionConfirmationBlocks,
            transactionPollingTimeout: sof.transactionPollingTimeout,
            transactionSigner: sof.transactionSigner,
            data: undefined
        });
    });
});
