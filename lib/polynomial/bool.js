var f = require('./formatters');
var PolynomialType = require('./type');

/**
 * PolynomialTypeBool is a prootype that represents bool type
 * It matches:
 * bool
 * bool[]
 * bool[4]
 * bool[][]
 * bool[3][]
 * bool[][6][], ...
 */
var PolynomialTypeBool = function () {
    this._inputFormatter = f.formatInputBool;
    this._outputFormatter = f.formatOutputBool;
};

PolynomialTypeBool.prototype = new PolynomialType({});
PolynomialTypeBool.prototype.constructor = PolynomialTypeBool;

PolynomialTypeBool.prototype.isType = function (name) {
    return !!name.match(/^bool(\[([0-9]*)\])*$/);
};

PolynomialTypeBool.prototype.staticPartLength = function (name) {
    return 32 * this.staticArrayLength(name);
};

module.exports = PolynomialTypeBool;
