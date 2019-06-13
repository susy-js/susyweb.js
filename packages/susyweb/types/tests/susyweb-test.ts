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
 * @file susyweb-test.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>, Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

import SusyWeb from 'susyweb';

// $ExpectType Modules
SusyWeb.modules;

// $ExpectType any
SusyWeb.givenProvider;

// $ExpectType Providers
SusyWeb.providers;

const susyweb = new SusyWeb('https://localhost:5000/');

// $ExpectType HttpProvider | IpcProvider | WebsocketProvider | SusyWebSophonProvider | CustomProvider
susyweb.currentProvider;

// $ExpectType Utils
susyweb.utils;

// $ExpectType string
susyweb.version;

// $ExpectType Sof
susyweb.sof;

// $ExpectType Shh
susyweb.shh;

// $ExpectType BatchRequest
new susyweb.BatchRequest();
