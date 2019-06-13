import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import {Network} from 'susyweb-net';
import {AbiCoder} from 'susyweb-sof-abi';
import Registry from '../../src/contracts/Registry';
import namehash from 'sof-ens-namehash';
import Ens from '../../src/Ens';
import EnsModuleFactory from '../../src/factories/EnsModuleFactory';

// Mocks
jest.mock('susyweb-net');
jest.mock('susyweb-utils');
jest.mock('susyweb-sof-abi');
jest.mock('susyweb-core-helpers');
jest.mock('sof-ens-namehash');
jest.mock('../../src/factories/EnsModuleFactory');
jest.mock('../../src/contracts/Registry');

/**
 * Ens test
 */
describe('EnsTest', () => {
    let ens, registryMock, ensModuleFactoryMock, abiCoderMock, networkMock;

    beforeEach(() => {
        new Registry();
        registryMock = Registry.mock.instances[0];

        new EnsModuleFactory();
        ensModuleFactoryMock = EnsModuleFactory.mock.instances[0];
        ensModuleFactoryMock.createRegistry.mockReturnValue(registryMock);

        new AbiCoder();
        abiCoderMock = AbiCoder.mock.instances[0];

        new Network();
        networkMock = Network.mock.instances[0];

        namehash.hash = jest.fn(() => {
            return '0x0';
        });

        ens = new Ens(
            {send: jest.fn(), clearSubscriptions: jest.fn()},
            {},
            ensModuleFactoryMock,
            {},
            {},
            abiCoderMock,
            Utils,
            formatters,
            networkMock,
            {}
        );
    });

    it('constructor check', () => {
        expect(ens.registry).toEqual(registryMock);

        expect(ensModuleFactoryMock.createRegistry).toHaveBeenCalledWith(
            ens.currentProvider,
            ens.contractModuleFactory,
            ens.accounts,
            ens.abiCoder,
            ens.utils,
            ens.formatters,
            ens.registryOptions,
            ens.net
        );

        expect(ens.ensModuleFactory).toEqual(ensModuleFactoryMock);

        expect(ens.contractModuleFactory).toEqual({});

        expect(ens.abiCoder).toEqual(abiCoderMock);

        expect(ens.utils).toEqual(Utils);

        expect(ens.registryOptions).toEqual({});

        expect(ens.net).toEqual(networkMock);
    });

    it('calls resolver and returns with a resolved promise', async () => {
        registryMock.resolver.mockReturnValueOnce(Promise.resolve(true));

        await expect(ens.resolver('name')).resolves.toEqual(true);
    });

    it('calls supportsInterface and returns a resolved promise', async () => {
        const call = jest.fn((callback) => {
            expect(callback).toBeInstanceOf(Function);

            return Promise.resolve(true);
        });

        const resolver = {
            methods: {
                supportsInterface: jest.fn(() => {
                    return {call: call};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        await expect(ens.supportsInterface('name', 'interfaceId', () => {})).resolves.toEqual(true);

        expect(registryMock.resolver).toHaveBeenCalledWith('name');

        expect(resolver.methods.supportsInterface).toHaveBeenCalled();
    });

    it('calls getAddress and returns a resolved promise', async () => {
        const call = jest.fn((callback) => {
            expect(callback).toBeInstanceOf(Function);

            return Promise.resolve('address');
        });

        const resolver = {
            methods: {
                addr: jest.fn(() => {
                    return {call: call};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        await expect(ens.getAddress('name', () => {})).resolves.toEqual('address');

        expect(registryMock.resolver).toHaveBeenCalledWith('name');

        expect(resolver.methods.addr).toHaveBeenCalled();
    });

    it('calls setAddress and returns a resolved PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 2:
                            setTimeout(() => {
                                callback({});
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setAddr: jest.fn((address) => {
                    expect(address).toEqual('0x0');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setAddress('name', '0x0', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('receipt', (receipt) => {
            expect(receipt).toEqual({});

            expect(callback).toHaveBeenCalledWith(receipt);
        });

        await expect(promiEvent).resolves.toEqual({});

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls setAddress and returns a rejected PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 3:
                            setTimeout(() => {
                                callback(false);
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setAddr: jest.fn((address) => {
                    expect(address).toEqual('0x0');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setAddress('name', '0x0', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('error', (error) => {
            expect(error).toEqual(false);

            expect(callback).toHaveBeenCalledWith(error);
        });

        await expect(promiEvent).rejects.toEqual(false);

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls getPubkey and returns a resolved promise', async () => {
        const call = jest.fn((callback) => {
            expect(callback).toBeInstanceOf(Function);

            return Promise.resolve('pubkey');
        });

        const resolver = {
            methods: {
                pubkey: jest.fn(() => {
                    return {call: call};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        await expect(ens.getPubkey('name', () => {})).resolves.toEqual('pubkey');

        expect(registryMock.resolver).toHaveBeenCalledWith('name');

        expect(resolver.methods.pubkey).toHaveBeenCalled();
    });

    it('calls setPubkey and returns a resolved PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 2:
                            setTimeout(() => {
                                callback({});
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setPubkey: jest.fn((node, x, y) => {
                    expect(node).toEqual('0x0');

                    expect(x).toEqual('x');

                    expect(y).toEqual('y');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setPubkey('name', 'x', 'y', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('receipt', (receipt) => {
            expect(receipt).toEqual({});

            expect(callback).toHaveBeenCalledWith(receipt);
        });

        await expect(promiEvent).resolves.toEqual({});

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls setPubkey and returns a rejected PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 3:
                            setTimeout(() => {
                                callback(false);
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setPubkey: jest.fn((node, x, y) => {
                    expect(node).toEqual('0x0');

                    expect(x).toEqual('x');

                    expect(y).toEqual('y');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setPubkey('name', 'x', 'y', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('error', (error) => {
            expect(error).toEqual(false);

            expect(callback).toHaveBeenCalledWith(error);
        });

        await expect(promiEvent).rejects.toEqual(false);

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls getText and returns a resolved promise', async () => {
        const call = jest.fn((callback) => {
            expect(callback).toBeInstanceOf(Function);

            return Promise.resolve('text');
        });

        const resolver = {
            methods: {
                text: jest.fn(() => {
                    return {call: call};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        await expect(ens.getText('name', 'key', () => {})).resolves.toEqual('text');

        expect(registryMock.resolver).toHaveBeenCalledWith('name');

        expect(resolver.methods.text).toHaveBeenCalled();
    });

    it('calls setText and returns a resolved PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 2:
                            setTimeout(() => {
                                callback({});
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setText: jest.fn((node, x, y) => {
                    expect(node).toEqual('0x0');

                    expect(x).toEqual('key');

                    expect(y).toEqual('value');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setText('name', 'key', 'value', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('receipt', (receipt) => {
            expect(receipt).toEqual({});

            expect(callback).toHaveBeenCalledWith(receipt);
        });

        await expect(promiEvent).resolves.toEqual({});

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls setText and returns a rejected PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 3:
                            setTimeout(() => {
                                callback(false);
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setText: jest.fn((node, x, y) => {
                    expect(node).toEqual('0x0');

                    expect(x).toEqual('key');

                    expect(y).toEqual('value');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setText('name', 'key', 'value', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('error', (error) => {
            expect(error).toEqual(false);

            expect(callback).toHaveBeenCalledWith(error);
        });

        await expect(promiEvent).rejects.toEqual(false);

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls getContent and returns a resolved promise', async () => {
        const call = jest.fn((callback) => {
            expect(callback).toBeInstanceOf(Function);

            return Promise.resolve('content');
        });

        const resolver = {
            methods: {
                content: jest.fn(() => {
                    return {call: call};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        await expect(ens.getContent('name', () => {})).resolves.toEqual('content');

        expect(registryMock.resolver).toHaveBeenCalledWith('name');

        expect(resolver.methods.content).toHaveBeenCalled();
    });

    it('calls setContent and returns a resolved PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 2:
                            setTimeout(() => {
                                callback({});
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setContent: jest.fn((node, hash) => {
                    expect(node).toEqual('0x0');

                    expect(hash).toEqual('hash');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setContent('name', 'hash', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('receipt', (receipt) => {
            expect(receipt).toEqual({});

            expect(callback).toHaveBeenCalledWith(receipt);
        });

        await expect(promiEvent).resolves.toEqual({});

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls setContent and returns a rejected PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 3:
                            setTimeout(() => {
                                callback(false);
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setContent: jest.fn((node, hash) => {
                    expect(node).toEqual('0x0');

                    expect(hash).toEqual('hash');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setContent('name', 'hash', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('error', (error) => {
            expect(error).toEqual(false);

            expect(callback).toHaveBeenCalledWith(error);
        });

        await expect(promiEvent).rejects.toEqual(false);

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls getMultihash and returns a resolved promise', async () => {
        const call = jest.fn((callback) => {
            expect(callback).toBeInstanceOf(Function);

            return Promise.resolve('content');
        });

        const resolver = {
            methods: {
                multihash: jest.fn(() => {
                    return {call: call};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        await expect(ens.getMultihash('name', () => {})).resolves.toEqual('content');

        expect(registryMock.resolver).toHaveBeenCalledWith('name');

        expect(resolver.methods.multihash).toHaveBeenCalled();
    });

    it('calls setMultihash and returns a resolved PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 2:
                            setTimeout(() => {
                                callback({});
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setMultihash: jest.fn((node, hash) => {
                    expect(node).toEqual('0x0');

                    expect(hash).toEqual('hash');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setMultihash('name', 'hash', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('receipt', (receipt) => {
            expect(receipt).toEqual({});

            expect(callback).toHaveBeenCalledWith(receipt);
        });

        await expect(promiEvent).resolves.toEqual({});

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls setMultihash and returns a rejected PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 3:
                            setTimeout(() => {
                                callback(false);
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setMultihash: jest.fn((node, hash) => {
                    expect(node).toEqual('0x0');

                    expect(hash).toEqual('hash');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setMultihash('name', 'hash', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('error', (error) => {
            expect(error).toEqual(false);

            expect(callback).toHaveBeenCalledWith(error);
        });

        await expect(promiEvent).rejects.toEqual(false);

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls getContenthash and returns a resolved promise', async () => {
        const call = jest.fn((callback) => {
            expect(callback).toBeInstanceOf(Function);

            return Promise.resolve('content');
        });

        const resolver = {
            methods: {
                contenthash: jest.fn(() => {
                    return {call: call};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        await expect(ens.getContenthash('name', () => {})).resolves.toEqual('content');

        expect(registryMock.resolver).toHaveBeenCalledWith('name');

        expect(resolver.methods.contenthash).toHaveBeenCalled();
    });

    it('calls setContenthash and returns a resolved PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 2:
                            setTimeout(() => {
                                callback({});
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setContenthash: jest.fn((node, hash) => {
                    expect(node).toEqual('0x0');

                    expect(hash).toEqual('hash');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setContenthash('name', 'hash', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('receipt', (receipt) => {
            expect(receipt).toEqual({});

            expect(callback).toHaveBeenCalledWith(receipt);
        });

        await expect(promiEvent).resolves.toEqual({});

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls setContenthash and returns a rejected PromiEvent', async () => {
        const promiEventEvents = ['transactionHash', 'confirmation', 'receipt', 'error'];
        let promiEventOnCounter = 0;

        const callback = jest.fn();

        const send = jest.fn((sendOptions) => {
            expect(sendOptions).toEqual({});

            const promiEvent = {
                on: jest.fn((event, callback) => {
                    expect(event).toEqual(promiEventEvents[promiEventOnCounter]);

                    switch (promiEventOnCounter) {
                        case 0:
                            setTimeout(() => {
                                callback('hash');
                            }, 1);
                            break;
                        case 1:
                            setTimeout(() => {
                                callback(0, {});
                            }, 1);
                            break;
                        case 3:
                            setTimeout(() => {
                                callback(false);
                            }, 1);
                            break;
                    }

                    promiEventOnCounter++;

                    return promiEvent;
                })
            };

            return promiEvent;
        });

        const resolver = {
            methods: {
                setContenthash: jest.fn((node, hash) => {
                    expect(node).toEqual('0x0');

                    expect(hash).toEqual('hash');

                    return {send: send};
                })
            }
        };

        registryMock.resolver.mockReturnValueOnce(Promise.resolve(resolver));

        const promiEvent = ens.setContenthash('name', 'hash', {}, callback);

        promiEvent.on('transactionHash', (transactionHash) => {
            expect(transactionHash).toEqual('hash');
        });

        promiEvent.on('confirmation', (confirmationNumber, receipt) => {
            expect(confirmationNumber).toEqual(0);

            expect(receipt).toEqual({});
        });

        promiEvent.on('error', (error) => {
            expect(error).toEqual(false);

            expect(callback).toHaveBeenCalledWith(error);
        });

        await expect(promiEvent).rejects.toEqual(false);

        expect(callback).toHaveBeenCalled();

        expect(namehash.hash).toHaveBeenCalledWith('name');
    });

    it('calls setProvider and returns true', () => {
        const providerMock = {send: jest.fn(), clearSubscriptions: jest.fn()};

        registryMock.setProvider.mockReturnValueOnce(true);

        expect(ens.setProvider(providerMock, 'net')).toEqual(true);

        expect(registryMock.setProvider).toHaveBeenCalledWith(providerMock, 'net');
    });
});
