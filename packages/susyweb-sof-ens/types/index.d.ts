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
 * @author Samuel Furter <samuel@sophon.org>, Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import {Accounts} from 'susyweb-sof-accounts';
import {AbiCoder} from 'susyweb-sof-abi';
import {Contract, ContractModuleFactory} from 'susyweb-sof-contract';
import {provider} from 'susyweb-providers';
import {AbstractSusyWebModule, PromiEvent, SusyWebModuleOptions, TransactionConfig} from 'susyweb-core';
import {formatters} from 'susyweb-core-helpers';
import {Network} from 'susyweb-net';
import {Utils} from 'susyweb-utils';
import * as net from 'net';

export class Ens extends AbstractSusyWebModule {
    constructor(
        provider: provider,
        net?: net.Socket|null,
        accounts?: Accounts|null,
        options?: SusyWebModuleOptions
    );

    registry: Registry;

    resolver(name: string): Promise<Contract>;

    supportsInterface(
        name: string,
        interfaceId: string,
        callback?: (error: Error, supportsInterface: boolean) => void
    ): Promise<boolean>;

    getAddress(name: string, callback?: (error: Error, address: string) => void): Promise<string>;

    setAddress(
        name: string,
        address: string,
        sendOptions: TransactionConfig,
        callback?: (error: Error, result: any) => void
    ): PromiEvent<any>;

    getPubkey(
        name: string,
        callback?: (error: Error, result: {[x: string]: string}) => void
    ): Promise<{[x: string]: string}>;

    setPubkey(
        name: string,
        x: string,
        y: string,
        sendOptions: TransactionConfig,
        callback?: (error: Error, result: any) => void
    ): PromiEvent<any>;

    getText(name: string, key: string, callback?: (error: Error, ensName: string) => void): Promise<string>;

    setText(
        name: string,
        key: string,
        value: string,
        sendOptions: TransactionConfig,
        callback?: (error: Error, result: any) => void
    ): PromiEvent<any>;

    getContent(name: string, callback?: (error: Error, contentHash: string) => void): Promise<string>;

    setContent(
        name: string,
        hash: string,
        sendOptions: TransactionConfig,
        callback?: (error: Error, result: any) => void
    ): PromiEvent<any>;

    getMultihash(name: string, callback?: (error: Error, multihash: string) => void): Promise<string>;

    setMultihash(
        name: string,
        hash: string,
        sendOptions: TransactionConfig,
        callback?: (error: Error, result: any) => void
    ): PromiEvent<any>;

    getContenthash(name: string, callback?: (error: Error, contenthash: string) => void): Promise<string>;

    setContenthash(
        name: string,
        hash: string,
        sendOptions: TransactionConfig,
        callback?: (error: Error, result: any) => void
    ): PromiEvent<any>;
}

export class Registry {
    constructor(
        provider: provider,
        contractModuleFactory: ContractModuleFactory,
        accounts: Accounts,
        abiCoder: AbiCoder,
        utils: Utils,
        formatters: formatters,
        options: SusyWebModuleOptions,
        net: Network
    );

    ens: Ens;

    resolverContract: Contract | null;

    setProvider(provider: provider, net?: net.Socket): boolean;

    owner(name: string, callback?: (error: Error, address: string) => void): Promise<string>;

    resolver(name: string): Promise<Contract>;

    checkNetwork(): Promise<string>;
}
