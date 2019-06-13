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
 * @file Registry.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import isFunction from 'lodash/isFunction';
import namehash from 'sof-ens-namehash';
import {AbstractContract} from 'susyweb-sof-contract';
import {REGISTRY_ABI} from '../../ressources/ABI/Registry';
import {RESOLVER_ABI} from '../../ressources/ABI/Resolver';

export default class Registry extends AbstractContract {
    /**
     * @param {HttpProvider|WebsocketProvider|IpcProvider|SusyWebSophonProvider|String} provider
     * @param {ContractModuleFactory} contractModuleFactory
     * @param {Accounts} accounts
     * @param {AbiCoder} abiCoder
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Object} options
     * @param {Network} net
     *
     * @constructor
     */
    constructor(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, options, net) {
        super(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, REGISTRY_ABI, '', options);
        this.net = net;
        this.resolverContract = null;
        this.resolverName = null;
    }

    /**
     * Returns the address of the owner of an Ens name.
     *
     * @method owner
     *
     * @param {String} name
     * @param {Function} callback
     *
     * @callback callback callback(error, result)
     * @returns {Promise<String>}
     */
    async owner(name, callback) {
        if (!this.address) {
            this.address = await this.checkNetwork();
        }

        try {
            const owner = await this.methods.owner(namehash.hash(name)).call();

            if (isFunction(callback)) {
                callback(false, owner);
            }

            return owner;
        } catch (error) {
            if (isFunction(callback)) {
                callback(error, null);
            }

            throw error;
        }
    }

    /**
     * Sets the provider for the registry and resolver object.
     * This method will also set the provider in the NetworkPackage and AccountsPackage because they are used here.
     *
     * @method setProvider
     *
     * @param {HttpProvider|WebsocketProvider|IpcProvider|SusyWebSophonProvider|String} provider
     * @param {Net} net
     *
     * @returns {Boolean}
     */
    setProvider(provider, net) {
        if (this.resolverContract) {
            return this.resolverContract.setProvider(provider, net) && super.setProvider(provider, net);
        }

        return super.setProvider(provider, net);
    }

    /**
     * Returns the resolver contract associated with a name.
     *
     * @method resolver
     *
     * @param {String} name
     *
     * @returns {Promise<AbstractContract>}
     */
    async resolver(name) {
        if (this.resolverName === name && this.resolverContract) {
            return this.resolverContract;
        }

        if (!this.address) {
            this.address = await this.checkNetwork();
        }

        const address = await this.methods.resolver(namehash.hash(name)).call();
        const clone = this.clone();
        clone.jsonInterface = RESOLVER_ABI;
        clone.address = address;

        this.resolverName = name;
        this.resolverContract = clone;

        return clone;
    }

    /**
     * Checks if the current used network is synced and looks for Ens support there.
     * Throws an error if not.
     *
     * @method checkNetwork
     *
     * @returns {Promise<String>}
     */
    async checkNetwork() {
        const ensAddresses = {
            main: '0x314159265dD8dbb310642f98f50C066173C1259b',
            ropsten: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
            rinkeby: '0xe7410170f87102df0055eb195163a03b7f2bff4a'
        };

        const block = await this.net.getBlockByNumber('latest', false);
        const headAge = new Date() / 1000 - block.timestamp;

        if (headAge > 3600) {
            throw new Error(`Network not synced; last block was ${headAge} seconds ago`);
        }

        const networkType = await this.net.getNetworkType();
        const address = ensAddresses[networkType];

        if (typeof address === 'undefined') {
            throw new TypeError(`ENS is not supported on network: "${networkType}"`);
        }

        return address;
    }
}
