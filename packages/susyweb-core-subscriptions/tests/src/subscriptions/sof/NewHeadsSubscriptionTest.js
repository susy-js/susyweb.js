import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import NewHeadsSubscription from '../../../../src/subscriptions/sof/NewHeadsSubscription';

// Mocks
jest.mock('susyweb-utils');
jest.mock('susyweb-core-helpers');

/**
 * NewHeadsSubscription test
 */
describe('NewHeadsSubscriptionTest', () => {
    let newHeadsSubscription;

    beforeEach(() => {
        newHeadsSubscription = new NewHeadsSubscription(Utils, formatters, {});
    });

    it('constructor check', () => {
        expect(newHeadsSubscription.method).toEqual('newHeads');

        expect(newHeadsSubscription.type).toEqual('sof_subscribe');

        expect(newHeadsSubscription.options).toEqual(null);

        expect(newHeadsSubscription.utils).toEqual(Utils);

        expect(newHeadsSubscription.moduleInstance).toEqual({});
    });

    it('onNewSubscriptionItem should call the outputBlockFormatter method', () => {
        formatters.outputBlockFormatter.mockReturnValueOnce({});

        newHeadsSubscription.onNewSubscriptionItem('string');

        expect(formatters.outputBlockFormatter).toHaveBeenCalledWith('string');
    });
});
