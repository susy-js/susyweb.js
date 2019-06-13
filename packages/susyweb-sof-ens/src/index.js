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
import {ProviderResolver} from 'susyweb-providers';
import {ContractModuleFactory} from 'susyweb-sof-contract';
import {AbiCoder} from 'susyweb-sof-abi';
import {Network} from 'susyweb-net';
import EnsModuleFactory from './factories/EnsModuleFactory';

/**
 * Returns the Ens object
 *
 * @method Ens
 *
 * @param {HttpProvider|WebsocketProvider|IpcProvider|SusyWebSophonProvider|String} provider
 * @param {Net.Socket} net
 * @param {Object} options
 * @param {Accounts} accounts
 *
 * @constructor
 * @returns {Ens}
 */
export function Ens(provider, net = null, options = {}, accounts = {}) {
    const abiCoder = new AbiCoder();
    const resolvedProvider = new ProviderResolver().resolve(provider, net);

    return new EnsModuleFactory().createENS(
        resolvedProvider,
        new ContractModuleFactory(Utils, formatters, abiCoder),
        accounts,
        abiCoder,
        Utils,
        formatters,
        new Network(resolvedProvider, null, options),
        options,
        null
    );
}
