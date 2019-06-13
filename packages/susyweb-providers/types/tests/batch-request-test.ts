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
 * @file batch-request-test.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>, Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import {AbstractSusyWebModule} from 'susyweb-core';
import {AbstractMethod} from 'susyweb-core-method';
import {BatchRequest} from 'susyweb-providers';
import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';

const batchRequest = new BatchRequest(
    new AbstractSusyWebModule('http://localhost:7545')
);

// $ExpectType void
batchRequest.add(new AbstractMethod('sof_coinbase', 1, Utils, formatters, new AbstractSusyWebModule('http://localhost:7545')));

// $ExpectType Promise<{ methods: AbstractMethod[]; response: any[]; } | Error[]>
batchRequest.execute();
