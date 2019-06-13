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
 * @file CallContractMethod.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {CallMethod} from 'susyweb-core-method';

// TODO: Implement revert handling (AbstractContractMethod)
export default class CallContractMethod extends CallMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {AbstractSusyWebModule} moduleInstance
     * @param {AbiCoder} abiCoder
     * @param {AbiItemModel} abiItemModel
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance, abiCoder, abiItemModel) {
        super(utils, formatters, moduleInstance);
        this.abiCoder = abiCoder;
        this.abiItemModel = abiItemModel;
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {String} response
     *
     * @returns {Array|String}
     */
    afterExecution(response) {
        if (!response || response === '0x') {
            return null;
        }

        const outputs = this.abiItemModel.getOutputs();
        if (outputs.length > 1) {
            return this.abiCoder.decodeParameters(outputs, response);
        }

        return this.abiCoder.decodeParameter(outputs[0], response);
    }
}
