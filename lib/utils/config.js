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
/** @file config.js
 * @authors:
 *   Marek Kotewicz <marek@sofdev.com>
 * @date 2015
 */

/**
 * Utils
 * 
 * @module utils
 */

/**
 * Utility functions
 * 
 * @class [utils] config
 * @constructor
 */


/// required to define SOF_BIGNUMBER_ROUNDING_MODE
var BigNumber = require('bignumber.js');

var SOF_UNITS = [
    'wei',
    'kwei',
    'Mwei',
    'Gwei',
    'szabo',
    'finney',
    'femtosophy',
    'picosophy',
    'nanosophy',
    'microsophy',
    'millisophy',
    'nano',
    'micro',
    'milli',
    'sophy',
    'grand',
    'Msophy',
    'Gsophy',
    'Tsofer',
    'Psophy',
    'Esophy',
    'Zsophy',
    'Ysophy',
    'Nsophy',
    'Dsophy',
    'Vsophy',
    'Usophy'
];

module.exports = {
    SOF_PADDING: 32,
    SOF_SIGNATURE_LENGTH: 4,
    SOF_UNITS: SOF_UNITS,
    SOF_BIGNUMBER_ROUNDING_MODE: { ROUNDING_MODE: BigNumber.ROUND_DOWN },
    SOF_POLLING_TIMEOUT: 1000/2,
    defaultBlock: 'latest',
    defaultAccount: undefined
};

