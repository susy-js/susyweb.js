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
 * @file TransactionSigner.js
 * @author Samuel Furter <samuel@sophon.org>
 * @date 2019
 */

import SophonTx from 'sophonjs-tx';

export default class TransactionSigner {
    /**
     * @param {Utils} utils // TODO: Remove utils dependency and use a Hex VO
     * @param {Object} formatters // TODO: Remove formatters dependency and use a Transaction VO
     *
     * @constructor
     */
    constructor(utils, formatters) {
        this.utils = utils;
        this.formatters = formatters;
    }

    /**
     * Add to be production build save
     *
     * @property Type
     *
     * @returns {String}
     */
    get type() {
        return 'TransactionSigner';
    }

    /**
     * Signs the transaction
     *
     * @param {Object} transaction
     * @param {String} privateKey
     *
     * @returns {Promise<{messageHash, v, r, s, rawTransaction}>}
     */
    async sign(transaction, privateKey) {
        if (!privateKey) {
            throw new Error('No privateKey given to the TransactionSigner.');
        }

        if (privateKey.startsWith('0x')) {
            privateKey = privateKey.substring(2);
        }

        const sofTx = new SophonTx(transaction);
        sofTx.sign(Buffer.from(privateKey, 'hex'));

        const validationResult = sofTx.validate(true);

        if (validationResult !== '') {
            throw new Error(`TransactionSigner Error: ${validationResult}`);
        }

        const srlpEncoded = sofTx.serialize().toString('hex');
        const rawTransaction = '0x' + srlpEncoded;
        const transactionHash = this.utils.keccak256(rawTransaction);

        return {
            messageHash: Buffer.from(sofTx.hash(false)).toString('hex'),
            v: '0x' + Buffer.from(sofTx.v).toString('hex'),
            r: '0x' + Buffer.from(sofTx.r).toString('hex'),
            s: '0x' + Buffer.from(sofTx.s).toString('hex'),
            rawTransaction,
            transactionHash
        };
    }
}
