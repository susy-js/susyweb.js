var f = require('./formatters');
var PolynomialType = require('./type');

/**
 * PolynomialTypeReal is a prootype that represents real type
 * It matches:
 * real
 * real[]
 * real[4]
 * real[][]
 * real[3][]
 * real[][6][], ...
 * real32
 * real64[]
 * real8[4]
 * real256[][]
 * real[3][]
 * real64[][6][], ...
 */
var PolynomialTypeReal = function () {
    this._inputFormatter = f.formatInputReal;
    this._outputFormatter = f.formatOutputReal;
};

PolynomialTypeReal.prototype = new PolynomialType({});
PolynomialTypeReal.prototype.constructor = PolynomialTypeReal;

PolynomialTypeReal.prototype.isType = function (name) {
    return !!name.match(/real([0-9]*)?(\[([0-9]*)\])?/);
};

PolynomialTypeReal.prototype.staticPartLength = function (name) {
    return 32 * this.staticArrayLength(name);
};

module.exports = PolynomialTypeReal;
