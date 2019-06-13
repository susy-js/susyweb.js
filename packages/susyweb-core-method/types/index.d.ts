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
 * @file index.d.ts
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {Utils} from 'susyweb-utils';
import {AbstractSusyWebModule, PromiEvent} from 'susyweb-core';
import {formatters} from 'susyweb-core-helpers';

export class AbstractMethod {
    constructor(
        rpcMethod: string,
        parametersAmount: number,
        utils: Utils,
        formatters: formatters,
        moduleInstance: AbstractSusyWebModule
    );

    utils: Utils;
    formatters: formatters;
    promiEvent: PromiEvent<any>;
    rpcMethod: string;
    parametersAmount: number;
    parameters: any[];

    getArguments(): any;

    setArguments(args: any[]): void;

    isHash(parameter: string): boolean;

    hasWallets(): boolean;

    callback(error: string | Error, response: any): void;

    beforeExecution(moduleInstance: AbstractSusyWebModule): void;

    afterExecution(response: any): any;

    execute(): Promise<any> | PromiEvent<any> | string;

    clearSubscriptions(unsubscribeMethod: string): Promise<boolean | Error>;
}

export class AbstractMethodFactory {
    constructor(utils: Utils, formatters: formatters);

    methods: null | object;
    hasMethod: boolean;

    createMethod(name: string, moduleInstance: AbstractSusyWebModule): AbstractMethod;
}
