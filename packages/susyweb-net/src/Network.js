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

import {AbstractSusyWebModule} from 'susyweb-core';
import isFunction from 'lodash/isFunction';

export default class Network extends AbstractSusyWebModule {
    /**
     * @param {SusyWebSophonProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
     * @param {MethodFactory} methodFactory
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Object} options
     * @param {Net.Socket} nodeNet
     *
     * @constructor
     */
    constructor(provider, methodFactory, utils, formatters, options, nodeNet) {
        super(provider, options, methodFactory, nodeNet);

        this.utils = utils;
        this.formatters = formatters;
    }

    /**
     * Determines to which network susyweb is currently connected
     *
     * @method getNetworkType
     *
     * @param {Function} callback
     *
     * @callback callback(error, result)
     * @returns {Promise<String|Error>}
     */
    async getNetworkType(callback) {
        try {
            const id = await this.getId();
            let networkType = 'private';

            switch (id) {
                case 1:
                    networkType = 'main';
                    break;
                case 2:
                    networkType = 'morden';
                    break;
                case 3:
                    networkType = 'ropsten';
                    break;
                case 4:
                    networkType = 'rinkeby';
                    break;
                case 42:
                    networkType = 'kovan';
                    break;
            }

            if (isFunction(callback)) {
                callback(null, networkType);
            }

            return networkType;
        } catch (error) {
            if (isFunction(callback)) {
                callback(error, null);
            }

            throw error;
        }
    }
}
