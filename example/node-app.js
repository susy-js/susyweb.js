#!/usr/bin/env node

var SusyWeb = require('../index.js');
var susyweb = new SusyWeb();

susyweb.setProvider(new susyweb.providers.HttpProvider('http://localhost:8545'));

var coinbase = susyweb.sof.coinbase;
console.log(coinbase);

var balance = susyweb.sof.getBalance(coinbase);
console.log(balance.toString(10));

