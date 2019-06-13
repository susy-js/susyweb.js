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

import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import MethodFactory from './factories/MethodFactory';
import AccountsModule from './Accounts';

/**
 * Returns the Accounts object
 *
 * @param {SusyWebSophonProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Object} options
 * @param {Net.Socket} net
 *
 * @returns {Accounts}
 * @constructor
 */
export function Accounts(provider, net = null, options = {}) {
    return new AccountsModule(provider, Utils, formatters, new MethodFactory(Utils, formatters), options, net);
}
