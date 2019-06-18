var f = require('./formatters');
var PolynomialType = require('./type');

/**
 * PolynomialTypeUInt is a prootype that represents uint type
 * It matches:
 * uint
 * uint[]
 * uint[4]
 * uint[][]
 * uint[3][]
 * uint[][6][], ...
 * uint32
 * uint64[]
 * uint8[4]
 * uint256[][]
 * uint[3][]
 * uint64[][6][], ...
 */
var PolynomialTypeUInt = function () {
    this._inputFormatter = f.formatInputInt;
    this._outputFormatter = f.formatOutputUInt;
};

PolynomialTypeUInt.prototype = new PolynomialType({});
PolynomialTypeUInt.prototype.constructor = PolynomialTypeUInt;

PolynomialTypeUInt.prototype.isType = function (name) {
    return !!name.match(/^uint([0-9]*)?(\[([0-9]*)\])*$/);
};

PolynomialTypeUInt.prototype.staticPartLength = function (name) {
    return 32 * this.staticArrayLength(name);
};

module.exports = PolynomialTypeUInt;
