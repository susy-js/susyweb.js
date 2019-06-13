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
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>, Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {AbstractSusyWebModule, SusyWebModuleOptions} from 'susyweb-core';
import {Utils} from 'susyweb-utils';
import * as net from 'net';
import {provider} from 'susyweb-providers';
import {Sof} from 'susyweb-sof';
import {Network} from 'susyweb-net';
import {Shh} from 'susyweb-shh';
import {Personal} from 'susyweb-sof-personal';

export default class SusyWeb extends AbstractSusyWebModule {
    constructor(
        provider: provider,
        net?: net.Socket,
        options?: SusyWebModuleOptions
    );

    static modules: Modules;
    static readonly givenProvider: any;

    utils: Utils;
    sof: Sof;
    shh: Shh;
    version: string;
}

export interface Modules {
    Sof: new (provider: provider, net: net.Socket) => Sof;
    Net: new (provider: provider, net: net.Socket) => Network;
    Personal: new (provider: provider, net: net.Socket) => Personal;
    Shh: new (provider: provider, net: net.Socket) => Shh;
}
