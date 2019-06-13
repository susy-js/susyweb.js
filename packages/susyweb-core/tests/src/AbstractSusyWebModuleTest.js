import AbstractSusyWebModule from '../../src/AbstractSusyWebModule';
import MethodFactory from '../__mocks__/MethodFactory';

/**
 * AbstractSusyWebModule test
 */
describe('AbstractSusyWebModuleTest', () => {
    let abstractSusyWebModule, methodFactoryMock;

    beforeEach(() => {
        methodFactoryMock = new MethodFactory();
        methodFactoryMock.hasMethod = jest.fn(() => {
            return false;
        });

        abstractSusyWebModule = new AbstractSusyWebModule(
            'http://localhost:8545',
            {
                defaultAccount: '0x03c9a938ff7f54090d0d99e2c6f80380510ea078',
                defaultBlock: 'latest',
                defaultGasPrice: 100,
                defaultGas: 100
            },
            methodFactoryMock,
            {}
        );
    });

    it('constructor check', () => {
        expect(abstractSusyWebModule.defaultAccount).toEqual('0x03C9A938fF7f54090d0d99e2c6f80380510Ea078');

        expect(abstractSusyWebModule.defaultBlock).toEqual('latest');

        expect(abstractSusyWebModule.transactionBlockTimeout).toEqual(50);

        expect(abstractSusyWebModule.transactionConfirmationBlocks).toEqual(24);

        expect(abstractSusyWebModule.transactionPollingTimeout).toEqual(750);

        expect(abstractSusyWebModule.defaultGasPrice).toEqual(100);

        expect(abstractSusyWebModule.defaultGas).toEqual(100);

        expect(abstractSusyWebModule.BatchRequest).toBeInstanceOf(Function);

        expect(abstractSusyWebModule.currentProvider.host).toEqual('http://localhost:8545');
    });

    it('gets the BatchRequest property and it is of type BatchRequest', () => {
        const batchRequest = new abstractSusyWebModule.BatchRequest();

        expect(batchRequest.constructor.name).toEqual('BatchRequest');

        expect(batchRequest.add).toBeInstanceOf(Function);
    });

    it('sets the defaultAccount property validates the address and throws error', () => {
        try {
            abstractSusyWebModule.defaultAccount = '0';
        } catch (error) {
            expect(error.message).toEqual('Given address "0" is not a valid Sophon address.');
        }
    });

    it('sets the defaultAccount property and validates the address', () => {
        abstractSusyWebModule.defaultAccount = '0x03c9a938ff7f54090d0d99e2c6f80380510ea078';
        expect(abstractSusyWebModule.defaultAccount).toEqual('0x03C9A938fF7f54090d0d99e2c6f80380510Ea078');
    });

    it('sets the defaultBlock property', () => {
        abstractSusyWebModule.defaultBlock = 'latest';
        expect(abstractSusyWebModule.defaultBlock).toEqual('latest');
    });

    it('sets the transactionBlockTimeout property', () => {
        abstractSusyWebModule.transactionBlockTimeout = 0;
        expect(abstractSusyWebModule.transactionBlockTimeout).toEqual(0);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        abstractSusyWebModule.transactionConfirmationBlocks = 0;
        expect(abstractSusyWebModule.transactionConfirmationBlocks).toEqual(0);
    });

    it('sets the transactionPollingTimeout property', () => {
        abstractSusyWebModule.transactionPollingTimeout = 0;
        expect(abstractSusyWebModule.transactionPollingTimeout).toEqual(0);
    });

    it('sets the defaultGasPrice property', () => {
        abstractSusyWebModule.defaultGasPrice = 0;
        expect(abstractSusyWebModule.defaultGasPrice).toEqual(0);
    });

    it('sets the defaultGas property', () => {
        abstractSusyWebModule.defaultGas = 0;
        expect(abstractSusyWebModule.defaultGas).toEqual(0);
    });

    it('gets the currentProvider property who is read-only', () => {
        try {
            abstractSusyWebModule.currentProvider = false;
        } catch (error) {
            expect(error.message).toEqual('The property currentProvider is read-only!');
        }
    });

    it('calls setProvider returns true and sets the provider as currentProvider', () => {
        expect(abstractSusyWebModule.setProvider('http://newhost')).toEqual(true);

        expect(abstractSusyWebModule.currentProvider.host).toEqual('http://newhost');
    });

    it('calls setProvider and throws an error because of the resolver', () => {
        expect(() => {
            abstractSusyWebModule.setProvider({nope: true});
        }).toThrow('Invalid provider');
    });

    it('calls setProvider and returns false because of the equal host', () => {
        expect(abstractSusyWebModule.setProvider('http://localhost:8545')).toEqual(false);
    });

    it('calls setProvider and returns false because it is the same provider', () => {
        expect(abstractSusyWebModule.setProvider('http://localhost:8545')).toEqual(false);
    });

    it('calls isSameProvider without a currentProvider set and returns false', () => {
        const provider = {
            constructor: {
                name: 'HttpProvider'
            },
            host: 'HOST1'
        };

        abstractSusyWebModule.setProvider(false);
        expect(abstractSusyWebModule.isSameProvider(provider)).toEqual(false);
    });

    it('calls isSameProvider and returns false', () => {
        const provider = {
            constructor: {
                name: 'HttpProvider'
            },
            host: 'HOST1'
        };

        expect(abstractSusyWebModule.isSameProvider(provider)).toEqual(false);
    });

    it('calls isSameProvider and returns true', () => {
        const provider = {
            constructor: {
                name: 'HttpProvider'
            },
            host: 'http://localhost:8545'
        };

        expect(abstractSusyWebModule.isSameProvider(provider)).toEqual(true);
    });

    it('initiates a HttpProvider with the providers property of the module', () => {
        expect(new AbstractSusyWebModule.providers.HttpProvider('http://localhost:7545', {}).host).toEqual(
            'http://localhost:7545'
        );
    });

    it('checks if all providers exists on the static providers property', () => {
        expect(AbstractSusyWebModule.providers.HttpProvider).toBeInstanceOf(Function);
        expect(AbstractSusyWebModule.providers.WebsocketProvider).toBeInstanceOf(Function);
        expect(AbstractSusyWebModule.providers.IpcProvider).toBeInstanceOf(Function);
    });
});
