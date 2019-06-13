import {Sof} from 'susyweb-sof';
import {Shh} from 'susyweb-shh';
import {Network} from 'susyweb-net';
import {Personal} from 'susyweb-sof-personal';
import {AbstractSusyWebModule} from 'susyweb-core';
import * as Utils from 'susyweb-utils';
import SusyWeb from '../../src/SusyWeb';

// Mocks
jest.mock('susyweb-sof');
jest.mock('susyweb-shh');
jest.mock('susyweb-net');
jest.mock('susyweb-sof-personal');
jest.mock('susyweb-utils');

/**
 * SusyWeb test
 */
describe('SusyWebTest', () => {
    let susyweb;

    beforeEach(() => {
        susyweb = new SusyWeb('http://', {});
    });

    it('constructor check', () => {
        expect(susyweb.sof).toBeInstanceOf(Sof);

        expect(susyweb.shh).toBeInstanceOf(Shh);

        expect(susyweb).toBeInstanceOf(AbstractSusyWebModule);
    });

    it('sets the defaultGasPrice property', () => {
        susyweb.defaultGasPrice = 10;

        expect(susyweb.defaultGasPrice).toEqual(10);

        expect(Sof.mock.instances[0].defaultGasPrice).toEqual(10);

        expect(Shh.mock.instances[0].defaultGasPrice).toEqual(10);
    });

    it('sets the defaultGas property', () => {
        susyweb.defaultGas = 10;

        expect(susyweb.defaultGas).toEqual(10);

        expect(Sof.mock.instances[0].defaultGas).toEqual(10);

        expect(Shh.mock.instances[0].defaultGas).toEqual(10);
    });

    it('sets the transactionBlockTimeout property', () => {
        susyweb.transactionBlockTimeout = 10;

        expect(susyweb.transactionBlockTimeout).toEqual(10);

        expect(Sof.mock.instances[0].transactionBlockTimeout).toEqual(10);

        expect(Shh.mock.instances[0].transactionBlockTimeout).toEqual(10);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        susyweb.transactionConfirmationBlocks = 10;

        expect(susyweb.transactionConfirmationBlocks).toEqual(10);

        expect(Sof.mock.instances[0].transactionConfirmationBlocks).toEqual(10);

        expect(Shh.mock.instances[0].transactionConfirmationBlocks).toEqual(10);
    });

    it('sets the transactionPollingTimeout property', () => {
        susyweb.transactionPollingTimeout = 10;

        expect(susyweb.transactionPollingTimeout).toEqual(10);

        expect(Sof.mock.instances[0].transactionPollingTimeout).toEqual(10);

        expect(Shh.mock.instances[0].transactionPollingTimeout).toEqual(10);
    });

    it('sets the defaultAccount property', () => {
        Utils.toChecksumAddress.mockReturnValue('0x2');

        susyweb.defaultAccount = '0x1';

        expect(susyweb.defaultAccount).toEqual('0x2');

        expect(Sof.mock.instances[0].defaultAccount).toEqual('0x1');

        expect(Shh.mock.instances[0].defaultAccount).toEqual('0x1');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('0x1');
    });

    it('sets the defaultBlock property', () => {
        susyweb.defaultBlock = 10;

        expect(susyweb.defaultBlock).toEqual(10);

        expect(Sof.mock.instances[0].defaultBlock).toEqual(10);

        expect(Shh.mock.instances[0].defaultBlock).toEqual(10);
    });

    it('calls setProvider and returns true', () => {
        const sofMock = Sof.mock.instances[0];

        const shhMock = Shh.mock.instances[0];

        sofMock.setProvider = jest.fn().mockReturnValueOnce(true);
        shhMock.setProvider = jest.fn().mockReturnValueOnce(true);

        expect(susyweb.setProvider('http://localhost', 'net')).toEqual(true);

        expect(susyweb.currentProvider.host).toEqual('http://localhost');

        expect(sofMock.setProvider).toHaveBeenCalledWith('http://localhost', 'net');

        expect(shhMock.setProvider).toHaveBeenCalledWith('http://localhost', 'net');
    });

    it('calls the static modules property and gets the expected object', () => {
        const modules = SusyWeb.modules;

        const sof = new modules.Sof('http://', 'net');

        const net = new modules.Net('http://', 'net');

        const personal = new modules.Personal('http://', 'net');

        const shh = new modules.Shh('http://', 'net');

        expect(sof).toBeInstanceOf(Sof);

        expect(net).toBeInstanceOf(Network);

        expect(personal).toBeInstanceOf(Personal);

        expect(shh).toBeInstanceOf(Shh);
    });

    it('calls the static givenProvider property and gets the result', () => {
        expect(SusyWeb.givenProvider).toEqual(null);
    });
});
