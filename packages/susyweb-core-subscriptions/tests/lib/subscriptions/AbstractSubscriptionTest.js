import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import AbstractSubscription from '../../../lib/subscriptions/AbstractSubscription';
import AbstractSusyWebModule from '../../__mocks__/AbstractSusyWebModule';
import SocketProvider from '../../__mocks__/SocketProvider';

// Mocks
jest.mock('susyweb-utils');
jest.mock('susyweb-core-helpers');
jest.mock('../../__mocks__/SocketProvider');

/**
 * AbstractSubscription test
 */
describe('AbstractSubscriptionTest', () => {
    let abstractSubscription, moduleInstanceMock;

    beforeEach(() => {
        moduleInstanceMock = new AbstractSusyWebModule();
        moduleInstanceMock.currentProvider = new SocketProvider();
        moduleInstanceMock.currentProvider.subscribe = jest.fn((type, method, parameters) => {
            expect(type).toEqual(abstractSubscription.type);

            expect(method).toEqual(abstractSubscription.method);

            if (abstractSubscription.options !== null) {
                expect(parameters).toEqual([abstractSubscription.options]);
            } else {
                expect(parameters).toEqual([]);
            }

            return Promise.resolve('MY_ID');
        });

        abstractSubscription = new AbstractSubscription(
            'sof_subscribe',
            'rpc_method',
            {},
            Utils,
            formatters,
            moduleInstanceMock
        );
    });

    it('constructor check', () => {
        expect(abstractSubscription.type).toEqual('sof_subscribe');

        expect(abstractSubscription.method).toEqual('rpc_method');

        expect(abstractSubscription.options).toEqual({});

        expect(abstractSubscription.utils).toEqual(Utils);

        expect(abstractSubscription.formatters).toEqual(formatters);

        expect(abstractSubscription.moduleInstance).toEqual(moduleInstanceMock);

        expect(abstractSubscription.id).toEqual(null);

        expect(abstractSubscription.beforeSubscription).toBeInstanceOf(Function);
    });

    it('calls onNewSubscriptionItem and returns just the given value', () => {
        expect(abstractSubscription.onNewSubscriptionItem('string')).toEqual('string');
    });

    it('calls subscribe and emits a error from the provider error listener', (done) => {
        moduleInstanceMock.currentProvider.once = jest.fn((event, callback) => {
            expect(event).toEqual('error');

            callback(new Error('ERROR'));
        });

        const subscription = abstractSubscription.subscribe();

        subscription.on('error', (error) => {
            expect(error).toEqual(new Error('ERROR'));

            expect(moduleInstanceMock.currentProvider.removeAllListeners).toHaveBeenCalledWith('MY_ID');

            done();
        });
    });

    it('calls subscribe and emits a error because of the provider subscribe method', (done) => {
        moduleInstanceMock.currentProvider.subscribe = jest.fn(() => {
            return Promise.reject(new Error('ERROR'));
        });

        const subscription = abstractSubscription.subscribe();

        subscription.on('error', (error) => {
            expect(error).toEqual(new Error('ERROR'));

            done();
        });
    });

    it('calls subscribe and returns a error because of the provider subscribe method', (done) => {
        moduleInstanceMock.currentProvider.subscribe = jest.fn(() => {
            return Promise.reject(new Error('ERROR'));
        });

        abstractSubscription.subscribe((error) => {
            expect(error).toEqual(new Error('ERROR'));

            done();
        });
    });

    it('calls subscribe and returns a error from the provider error listener', (done) => {
        moduleInstanceMock.currentProvider.once = jest.fn((event, callback) => {
            expect(event).toEqual('error');

            callback(new Error('ERROR'));
        });

        abstractSubscription.subscribe((error) => {
            expect(error).toEqual(new Error('ERROR'));

            expect(moduleInstanceMock.currentProvider.removeAllListeners).toHaveBeenCalledWith('MY_ID');

            done();
        });
    });

    it('calls subscribe with a callback and it returns the expected value', (done) => {
        moduleInstanceMock.currentProvider.on = jest.fn((id, callback) => {
            expect(id).toEqual('MY_ID');

            callback({result: 'SUBSCRIPTION_ITEM'});
        });

        const callback = jest.fn((error, response) => {
            expect(abstractSubscription.id).toEqual('MY_ID');

            expect(error).toEqual(false);

            expect(response).toEqual('SUBSCRIPTION_ITEM');

            expect(moduleInstanceMock.currentProvider.once).toHaveBeenCalled();

            done();
        });

        abstractSubscription.options = null;
        abstractSubscription.subscribe(callback);
    });

    it('calls subscribe and emits the data event', (done) => {
        moduleInstanceMock.currentProvider.on = jest.fn((id, callback) => {
            expect(id).toEqual('MY_ID');

            callback({result: 'SUBSCRIPTION_ITEM'});
        });

        abstractSubscription.options = null;
        const subscription = abstractSubscription.subscribe();

        subscription.on('data', (data) => {
            expect(data).toEqual('SUBSCRIPTION_ITEM');

            expect(moduleInstanceMock.currentProvider.once).toHaveBeenCalled();

            done();
        });
    });

    it('calls unsubscribe and returns with a resolved promise', async () => {
        moduleInstanceMock.currentProvider.unsubscribe = jest.fn((id, type) => {
            expect(id).toEqual('ID');

            expect(type).toEqual('sof_unsubscribe');

            return Promise.resolve(true);
        });

        abstractSubscription.id = 'ID';
        abstractSubscription.on('data', () => {});

        const callback = jest.fn();

        const response = await abstractSubscription.unsubscribe(callback);

        expect(response).toEqual(true);

        expect(callback).toHaveBeenCalledWith(false, true);

        expect(abstractSubscription.listenerCount('data')).toEqual(0);

        expect(abstractSubscription.id).toEqual(null);
    });

    it('calls unsubscribe and returns with a rejected promise', async () => {
        moduleInstanceMock.currentProvider.unsubscribe = jest.fn((id, type) => {
            expect(id).toEqual('ID');

            expect(type).toEqual('sof_unsubscribe');

            return Promise.resolve(false);
        });

        const callback = jest.fn();
        abstractSubscription.id = 'ID';
        abstractSubscription.type = 'sof_s';

        await expect(abstractSubscription.unsubscribe(callback)).rejects.toThrow('Error on unsubscribe!');

        expect(callback).toHaveBeenCalledWith(new Error('Error on unsubscribe!'), null);
    });
});
