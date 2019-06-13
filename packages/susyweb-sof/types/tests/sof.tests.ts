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
 * @file sof-tests.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2018
 */

import {Log, Transaction, TransactionReceipt, SRLPEncodedTransaction} from 'susyweb-core';
import {Sof, BlockHeader, Syncing, Block, GetProof} from 'susyweb-sof';

const sof = new Sof('http://localhost:8545');

// $ExpectType new (jsonInterface: AbiItem | AbiItem[], address?: string | undefined, options?: ContractOptions | undefined) => Contract
sof.Contract;

// $ExpectType new (iban: string) => Iban
sof.Iban;

// $ExpectType Personal
sof.personal;

// $ExpectType Accounts
sof.accounts;

// $ExpectType Ens
sof.ens;

// $ExpectType AbiCoder
sof.abi;

// $ExpectType Network
sof.net;

sof.clearSubscriptions();

// $ExpectType Subscription<Log>
sof.subscribe('logs');

// $ExpectType Subscription<Log>
sof.subscribe('logs', {});
// $ExpectType Subscription<Log>
sof.subscribe('logs', {}, (error: Error, log: Log) => {});

// $ExpectType Subscription<Syncing>
sof.subscribe('syncing');
// $ExpectType Subscription<Syncing>
sof.subscribe('syncing', null, (error: Error, result: Syncing) => {});

// $ExpectType Subscription<BlockHeader>
sof.subscribe('newBlockHeaders');
// $ExpectType Subscription<BlockHeader>
sof.subscribe('newBlockHeaders', null, (error: Error, blockHeader: BlockHeader) => {});

// $ExpectType Subscription<string>
sof.subscribe('pendingTransactions');
// $ExpectType Subscription<string>
sof.subscribe('pendingTransactions', null, (error: Error, transactionHash: string) => {});

// $ExpectType Providers
Sof.providers;

// $ExpectType any
sof.givenProvider;

// $ExpectType BatchRequest
new sof.BatchRequest();

// $ExpectType string | null
sof.defaultAccount;

// $ExpectType string | number
sof.defaultBlock;

// $ExpectType HttpProvider | IpcProvider | WebsocketProvider | SusyWebSophonProvider | CustomProvider
sof.currentProvider;

// $ExpectType Promise<string>
sof.getProtocolVersion();
// $ExpectType Promise<string>
sof.getProtocolVersion((error: Error, protocolVersion: string) => {});

// $ExpectType Promise<boolean | Syncing>
sof.isSyncing();
// $ExpectType Promise<boolean | Syncing>
sof.isSyncing((error: Error, syncing: Syncing) => {});

// $ExpectType Promise<string>
sof.getCoinbase();
// $ExpectType Promise<string>
sof.getCoinbase((error: Error, coinbaseAddress: string) => {});

// $ExpectType Promise<boolean>
sof.isMining();
// $ExpectType Promise<boolean>
sof.isMining((error: Error, mining: boolean) => {});

// $ExpectType Promise<number>
sof.getHashrate();
// $ExpectType Promise<number>
sof.getHashrate((error: Error, hashes: number) => {});

// $ExpectType Promise<string>
sof.getGasPrice();
// $ExpectType Promise<string>
sof.getGasPrice((error: Error, gasPrice: string) => {});

// $ExpectType Promise<string[]>
sof.getAccounts();
// $ExpectType Promise<string[]>
sof.getAccounts((error: Error, accounts: string[]) => {});

// $ExpectType Promise<number>
sof.getBlockNumber();
// $ExpectType Promise<number>
sof.getBlockNumber((error: Error, blockNumber: number) => {});

// $ExpectType Promise<string>
sof.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<string>
sof.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<string>
sof.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000', (error: Error, balance: string) => {});
// $ExpectType Promise<string>
sof.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<string>
sof.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000, (error: Error, balance: string) => {});

// $ExpectType Promise<string>
sof.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2);
// $ExpectType Promise<string>
sof.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, '1000');
// $ExpectType Promise<string>
sof.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, '1000', (error: Error, balance: string) => {});
// $ExpectType Promise<string>
sof.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, 1000);
// $ExpectType Promise<string>
sof.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, 1000, (error: Error, balance: string) => {});

// $ExpectType Promise<string>
sof.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<string>
sof.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<string>
sof.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000', (error: Error, balance: string) => {});
// $ExpectType Promise<string>
sof.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<string>
sof.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000, (error: Error, balance: string) => {});

// $ExpectType Promise<Block>
sof.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<Block>
sof.getBlock(345);
// $ExpectType Promise<Block>
sof.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', true);
// $ExpectType Promise<Block>
sof.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', false);
// $ExpectType Promise<Block>
sof.getBlock(345);
// $ExpectType Promise<Block>
sof.getBlock(345, true);
// $ExpectType Promise<Block>
sof.getBlock(345, false);
// $ExpectType Promise<Block>
sof.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
sof.getBlock(345, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
sof.getBlock(345, true, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
sof.getBlock(345, false, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
sof.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', true, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
sof.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', false, (error: Error, block: Block) => {});

// $ExpectType Promise<number>
sof.getBlockTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, numberOfTransactions: number) => {}
);
// $ExpectType Promise<number>
sof.getBlockTransactionCount(345);
// $ExpectType Promise<number>
sof.getBlockTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, numberOfTransactions: number) => {}
);
// $ExpectType Promise<number>
sof.getBlockTransactionCount(345);

