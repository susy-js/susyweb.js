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
 * @file Iban.js
 *
 * Details: https://octonion.institute/susy-go/wiki/wiki/ICAP:-Inter-exchange-Client-Address-Protocol
 *
 * @author Marek Kotewicz <marek@susy.io>
 * @date 2015
 */

'use strict';

import * as Utils from 'susyweb-utils';
import BigNumber from 'bn.js';

const leftPad = (string, bytes) => {
    let result = string;
    while (result.length < bytes * 2) {
        result = `0${result}`;
    }
    return result;
};

/**
 * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
 * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
 *
 * @method iso13616Prepare
 * @param {String} iban the IBAN
 * @returns {String} the prepared IBAN
 */
const iso13616Prepare = (iban) => {
    const A = 'A'.charCodeAt(0);
    const Z = 'Z'.charCodeAt(0);

    iban = iban.toUpperCase();
    iban = iban.substr(4) + iban.substr(0, 4);

    return iban
        .split('')
        .map((n) => {
            const code = n.charCodeAt(0);
            if (code >= A && code <= Z) {
                // A = 10, B = 11, ... Z = 35
                return code - A + 10;
            } else {
                return n;
            }
        })
        .join('');
};

/**
 * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
 *
 * @method mod9710
 * @param {String} iban
 * @returns {Number}
 */
const module9710 = (iban) => {
    let remainder = iban;

    let block;

    while (remainder.length > 2) {
        block = remainder.slice(0, 9);
        remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
    }

    return parseInt(remainder, 10) % 97;
};

export default class Iban {
    /**
     * @param {String} iban
     *
     * @constructor
     */
    constructor(iban) {
        this._iban = iban;
    }

    /**
     * This method should be used to create an sophon address from a direct iban address
     *
     * @method toAddress
     *
     * @param {String} iban
     *
     * @returns {String}
     */
    static toAddress(iban) {
        iban = new Iban(iban);

        if (!iban.isDirect()) {
            throw new Error("IBAN is indirect and can't be converted");
        }

        return iban.toAddress();
    }

    /**
     * This method should be used to create iban address from an sophon address
     *
     * @method toIban
     *
     * @param {String} address
     *
     * @returns {String} the IBAN address
     */
    static toIban(address) {
        return Iban.fromAddress(address).toString();
    }

    /**
     * This method should be used to create iban object from an sophon address
     *
     * @method fromAddress
     *
     * @param {String} address
     *
     * @returns {Iban} the IBAN object
     */
    static fromAddress(address) {
        if (!Utils.isAddress(address)) {
            throw new Error(`Provided address is not a valid address: ${address}`);
        }

        address = address.replace('0x', '').replace('0X', '');

        const asBn = new BigNumber(address, 16);

        const base36 = asBn.toString(36);

        const padded = leftPad(base36, 15);

        return Iban.fromBban(padded.toUpperCase());
    }

    /**
     * Convert the passed BBAN to an IBAN for this country specification.
     * Please note that <i>"generation of the IBAN shall be the exclusive responsibility of the bank/branch servicing the account"</i>.
     * This method implements the preferred algorithm described in http://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits
     *
     * @method fromBban
     *
     * @param {String} bban the BBAN to convert to IBAN
     *
     * @returns {Iban} the IBAN object
     */
    static fromBban(bban) {
        const countryCode = 'XE';

        const remainder = module9710(iso13616Prepare(`${countryCode}00${bban}`));
        const checkDigit = `0${98 - remainder}`.slice(-2);

        return new Iban(countryCode + checkDigit + bban);
    }

    /**
     * Should be used to create IBAN object for given institution and identifier
     *
     * @method createIndirect
     *
     * @param {Object} options, required options are "institution" and "identifier"
     *
     * @returns {Iban} the IBAN object
     */
    static createIndirect(options) {
        return Iban.fromBban(`SOF${options.institution}${options.identifier}`);
    }

    /**
     * This method should be used to check if given string is valid iban object
     *
     * @method isValid
     *
     * @param {String} iban string
     *
     * @returns {Boolean} true if it is valid IBAN
     */
    static isValid(iban) {
        const i = new Iban(iban);
        return i.isValid();
    }

    /**
     * Should be called to check if iban is correct
     *
     * @method isValid
     *
     * @returns {Boolean} true if it is, otherwise false
     */
    isValid() {
        return (
            /^XE\d{2}(SOF[0-9A-Z]{13}|[0-9A-Z]{30,31})$/.test(this._iban) &&
            module9710(iso13616Prepare(this._iban)) === 1
        );
    }

    /**
     * Should be called to check if iban number is direct
     *
     * @method isDirect
     *
     * @returns {Boolean} true if it is, otherwise false
     */
    isDirect() {
        return this._iban.length === 34 || this._iban.length === 35;
    }

    /**
     * Should be called to check if iban number if indirect
     *
     * @method isIndirect
     *
     * @returns {Boolean} true if it is, otherwise false
     */
    isIndirect() {
        return this._iban.length === 20;
    }

    /**
     * Should be called to get iban checksum
     * Uses the mod-97-10 checksumming protocol (ISO/IEC 7064:2003)
     *
     * @method checksum
     *
     * @returns {String} checksum
     */
    checksum() {
        return this._iban.substr(2, 2);
    }

    /**
     * Should be called to get institution identifier
     * eg. XREG
     *
     * @method institution
     *
     * @returns {String} institution identifier
     */
    institution() {
        return this.isIndirect() ? this._iban.substr(7, 4) : '';
    }

    /**
     * Should be called to get client identifier within institution
     * eg. GAVOFYORK
     *
     * @method client
     *
     * @returns {String} client identifier
     */
    client() {
        return this.isIndirect() ? this._iban.substr(11) : '';
    }

    /**
     * Should be called to get client direct address
     *
     * @method toAddress
     *
     * @returns {String} sophon address
     */
    toAddress() {
        if (this.isDirect()) {
            const base36 = this._iban.substr(4);
            const asBn = new BigNumber(base36, 36);
            return Utils.toChecksumAddress(asBn.toString(16, 20));
        }

        return '';
    }

    toString() {
        return this._iban;
    }
}
