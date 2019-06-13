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
 * @file index.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {Network} from 'susyweb-net';
import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import {ProviderResolver} from 'susyweb-providers';
import MethodFactory from './factories/MethodFactory';
import SubscriptionsFactory from './factories/SubscriptionsFactory';
import ShhModule from './Shh.js';

/**
 * Returns the Shh object.
 *
 * @method Shh
 *
 * @param {SusyWebSophonProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Net} net
 * @param {Object} options
 *
 * @returns {Shh}
 */
export function Shh(provider, net = null, options = {}) {
    const resolvedProvider = new ProviderResolver().resolve(provider, net);

    return new ShhModule(
        resolvedProvider,
        new MethodFactory(Utils, formatters),
        new SubscriptionsFactory(Utils, formatters),
        new Network(resolvedProvider, null, options),
        options,
        null
    );
}
