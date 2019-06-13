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
 * @authors: Samuel Furter <samuel@sophon.org>
 * @date 2018
 */
// TODO: Export here a susyweb namespace with context handling possibilities and not a object and remove the factory
// TODO: objects and do them the functional way because of the tree shaking.
// TODO: Move the folders back to simpler structure e.g.: "packages/core/<methods|subscriptions|providers>"
import {AbstractSusyWebModule} from 'susyweb-core';
import {ProviderDetector, ProvidersModuleFactory} from 'susyweb-providers';
import * as Utils from 'susyweb-utils';
import {Sof} from 'susyweb-sof';
import {Shh} from 'susyweb-shh';
import {Network} from 'susyweb-net';
import {Personal} from 'susyweb-sof-personal';
import {version} from '../package.json';

export default class SusyWeb extends AbstractSusyWebModule {
    /**
     * @param {AbstractSocketProvider|HttpProvider|CustomProvider|String} provider
     * @param {Net} net
     * @param {Object} options
     *
     * @constructor
     */
    constructor(provider, net, options = {}) {
        super(provider, options, null, net);

        this.sof = new Sof(this.currentProvider, net, options);
        this.shh = new Shh(this.currentProvider, net, options);
        this.utils = Utils;
        this.version = version;
    }

    /**
     * Sets the defaultGasPrice property on the sof module and also on the shh module
     *
     * @property defaultGasPrice
     *
     * @param {String} value
     */
    set defaultGasPrice(value) {
        super.defaultGasPrice = value;
        this.sof.defaultGasPrice = value;
        this.shh.defaultGasPrice = value;
    }

    /**
     * Gets the defaultGasPrice property
     *
     * @property defaultGasPrice
     *
     * @returns {String|Number} value
     */
    get defaultGasPrice() {
        return super.defaultGasPrice;
    }

    /**
     * Sets the defaultGas property on the sof module and also on the shh module
     *
     * @property defaultGas
     *
     * @param {Number} value
     */
    set defaultGas(value) {
        super.defaultGas = value;
        this.sof.defaultGas = value;
        this.shh.defaultGas = value;
    }

    /**
     * Gets the defaultGas property
     *
     * @property defaultGas
     *
     * @returns {String|Number} value
     */
    get defaultGas() {
        return super.defaultGas;
    }

    /**
     * Sets the transactionBlockTimeout property on all contracts and on all sub-modules
     *
     * @property transactionBlockTimeout
     *
     * @param {Number} value
     */
    set transactionBlockTimeout(value) {
        super.transactionBlockTimeout = value;
        this.sof.transactionBlockTimeout = value;
        this.shh.transactionBlockTimeout = value;
    }

    /**
     * Gets the transactionBlockTimeout property
     *
     * @property transactionBlockTimeout
     *
     * @returns {Number} value
     */
    get transactionBlockTimeout() {
        return super.transactionBlockTimeout;
    }

    /**
     * Sets the transactionConfirmationBlocks property on all contracts and on all sub-modules
     *
     * @property transactionConfirmationBlocks
     *
     * @param {Number} value
     */
    set transactionConfirmationBlocks(value) {
        super.transactionConfirmationBlocks = value;
        this.sof.transactionConfirmationBlocks = value;
        this.shh.transactionConfirmationBlocks = value;
    }

    /**
     * Gets the transactionConfirmationBlocks property
     *
     * @property transactionConfirmationBlocks
     *
     * @returns {Number} value
     */
    get transactionConfirmationBlocks() {
        return super.transactionConfirmationBlocks;
    }

    /**
     * Sets the transactionConfirmationBlocks property on all contracts and on all sub-modules
     *
     * @property transactionConfirmationBlocks
     *
     * @param {Number} value
     */
    set transactionPollingTimeout(value) {
        super.transactionPollingTimeout = value;
        this.sof.transactionPollingTimeout = value;
        this.shh.transactionPollingTimeout = value;
    }

    /**
     * Gets the transactionPollingTimeout property
     *
     * @property transactionPollingTimeout
     *
     * @returns {Number} value
     */
    get transactionPollingTimeout() {
        return super.transactionPollingTimeout;
    }

    /**
     * Sets the defaultAccount property on the sof module and also on the shh module
     *
     * @property defaultAccount
     *
     * @param {String} value
     */
    set defaultAccount(value) {
        super.defaultAccount = value;
        this.sof.defaultAccount = value;
        this.shh.defaultAccount = value;
    }

    /**
     * Gets the defaultAccount property
     *
     * @property defaultAccount
     *
     * @returns {String} value
     */
    get defaultAccount() {
        return super.defaultAccount;
    }

    /**
     * Sets the defaultBlock property on the sof module and also on the shh module
     *
     * @property defaultBlock
     *
     * @param {Number|String} value
     */
    set defaultBlock(value) {
        super.defaultBlock = value;
        this.sof.defaultBlock = value;
        this.shh.defaultBlock = value;
    }

    /**
     * Gets the defaultBlock property
     *
     * @property defaultBlock
     *
     * @returns {String|Number} value
     */
    get defaultBlock() {
        return super.defaultBlock;
    }

    /**
     * Sets the provider for all packages
     *
     * @method setProvider
     *
     * @param {Object|String} provider
     * @param {Net} net
     *
     * @returns {Boolean}
     */
    setProvider(provider, net) {
        return (
            super.setProvider(provider, net) &&
            this.sof.setProvider(provider, net) &&
            this.shh.setProvider(provider, net)
        );
    }

    /**
     * Returns the detected provider
     *
     * @returns {Object}
     */
    static get givenProvider() {
        return ProviderDetector.detect();
    }

    /**
     * Returns an object with all public susyweb modules
     *
     * @returns {Object}
     */
    static get modules() {
        const providerResolver = new ProvidersModuleFactory().createProviderResolver();

        return {
            Sof: (provider, options, net) => {
                return new Sof(providerResolver.resolve(provider, net), options);
            },
            Net: (provider, options, net) => {
                return new Network(providerResolver.resolve(provider, net), options);
            },
            Personal: (provider, options, net) => {
                return new Personal(providerResolver.resolve(provider, net), options);
            },
            Shh: (provider, options, net) => {
                return new Shh(providerResolver.resolve(provider, net), options);
            }
        };
    }
}
