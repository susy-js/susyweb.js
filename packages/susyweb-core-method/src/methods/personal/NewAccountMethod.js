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
 * @file NewAccountMethod.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import AbstractMethod from '../../../lib/methods/AbstractMethod';

export default class NewAccountMethod extends AbstractMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {AbstractSusyWebModule} moduleInstance
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance) {
        super('personal_newAccount', 1, utils, formatters, moduleInstance);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {String}
     */
    afterExecution(response) {
        return this.utils.toChecksumAddress(response);
    }
}
