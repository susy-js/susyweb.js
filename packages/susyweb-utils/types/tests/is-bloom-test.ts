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
 * @file is-bloom-tests.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import BN = require('bn.js');
import {isBloom} from 'susyweb-utils';

// $ExpectType boolean
isBloom('0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef');

// $ExpectError
isBloom(656);
// $ExpectError
isBloom(new BN(3));
// $ExpectError
isBloom(['string']);
// $ExpectError
isBloom([4]);
// $ExpectError
isBloom({});
// $ExpectError
isBloom(true);
// $ExpectError
isBloom(null);
// $ExpectError
isBloom(undefined);
