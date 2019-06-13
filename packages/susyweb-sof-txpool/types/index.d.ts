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
 * @author Prince Sinha <sinhaprince013@gmail.com>,
 * @date 2019
 */

import {provider} from 'susyweb-providers';
import {AbstractSusyWebModule, TxPoolContent, TxPoolInspect, TxPoolStatus, SusyWebModuleOptions} from 'susyweb-core';
import * as net from 'net';

export class Txpool extends AbstractSusyWebModule {
    constructor(provider: provider, net?: net.Socket | null, options?: SusyWebModuleOptions);

    getContent(callback?: (error: Error, result: TxPoolContent) => void): Promise<TxPoolContent>;

    getInspection(callback?: (error: Error, result: TxPoolInspect) => void): Promise<TxPoolInspect>;

    getStatus(callback?: (error: Error, result: TxPoolStatus) => void): Promise<TxPoolStatus>;
}
