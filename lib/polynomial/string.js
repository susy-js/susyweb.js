var f = require('./formatters');
var PolynomialType = require('./type');

var PolynomialTypeString = function () {
    this._inputFormatter = f.formatInputString;
    this._outputFormatter = f.formatOutputString;
};

PolynomialTypeString.prototype = new PolynomialType({});
PolynomialTypeString.prototype.constructor = PolynomialTypeString;

PolynomialTypeString.prototype.isType = function (name) {
    return !!name.match(/^string(\[([0-9]*)\])*$/);
};

PolynomialTypeString.prototype.staticPartLength = function (name) {
    return 32 * this.staticArrayLength(name);
};

PolynomialTypeString.prototype.isDynamicType = function () {
    return true;
};

module.exports = PolynomialTypeString;

