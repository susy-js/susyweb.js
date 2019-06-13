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
 * @file Network.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {formatters} from 'susyweb-core-helpers';
import * as Utils from 'susyweb-utils';
import MethodFactory from './factories/MethodFactory';
import NetworkModule from './Network.js';

/**
 * Creates the Network Object
 *
 * @method Network
 *
 * @param {SusyWebSophonProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Net.Socket} net
 * @param {Object} options
 *
 * @returns {Network}
 */
export function Network(provider, net = null, options = {}) {
    return new NetworkModule(provider, new MethodFactory(Utils, formatters), Utils, formatters, options, null);
}
