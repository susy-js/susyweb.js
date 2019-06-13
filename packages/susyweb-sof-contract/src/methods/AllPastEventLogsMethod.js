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
 * @file AllPastEventLogsMethod.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {GetPastLogsMethod} from 'susyweb-core-method';

export default class AllPastEventLogsMethod extends GetPastLogsMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {AbstractSusyWebModule} moduleInstance
     * @param {AllEventsLogDecoder} allEventsLogDecoder
     * @param {AbiModel} abiModel
     * @param {AllEventsOptionsMapper} allEventsOptionsMapper
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance, allEventsLogDecoder, abiModel, allEventsOptionsMapper) {
        super(utils, formatters, moduleInstance);
        this.abiModel = abiModel;
        this.allEventsLogDecoder = allEventsLogDecoder;
        this.allEventsOptionsMapper = allEventsOptionsMapper;
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractSusyWebModule} moduleInstance - The package where the method is called from for example Sof.
     */
    beforeExecution(moduleInstance) {
        super.beforeExecution(moduleInstance);
        this.parameters[0] = this.allEventsOptionsMapper.map(this.abiModel, moduleInstance, this.parameters[0]);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Array} response
     *
     * @returns {Array}
     */
    afterExecution(response) {
        const formattedLogs = super.afterExecution(response);

        return formattedLogs.map((logItem) => {
            return this.allEventsLogDecoder.decode(this.abiModel, logItem);
        });
    }
}