// $ExpectType Promise<Block>
sof.getUncle('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 4);
// $ExpectType Promise<Block>
sof.getUncle(345, 4);
// $ExpectType Promise<Block>
sof.getUncle('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 4, true);
// $ExpectType Promise<Block>
sof.getUncle('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 4, false);
// $ExpectType Promise<Block>
sof.getUncle('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 4, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
sof.getUncle(345, 4, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
sof.getUncle(345, 4, true);
// $ExpectType Promise<Block>
sof.getUncle(345, 4, false);
// $ExpectType Promise<Block>
sof.getUncle('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 4, true, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
sof.getUncle('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 4, false, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
sof.getUncle(345, 4, true, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
sof.getUncle(345, 4, false, (error: Error, uncle: {}) => {});

// $ExpectType Promise<Transaction>
sof.getTransaction('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<Transaction>
sof.getTransaction('0x407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, transaction: Transaction) => {});

// $ExpectType Promise<Transaction>
sof.getTransactionFromBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2);
// $ExpectType Promise<Transaction>
sof.getTransactionFromBlock(345, 2);
// $ExpectType Promise<Transaction>
sof.getTransactionFromBlock(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    2,
    (error: Error, transaction: Transaction) => {}
);
// $ExpectType Promise<Transaction>
sof.getTransactionFromBlock(345, 2, (error: Error, transaction: Transaction) => {});

// $ExpectType Promise<TransactionReceipt>
sof.getTransactionReceipt('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<TransactionReceipt>
sof.getTransactionReceipt(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, transactionReceipt: TransactionReceipt) => {}
);

// $ExpectType Promise<number>
sof.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<number>
sof.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<number>
sof.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<number>
sof.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, count: number) => {});
// $ExpectType Promise<number>
sof.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, count: number) => {});
// $ExpectType Promise<number>
sof.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000, (error: Error, count: number) => {});
// $ExpectType Promise<number>
sof.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000', (error: Error, count: number) => {});

const code = '603d80600c6000396000f3007c0';

// $ExpectType PromiEvent<TransactionReceipt>
sof.sendTransaction({
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    data: 'code'
});
// $ExpectType PromiEvent<TransactionReceipt>
sof.sendTransaction(
    {
        from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        data: 'code'
    },
    (error: Error, hash: string) => {}
);

// $ExpectType PromiEvent<TransactionReceipt>
sof.sendSignedTransaction('0xf889808609184e72a0008227109');
// $ExpectType PromiEvent<TransactionReceipt>
sof.sendSignedTransaction('0xf889808609184e72a0008227109', (error: Error, hash: string) => {});

// $ExpectType Promise<string>
sof.sign('Hello world', '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe');
// $ExpectType Promise<string>
sof.sign('Hello world', 3);
// $ExpectType Promise<string>
sof.sign('Hello world', '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', (error: Error, signature: string) => {});
// $ExpectType Promise<string>
sof.sign('Hello world', 3, (error: Error, signature: string) => {});

// $ExpectType Promise<SRLPEncodedTransaction>
sof.signTransaction({
    from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    gasPrice: '20000000000',
    gas: '21000',
    to: '0x3535353535353535353535353535353535353535',
    value: '1000000000000000000',
    data: ''
});
// $ExpectType Promise<SRLPEncodedTransaction>
sof.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0'
);
// $ExpectType Promise<SRLPEncodedTransaction>
sof.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    (error: Error, signedTransaction: SRLPEncodedTransaction) => {}
);
// $ExpectType Promise<SRLPEncodedTransaction>
sof.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    (error: Error, signedTransaction: SRLPEncodedTransaction) => {}
);

// $ExpectType Promise<string>
sof.call({
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
    data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
});
// $ExpectType Promise<string>
sof.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100
);
// $ExpectType Promise<string>
sof.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    '100'
);
// $ExpectType Promise<string>
sof.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    (error: Error, data: string) => {}
);
// $ExpectType Promise<string>
sof.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    '100',
    (error: Error, data: string) => {}
);
// $ExpectType Promise<string>
sof.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100,
    (error: Error, data: string) => {}
);

// $ExpectType Promise<string>
sof.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100,
    (error: Error, data: string) => {}
);

// $ExpectType Promise<number>
sof.estimateGas({
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
});
// $ExpectType Promise<number>
sof.estimateGas(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    (error: Error, gas: number) => {}
);

// $ExpectType Promise<Log[]>
sof.getPastLogs({
    address: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    topics: ['0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234']
});
// $ExpectType Promise<Log[]>
sof.getPastLogs(
    {
        address: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        topics: ['0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234']
    },
    (error: Error, logs: Log[]) => {}
);

// $ExpectType Promise<string[]>
sof.getWork();
// $ExpectType Promise<string[]>
sof.getWork((error: Error, result: string[]) => {});

// $ExpectType Promise<boolean>
sof.submitWork([
    '0x0000000000000001',
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    '0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000'
]);

// $ExpectType Promise<boolean>
sof.submitWork(
    [
        '0x0000000000000001',
        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        '0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000'
    ],
    (error: Error, result: boolean) => {}
);

// $ExpectType Promise<[]>
sof.pendingTransactions();

// $ExpectType Promise<[]>
sof.pendingTransactions((error: Error, result: []) => {});

// $ExpectType Promise<GetProof>
sof.getProof(
    "0x1234567890123456789012345678901234567890",
    ["0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000001"],
    "latest"
);

// $ExpectType Promise<GetProof>
sof.getProof(
    "0x1234567890123456789012345678901234567890",
    ["0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000001"],
    "latest",
    (error: Error, result: GetProof) => {}
);

// $ExpectType Promise<GetProof>
sof.getProof(
    "0x1234567890123456789012345678901234567890",
    ["0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000001"],
    10
);

// $ExpectType Promise<GetProof>
sof.getProof(
    "0x1234567890123456789012345678901234567890",
    ["0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000001"],
    10,
    (error: Error, result: GetProof) => {}
);
