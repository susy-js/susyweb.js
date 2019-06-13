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
 * @file SofSignMethod.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {SignMethod} from 'susyweb-core-method';

export default class SofSignMethod extends SignMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {AbstractSusyWebModule} moduleInstance
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance) {
        super(utils, formatters, moduleInstance);
    }

    /**
     * Sends a JSON-RPC call request
     *
     * @method execute
     *
     * @callback callback callback(error, result)
     * @returns {Promise<Object|String>}
     */
    execute() {
        if (this.moduleInstance.accounts.wallet[this.parameters[1]]) {
            return this.signLocally();
        }

        return super.execute();
    }

    /**
     * Signs the message on the client.
     *
     * @method signLocally
     *
     * @returns {Promise<String>}
     */
    async signLocally() {
        try {
            this.beforeExecution(this.moduleInstance);

            let signedMessage = this.moduleInstance.accounts.sign(
                this.parameters[1],
                this.moduleInstance.accounts.wallet[this.parameters[0]].privateKey
            );

            if (this.callback) {
                this.callback(false, signedMessage);

                return;
            }

            return signedMessage;
        } catch (error) {
            if (this.callback) {
                this.callback(error, null);

                return;
            }

            throw error;
        }
    }
}
