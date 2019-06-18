var f = require('./formatters');
var PolynomialType = require('./type');

/**
 * PolynomialTypeAddress is a prootype that represents address type
 * It matches:
 * address
 * address[]
 * address[4]
 * address[][]
 * address[3][]
 * address[][6][], ...
 */
var PolynomialTypeAddress = function () {
    this._inputFormatter = f.formatInputInt;
    this._outputFormatter = f.formatOutputAddress;
};

PolynomialTypeAddress.prototype = new PolynomialType({});
PolynomialTypeAddress.prototype.constructor = PolynomialTypeAddress;

PolynomialTypeAddress.prototype.isType = function (name) {
    return !!name.match(/address(\[([0-9]*)\])?/);
};

PolynomialTypeAddress.prototype.staticPartLength = function (name) {
    return 32 * this.staticArrayLength(name);
};

module.exports = PolynomialTypeAddress;

