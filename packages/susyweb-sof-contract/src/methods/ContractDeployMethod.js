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
 * @file ContractDeployMethod.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {SofSendTransactionMethod} from 'susyweb-core-method';

export default class ContractDeployMethod extends SofSendTransactionMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {AbstractSusyWebModule} moduleInstance
     * @param {TransactionObserver} transactionObserver
     * @param {ChainIdMethod} chainIdMethod
     * @param {GetTransactionCountMethod} getTransactionCountMethod
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod) {
        super(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractSusyWebModule} moduleInstance - The module where the method is called from for example Sof.
     */
    beforeExecution(moduleInstance) {
        if (this.rpcMethod !== 'sof_sendRawTransaction') {
            super.beforeExecution(moduleInstance);
            delete this.parameters[0].to;
        }
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {AbstractContract}
     */
    afterExecution(response) {
        const clonedContract = this.moduleInstance.clone();
        clonedContract.address = response.contractAddress;

        if (this.promiEvent.listenerCount('receipt') > 0) {
            this.promiEvent.emit('receipt', super.afterExecution(response));
            this.promiEvent.removeAllListeners('receipt');
        }

        return clonedContract;
    }
}
