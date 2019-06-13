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
 * @file index.d.ts
 * @author Huan Zhang <huanzhang30@gmail.com>,
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import {Accounts} from 'susyweb-sof-accounts';
import {provider} from 'susyweb-providers';
import {AbstractSusyWebModule, SRLPEncodedTransaction, TransactionConfig, SusyWebModuleOptions} from 'susyweb-core';
import * as net from 'net';

export class Personal extends AbstractSusyWebModule {
    constructor(provider: provider, net?: net.Socket|null, options?: SusyWebModuleOptions, accounts?: Accounts|null);

    newAccount(password: string, callback?: (error: Error, address: string) => void): Promise<string>;

    sign(
        dataToSign: string,
        address: string,
        password: string,
        callback?: (error: Error, signature: string) => void
    ): Promise<string>;

    ecRecover(
        dataThatWasSigned: string,
        signature: string,
        callback?: (error: Error, address: string) => void
    ): Promise<string>;

    signTransaction(
        transactionConfig: TransactionConfig,
        password: string,
        callback?: (error: Error, SRLPEncodedTransaction: SRLPEncodedTransaction) => void
    ): Promise<SRLPEncodedTransaction>;

    sendTransaction(
        transactionConfig: TransactionConfig,
        password: string,
        callback?: (error: Error, transactionHash: string) => void
    ): Promise<string>;

    unlockAccount(
        address: string,
        password: string,
        unlockDuration: number,
        callback?: (error: Error) => void
    ): Promise<boolean>;

    lockAccount(address: string, callback?: (error: Error, success: boolean) => void): Promise<boolean>;

    getAccounts(callback?: (error: Error, accounts: string[]) => void): Promise<string[]>;

    importRawKey(privateKey: string, password: string): Promise<string>;
}
