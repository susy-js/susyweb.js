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

import {AbstractMethod} from 'susyweb-core-method';
import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import {AbstractSusyWebModule} from 'susyweb-core';

const abstractSusyWebModule = new AbstractSusyWebModule('http://localhost:8545');
const abstractMethod = new AbstractMethod('rpc_method', 1, Utils, formatters, abstractSusyWebModule);

// $ExpectType Utils
abstractMethod.utils;

// $ExpectType formatters
abstractMethod.formatters;

// $ExpectType PromiEvent<any>
abstractMethod.promiEvent;

// $ExpectType string
abstractMethod.rpcMethod;

// $ExpectType number
abstractMethod.parametersAmount;

// $ExpectType any[]
abstractMethod.parameters;

// $ExpectType any
abstractMethod.getArguments();

// $ExpectType boolean
abstractMethod.isHash('string');

// $ExpectType void
abstractMethod.setArguments([]);

// $ExpectType boolean
abstractMethod.hasWallets();

// $ExpectType void
abstractMethod.callback('error', 'response');

// $ExpectType void
abstractMethod.beforeExecution(abstractSusyWebModule);

// $ExpectType any
abstractMethod.afterExecution('response');

// $ExpectType string | PromiEvent<any> | Promise<any>
abstractMethod.execute();

// $ExpectType Promise<boolean | Error>
abstractMethod.clearSubscriptions('sof_unsubscribe');
