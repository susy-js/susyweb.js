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
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2019
 */

import {Network} from 'susyweb-net';
import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import {ProviderResolver} from 'susyweb-providers';
import MethodFactory from './factories/MethodFactory';
import DebugModule from './Debug.js';

/**
 * Returns the Debug object
 *
 * @method Debug
 *
 * @param {SusyWebSophonProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Net.Socket} net
 * @param {Object} options
 *
 * @returns {Debug}
 */
export function Debug(provider, net = null, options = {}) {
    const resolvedProvider = new ProviderResolver().resolve(provider, net);

    return new DebugModule(
        resolvedProvider,
        new MethodFactory(Utils, formatters),
        new Network(resolvedProvider, null, options),
        Utils,
        formatters,
        options,
        null
    );
}
