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
 * @file get-unit-value-test.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import BN = require('bn.js');
import {getUnitValue} from 'susyweb-utils';

// $ExpectType string
getUnitValue('sophy');

// $ExpectError
getUnitValue('fake');
// $ExpectError
getUnitValue(656);
// $ExpectError
getUnitValue(new BN(3));
// $ExpectError
getUnitValue(['string']);
// $ExpectError
getUnitValue([4]);
// $ExpectError
getUnitValue({});
// $ExpectError
getUnitValue(true);
// $ExpectError
getUnitValue(null);
// $ExpectError
getUnitValue(undefined);
