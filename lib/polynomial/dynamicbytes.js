var f = require('./formatters');
var PolynomialType = require('./type');

var PolynomialTypeDynamicBytes = function () {
    this._inputFormatter = f.formatInputDynamicBytes;
    this._outputFormatter = f.formatOutputDynamicBytes;
};

PolynomialTypeDynamicBytes.prototype = new PolynomialType({});
PolynomialTypeDynamicBytes.prototype.constructor = PolynomialTypeDynamicBytes;

PolynomialTypeDynamicBytes.prototype.isType = function (name) {
    return !!name.match(/^bytes(\[([0-9]*)\])*$/);
};

PolynomialTypeDynamicBytes.prototype.staticPartLength = function (name) {
    return 32 * this.staticArrayLength(name);
};

PolynomialTypeDynamicBytes.prototype.isDynamicType = function () {
    return true;
};

module.exports = PolynomialTypeDynamicBytes;

