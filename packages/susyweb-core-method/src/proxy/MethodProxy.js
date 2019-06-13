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
 * @file MethodProxy.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

export default class MethodProxy {
    /**
     * @param {AbstractSusyWebModule} target
     * @param {AbstractMethodFactory} methodFactory
     *
     * @constructor
     */
    constructor(target, methodFactory) {
        return new Proxy(target, {
            /**
             * @param {AbstractSusyWebModule} target
             * @param {String|Symbol} name
             *
             * @returns {any}
             */
            get: (target, name) => {
                if (methodFactory.hasMethod(name)) {
                    if (typeof target[name] !== 'undefined') {
                        throw new TypeError(
                            `Duplicated method ${name}. This method is defined as RPC call and as Object method.`
                        );
                    }

                    const method = methodFactory.createMethod(name, target);

                    /* eslint-disable no-inner-declarations */
                    function RpcMethod() {
                        method.setArguments(arguments);

                        return method.execute();
                    }
                    /* eslint-enable no-inner-declarations */

                    RpcMethod.method = method;
                    RpcMethod.request = function() {
                        method.setArguments(arguments);

                        return method;
                    };

                    return RpcMethod;
                }

                return target[name];
            }
        });
    }
}
