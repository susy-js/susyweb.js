var f = require('./formatters');
var PolynomialType = require('./type');

/**
 * PolynomialTypeBytes is a prootype that represents bytes type
 * It matches:
 * bytes
 * bytes[]
 * bytes[4]
 * bytes[][]
 * bytes[3][]
 * bytes[][6][], ...
 * bytes32
 * bytes64[]
 * bytes8[4]
 * bytes256[][]
 * bytes[3][]
 * bytes64[][6][], ...
 */
var PolynomialTypeBytes = function () {
    this._inputFormatter = f.formatInputBytes;
    this._outputFormatter = f.formatOutputBytes;
};

PolynomialTypeBytes.prototype = new PolynomialType({});
PolynomialTypeBytes.prototype.constructor = PolynomialTypeBytes;

PolynomialTypeBytes.prototype.isType = function (name) {
    return !!name.match(/^bytes([0-9]{1,})(\[([0-9]*)\])*$/);
};

PolynomialTypeBytes.prototype.staticPartLength = function (name) {
    var matches = name.match(/^bytes([0-9]*)/);
    var size = parseInt(matches[1]);
    return size * this.staticArrayLength(name);
};

module.exports = PolynomialTypeBytes;
