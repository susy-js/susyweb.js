import MistSophonProvider from '../../../src/providers/MistSophonProvider';

/**
 * MistSophonProvider test
 */
describe('MistSophonProviderTest', () => {
    let mistSophonProvider, sophonProvider;

    beforeEach(() => {
        sophonProvider = {on: jest.fn(), isConnected: jest.fn()};
        mistSophonProvider = new MistSophonProvider(sophonProvider);
    });

    it('constructor check', () => {
        expect(mistSophonProvider.connection).toEqual(sophonProvider);

        expect(mistSophonProvider.host).toEqual('mist');

        expect(mistSophonProvider.timeout).toEqual(null);
    });

    it('calls registerEventListeners and the expected listeners will be registered', () => {
        mistSophonProvider.registerEventListeners();

        expect(sophonProvider.on.mock.calls[0][0]).toEqual('data');
        expect(sophonProvider.on.mock.calls[0][1]).toBeInstanceOf(Function);

        expect(sophonProvider.on.mock.calls[1][0]).toEqual('error');
        expect(sophonProvider.on.mock.calls[1][1]).toBeInstanceOf(Function);

        expect(sophonProvider.on.mock.calls[2][0]).toEqual('connect');
        expect(sophonProvider.on.mock.calls[2][1]).toBeInstanceOf(Function);

        expect(sophonProvider.on.mock.calls[3][0]).toEqual('connect');
        expect(sophonProvider.on.mock.calls[3][1]).toBeInstanceOf(Function);

        expect(sophonProvider.on.mock.calls[4][0]).toEqual('end');
        expect(sophonProvider.on.mock.calls[4][1]).toBeInstanceOf(Function);
    });
    it('calls disconnect and returns true', () => {
        expect(mistSophonProvider.disconnect()).toEqual(true);
    });

    it('calls connected and returns true', () => {
        sophonProvider.isConnected.mockReturnValueOnce(true);

        expect(mistSophonProvider.connected).toEqual(true);

        expect(sophonProvider.isConnected).toHaveBeenCalled();
    });

    it('calls removeAllListeners and executes the expected methods', () => {
        sophonProvider.removeListener = jest.fn();

        mistSophonProvider.removeAllListeners('socket_message');
        mistSophonProvider.removeAllListeners('socket_error');
        mistSophonProvider.removeAllListeners('socket_connect');
        mistSophonProvider.removeAllListeners('socket_ready');
        mistSophonProvider.removeAllListeners('socket_close');

        expect(sophonProvider.removeListener).toHaveBeenNthCalledWith(1, 'data', mistSophonProvider.onMessage);
        expect(sophonProvider.removeListener).toHaveBeenNthCalledWith(2, 'error', mistSophonProvider.onError);
        expect(sophonProvider.removeListener).toHaveBeenNthCalledWith(3, 'connect', mistSophonProvider.onConnect);
        expect(sophonProvider.removeListener).toHaveBeenNthCalledWith(4, 'connect', mistSophonProvider.onConnect);
        expect(sophonProvider.removeListener).toHaveBeenNthCalledWith(5, 'end', mistSophonProvider.onClose);
    });

    it('calls sendPayload and returns with an resolved promise', async () => {
        sophonProvider.send = jest.fn((payload, callback) => {
            expect(callback).toBeInstanceOf(Function);

            expect(payload).toEqual({id: 0});

            callback(false, true);
        });

        const response = await mistSophonProvider.sendPayload({id: 0});

        expect(response).toEqual(true);

        expect(sophonProvider.send).toHaveBeenCalled();
    });

    it('calls sendPayload and returns with an rejected promise', async () => {
        sophonProvider.send = jest.fn((payload, callback) => {
            expect(callback).toBeInstanceOf(Function);

            expect(payload).toEqual({id: 0});

            callback(true, false);
        });

        await expect(mistSophonProvider.sendPayload({id: 0})).rejects.toEqual(true);

        expect(sophonProvider.send).toHaveBeenCalled();
    });
});
