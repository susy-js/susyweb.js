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
 * @file BatchRequest.js
 * @author Samuel Furter <samuel@sophon.org>, Marek Kotewicz <marek@sofdev.com>
 * @date 2018
 */

import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import JsonRpcResponseValidator from '../validators/JsonRpcResponseValidator';

export default class BatchRequest {
    /**
     * @param {AbstractSusyWebModule} moduleInstance
     *
     * @constructor
     */
    constructor(moduleInstance) {
        this.moduleInstance = moduleInstance;
        this.methods = [];
    }

    /**
     * Should be called to add create new request to batch request
     *
     * @method add
     *
     * @param {AbstractMethod} method
     */
    add(method) {
        if (!isObject(method) && method) {
            throw new Error('Please provide a object of type AbstractMethod.');
        }

        this.methods.push(method);
    }

    /**
     * Should be called to execute batch request
     *
     * @method execute
     *
     * @returns Promise<{methods: AbstractMethod[], response: Object[]}|Error[]>
     */
    execute() {
        return this.moduleInstance.currentProvider.sendBatch(this.methods, this.moduleInstance).then((response) => {
            let errors = [];
            this.methods.forEach((method, index) => {
                if (!isArray(response)) {
                    method.callback(
                        new Error(`BatchRequest error: Response should be of type Array but is: ${typeof response}`),
                        null
                    );

                    errors.push(`Response should be of type Array but is: ${typeof response}`);

                    return;
                }

                const responseItem = response[index] || null;

                const validationResult = JsonRpcResponseValidator.validate(responseItem);

                if (validationResult) {
                    try {
                        const mappedResult = method.afterExecution(responseItem.result);

                        response[index] = mappedResult;
                        method.callback(false, mappedResult);
                    } catch (error) {
                        errors.push(error);
                        method.callback(error, null);
                    }

                    return;
                }

                errors.push(validationResult);
                method.callback(validationResult, null);
            });

            if (errors.length > 0) {
                throw new Error(`BatchRequest error: ${JSON.stringify(errors)}`);
            }

            return {
                methods: this.methods,
                response
            };
        });
    }
}
