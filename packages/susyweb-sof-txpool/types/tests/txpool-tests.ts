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
 * @file txpool-tests.ts
 * @author Prince <sinhaprince013@gmail.com>
 * @date 2019
 */

import {Txpool} from 'susyweb-sof-txpool';
import {TxPoolContent, TxPoolInspect, TxPoolStatus} from 'susyweb-core';

const txpool = new Txpool('http://localhost:8545');

// $ExpectType Promise<TxPoolContent>
txpool.getContent();

// $ExpectType Promise<TxPoolContent>
txpool.getContent((error: Error, result: TxPoolContent) => {});

// $ExpectType Promise<TxPoolInspect>
txpool.getInspection();

// $ExpectType Promise<TxPoolInspect>
txpool.getInspection((error: Error, result: TxPoolInspect) => {});

// $ExpectType Promise<TxPoolStatus>
txpool.getStatus();

// $ExpectType Promise<TxPoolStatus>
txpool.getStatus((error: Error, result: TxPoolStatus) => {});
