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
 * @file ProviderDetector.js
 * @authors: Samuel Furter <samuel@sophon.org>
 * @date 2018
 */

const global =
    (function() {
        return this || (typeof self === 'object' && self);
        // eslint-disable-next-line no-new-func
    })() || new Function('return this')();

// TODO: Remove the detector because of window/global.sophon
export default class ProviderDetector {
    /**
     * Detects which provider is given in the current environment
     *
     * @method detect
     *
     * @returns {Object|null} provider
     */
    static detect() {
        if (
            typeof global.sophonProvider !== 'undefined' &&
            global.sophonProvider.constructor.name === 'SophonProvider'
        ) {
            return global.sophonProvider;
        }

        if (typeof global.susyweb !== 'undefined' && global.susyweb.currentProvider) {
            return global.susyweb.currentProvider;
        }

        return null;
    }
}
