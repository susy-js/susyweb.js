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

import {formatters} from 'susyweb-core-helpers';
import {Accounts} from 'susyweb-sof-accounts';
import {Ens} from 'susyweb-sof-ens';
import {ContractModuleFactory} from 'susyweb-sof-contract';
import {Personal} from 'susyweb-sof-personal';
import {AbiCoder} from 'susyweb-sof-abi';
import {Iban} from 'susyweb-sof-iban';
import {Network} from 'susyweb-net';
import * as Utils from 'susyweb-utils';
import SofTransactionSigner from './signers/TransactionSigner';
import MethodFactory from './factories/MethodFactory';
import SubscriptionsFactory from './factories/SubscriptionsFactory';
import {ProviderResolver} from 'susyweb-providers';
import SofModule from './Sof.js';

/**
 * Creates the TransactionSigner class
 *
 * @returns {TransactionSigner}
 * @constructor
 */
export function TransactionSigner() {
    return new SofTransactionSigner(Utils, formatters);
}

/**
 * Creates the Sof object
 *
 * @method Sof
 *
 * @param {AbstractSocketProvider|HttpProvider|CustomProvider|String} provider
 * @param {Net} net
 * @param {Object} options
 *
 * @returns {Sof}
 * @constructor
 */
export function Sof(provider, net = null, options = {}) {
    if (!options.transactionSigner || options.transactionSigner.type === 'TransactionSigner') {
        options.transactionSigner = new TransactionSigner();
    }

    const resolvedProvider = new ProviderResolver().resolve(provider, net);
    const accounts = new Accounts(resolvedProvider, null, options);
    const abiCoder = new AbiCoder();

    return new SofModule(
        resolvedProvider,
        new MethodFactory(Utils, formatters),
        new Network(resolvedProvider, null, options),
        accounts,
        new Personal(resolvedProvider, null, accounts, options),
        Iban,
        abiCoder,
        new Ens(resolvedProvider, null, accounts, options),
        Utils,
        formatters,
        new SubscriptionsFactory(Utils, formatters),
        new ContractModuleFactory(Utils, formatters, abiCoder, accounts),
        options,
        net
    );
}
