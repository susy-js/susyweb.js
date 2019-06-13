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
 * @file http-provider-test.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk> , Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {AbstractSusyWebModule} from 'susyweb-core';
import {HttpProvider} from 'susyweb-providers';

const httpProvider = new HttpProvider('http://localhost:8545', {
    timeout: 20000,
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        }
    ],
    withCredentials: false
});

// $ExpectType Promise<any>
httpProvider.send('rpc_method', []);

// $ExpectType Promise<any[]>
httpProvider.sendBatch(
    [],
    new AbstractSusyWebModule('http://localhost:7545')
);

// $ExpectType boolean
httpProvider.disconnect();
