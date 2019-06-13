import {formatters} from 'susyweb-core-helpers';
import * as Utils from 'susyweb-utils';

import EventSubscriptionFactory from '../../../src/factories/EventSubscriptionFactory';
import EventLogSubscription from '../../../src/subscriptions/EventLogSubscription';
import AllEventsLogSubscription from '../../../src/subscriptions/AllEventsLogSubscription';

// Mocks
jest.mock('susyweb-core-helpers');
jest.mock('susyweb-utils');
jest.mock('../../../src/subscriptions/EventLogSubscription');
jest.mock('../../../src/subscriptions/AllEventsLogSubscription');

/**
 * EventSubscriptionFactory test
 */
describe('EventSubscriptionFactoryTest', () => {
    let eventSubscriptionFactory;

    beforeEach(() => {
        eventSubscriptionFactory = new EventSubscriptionFactory(Utils, formatters);
    });

    it('constructor check', () => {
        expect(eventSubscriptionFactory.utils).toEqual(Utils);

        expect(eventSubscriptionFactory.formatters).toEqual(formatters);
    });

    it('calls createEventLogSubscription and returns an EventLogSubscription object', () => {
        expect(eventSubscriptionFactory.createEventLogSubscription({}, {}, {}, {})).toBeInstanceOf(
            EventLogSubscription
        );
    });

    it('calls createAllEventsLogSubscription and returns an AllEventsLogSubscription object', () => {
        expect(eventSubscriptionFactory.createAllEventsLogSubscription({}, {}, {})).toBeInstanceOf(
            AllEventsLogSubscription
        );
    });
});
