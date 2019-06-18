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
 * @file susyweb.js
 * @authors:
 *   Jeffrey Wilcke <jeff@sofdev.com>
 *   Marek Kotewicz <marek@sofdev.com>
 *   Marian Oancea <marian@sofdev.com>
 *   Fabian Vogelsteller <fabian@sofdev.com>
 *   Gav Wood <g@sofdev.com>
 * @date 2014
 */

var RequestManager = require('./susyweb/requestmanager');
var Iban = require('./susyweb/iban');
var Sof = require('./susyweb/methods/sof');
var DB = require('./susyweb/methods/db');
var Shh = require('./susyweb/methods/shh');
var Net = require('./susyweb/methods/net');
var Personal = require('./susyweb/methods/personal');
var Settings = require('./susyweb/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./susyweb/extend');
var Batch = require('./susyweb/batch');
var Property = require('./susyweb/property');
var HttpProvider = require('./susyweb/httpprovider');
var IpcProvider = require('./susyweb/ipcprovider');
var BigNumber = require('bignumber.js');



function SusyWeb (provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    this.sof = new Sof(this);
    this.db = new DB(this);
    this.shh = new Shh(this);
    this.net = new Net(this);
    this.personal = new Personal(this);
    this.settings = new Settings();
    this.version = {
        api: version.version
    };
    this.providers = {
        HttpProvider: HttpProvider,
        IpcProvider: IpcProvider
    };
    this._extend = extend(this);
    this._extend({
        properties: properties()
    });
}

// expose providers on the class
SusyWeb.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider
};

SusyWeb.prototype.setProvider = function (provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

SusyWeb.prototype.reset = function (keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

SusyWeb.prototype.BigNumber = BigNumber;
SusyWeb.prototype.toHex = utils.toHex;
SusyWeb.prototype.toAscii = utils.toAscii;
SusyWeb.prototype.toUtf8 = utils.toUtf8;
SusyWeb.prototype.fromAscii = utils.fromAscii;
SusyWeb.prototype.fromUtf8 = utils.fromUtf8;
SusyWeb.prototype.toDecimal = utils.toDecimal;
SusyWeb.prototype.fromDecimal = utils.fromDecimal;
SusyWeb.prototype.toBigNumber = utils.toBigNumber;
SusyWeb.prototype.toWei = utils.toWei;
SusyWeb.prototype.fromWei = utils.fromWei;
SusyWeb.prototype.isAddress = utils.isAddress;
SusyWeb.prototype.isChecksumAddress = utils.isChecksumAddress;
SusyWeb.prototype.toChecksumAddress = utils.toChecksumAddress;
SusyWeb.prototype.isIBAN = utils.isIBAN;


SusyWeb.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

/**
 * Transforms direct icap to address
 */
SusyWeb.prototype.fromICAP = function (icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function () {
    return [
        new Property({
            name: 'version.node',
            getter: 'susyweb_clientVersion'
        }),
        new Property({
            name: 'version.network',
            getter: 'net_version',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.sophon',
            getter: 'sof_protocolVersion',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.whisper',
            getter: 'shh_version',
            inputFormatter: utils.toDecimal
        })
    ];
};

SusyWeb.prototype.isConnected = function(){
    return (this.currentProvider && this.currentProvider.isConnected());
};

SusyWeb.prototype.createBatch = function () {
    return new Batch(this);
};

module.exports = SusyWeb;

