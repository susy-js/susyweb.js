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
import {AbiCoder} from 'susyweb-sof-abi';
import ContractModuleFactory from './factories/ContractModuleFactory';

export AbstractContract from './AbstractContract';
export ContractModuleFactory from './factories/ContractModuleFactory';

/**
 * TODO: Improve this factory method for the TransactionSigner handling.
 *
 * Returns an object of type Contract
 *
 * @method Contract
 *
 * @param {SusyWebSophonProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Array} abi
 * @param {Accounts} accounts
 * @param {String} address
 * @param {Object} options
 *
 * @returns {AbstractContract}
 *
 * @constructor
 */
export function Contract(provider, abi, accounts, address, options) {
    return new ContractModuleFactory(Utils, formatters, new AbiCoder()).createContract(
        provider,
        accounts,
        abi,
        address,
        options
    );
}
