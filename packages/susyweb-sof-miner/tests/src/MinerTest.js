import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import {Network} from 'susyweb-net';
import {AbstractSusyWebModule} from 'susyweb-core';
import MethodFactory from '../../src/factories/MethodFactory';
import Miner from '../../src/Miner';

// Mocks
jest.mock('susyweb-utils');
jest.mock('susyweb-core-helpers');
jest.mock('susyweb-net');

/**
 * Miner test
 */
describe('MinerTest', () => {
    let miner, providerMock, methodFactory, networkMock;

    beforeEach(() => {
        providerMock = {send: jest.fn(), clearSubscriptions: jest.fn()};
        methodFactory = new MethodFactory(Utils, formatters);

        new Network();
        networkMock = Network.mock.instances[0];

        miner = new Miner(providerMock, methodFactory, networkMock, Utils, formatters, {}, {});
    });

    it('constructor check', () => {
        expect(miner.net).toEqual(networkMock);

        expect(miner.utils).toEqual(Utils);

        expect(miner.formatters).toEqual(formatters);

        expect(miner).toBeInstanceOf(AbstractSusyWebModule);
    });

    it('calls setProvider and returns true', () => {
        networkMock.setProvider = jest.fn();
        networkMock.setProvider.mockReturnValueOnce(true);

        expect(miner.setProvider(providerMock, 'net')).toEqual(true);

        expect(networkMock.setProvider).toHaveBeenCalledWith(providerMock, 'net');
    });

    it('sets the defaultGasPrice property', () => {
        miner.defaultGasPrice = 10;

        expect(miner.defaultGasPrice).toEqual(10);

        expect(networkMock.defaultGasPrice).toEqual(10);
    });

    it('sets the defaultGas property', () => {
        miner.defaultGas = 10;

        expect(miner.defaultGas).toEqual(10);

        expect(networkMock.defaultGas).toEqual(10);
    });

    it('sets the transactionBlockTimeout property', () => {
        miner.transactionBlockTimeout = 10;

        expect(miner.transactionBlockTimeout).toEqual(10);

        expect(networkMock.transactionBlockTimeout).toEqual(10);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        miner.transactionConfirmationBlocks = 10;

        expect(miner.transactionConfirmationBlocks).toEqual(10);

        expect(networkMock.transactionConfirmationBlocks).toEqual(10);
    });

    it('sets the transactionPollingTimeout property', () => {
        miner.transactionPollingTimeout = 10;

        expect(miner.transactionPollingTimeout).toEqual(10);

        expect(networkMock.transactionPollingTimeout).toEqual(10);
    });

    it('sets the defaultAccount property', () => {
        Utils.toChecksumAddress.mockReturnValue('0x2');

        miner.defaultAccount = '0x0';

        expect(miner.defaultAccount).toEqual('0x2');

        expect(networkMock.defaultAccount).toEqual('0x0');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('0x0');
    });

    it('sets the defaultBlock property', () => {
        miner.defaultBlock = 1;

        expect(miner.defaultBlock).toEqual(1);

        expect(networkMock.defaultBlock).toEqual(1);
    });
});
