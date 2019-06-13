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
 * @file GetBlockTransactionCountMethod.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {AbstractGetBlockTransactionCountMethod} from 'susyweb-core-method';

export default class GetBlockTransactionCountMethod extends AbstractGetBlockTransactionCountMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {AbstractSusyWebModule} moduleInstance
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance) {
        super('sof_getBlockTransactionCountByNumber', utils, formatters, moduleInstance);
    }

    /**
     * TODO: Refactor public API and create two methods out of it: sof.getBlockTransactionCountByHash(...)
     *
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractSusyWebModule} moduleInstance
     */
    beforeExecution(moduleInstance) {
        if (this.isHash(this.parameters[0])) {
            this.rpcMethod = 'sof_getBlockTransactionCountByHash';
        }

        super.beforeExecution(moduleInstance);
    }
}
