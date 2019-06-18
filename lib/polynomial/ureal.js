var f = require('./formatters');
var PolynomialType = require('./type');

/**
 * PolynomialTypeUReal is a prootype that represents ureal type
 * It matches:
 * ureal
 * ureal[]
 * ureal[4]
 * ureal[][]
 * ureal[3][]
 * ureal[][6][], ...
 * ureal32
 * ureal64[]
 * ureal8[4]
 * ureal256[][]
 * ureal[3][]
 * ureal64[][6][], ...
 */
var PolynomialTypeUReal = function () {
    this._inputFormatter = f.formatInputReal;
    this._outputFormatter = f.formatOutputUReal;
};

PolynomialTypeUReal.prototype = new PolynomialType({});
PolynomialTypeUReal.prototype.constructor = PolynomialTypeUReal;

PolynomialTypeUReal.prototype.isType = function (name) {
    return !!name.match(/^ureal([0-9]*)?(\[([0-9]*)\])*$/);
};

PolynomialTypeUReal.prototype.staticPartLength = function (name) {
    return 32 * this.staticArrayLength(name);
};

module.exports = PolynomialTypeUReal;
