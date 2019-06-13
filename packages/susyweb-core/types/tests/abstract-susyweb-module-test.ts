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
 * @file abstract-susyweb-module-test.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */
import * as net from 'net';
import {HttpProvider, IpcProvider, WebsocketProvider} from 'susyweb-providers';
import {AbstractSusyWebModule, SusyWebModuleOptions} from 'susyweb-core';

const options = {
    timeout: 20000,
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        }
    ]
};
const httpProvider = new HttpProvider('http://localhost:8545', options);
const ipcProvider = new IpcProvider('/Users/myuser/Library/Sophon/graviton.ipc', new net.Server());
const abstractSusyWebModule = new AbstractSusyWebModule(httpProvider);

// $ExpectType BatchRequest
new abstractSusyWebModule.BatchRequest();

// $ExpectType string | number
abstractSusyWebModule.defaultBlock;

// $ExpectType number
abstractSusyWebModule.transactionBlockTimeout;

// $ExpectType number
abstractSusyWebModule.transactionConfirmationBlocks;

// $ExpectType number
abstractSusyWebModule.transactionPollingTimeout;

// $ExpectType string
abstractSusyWebModule.defaultGasPrice;

// $ExpectType number
abstractSusyWebModule.defaultGas;

// $ExpectType Providers
AbstractSusyWebModule.providers;

// $ExpectType any
abstractSusyWebModule.givenProvider;

// $ExpectType string | null
abstractSusyWebModule.defaultAccount;

// $ExpectType HttpProvider | IpcProvider | WebsocketProvider | SusyWebSophonProvider | CustomProvider
abstractSusyWebModule.currentProvider;

// $ExpectType boolean
abstractSusyWebModule.setProvider(httpProvider);

// $ExpectType boolean
abstractSusyWebModule.setProvider('http://localhost:8545');

// $ExpectType boolean
abstractSusyWebModule.isSameProvider('http://localhost:8545');

// $ExpectType boolean
abstractSusyWebModule.isSameProvider(httpProvider);

// $ExpectType Promise<boolean>
abstractSusyWebModule.clearSubscriptions('sof_unsubscribe');
