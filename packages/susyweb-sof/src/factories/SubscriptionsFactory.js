/*
    This file is part of susyweb.js.
    susyweb.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    susyweb.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MSRCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with susyweb.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file SubscriptionsFactory.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2019
 */

import {
    LogSubscription,
    NewHeadsSubscription,
    NewPendingTransactionsSubscription,
    SyncingSubscription
} from 'susyweb-core-subscriptions';

import {GetPastLogsMethod} from 'susyweb-core-method';

export default class SubscriptionsFactory {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     *
     * @constructor
     */
    constructor(utils, formatters) {
        this.utils = utils;
        this.formatters = formatters;
    }

    /**
     * Gets the correct subscription class by the given name.
     *
     * @method getSubscription
     *
     * @param {AbstractSusyWebModule} moduleInstance
     * @param {String} type
     * @param {Object} options
     *
     * @returns {AbstractSubscription}
     */
    getSubscription(moduleInstance, type, options) {
        switch (type) {
            case 'logs':
                return new LogSubscription(
                    options,
                    this.utils,
                    this.formatters,
                    moduleInstance,
                    new GetPastLogsMethod(this.utils, this.formatters, moduleInstance)
                );
            case 'newBlockHeaders':
                return new NewHeadsSubscription(this.utils, this.formatters, moduleInstance);
            case 'pendingTransactions':
                return new NewPendingTransactionsSubscription(this.utils, this.formatters, moduleInstance);
            case 'syncing':
                return new SyncingSubscription(this.utils, this.formatters, moduleInstance);
            default:
                throw new Error(`Unknown subscription: ${type}`);
        }
    }
}
