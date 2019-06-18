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
 * @file coder.js
 * @author Marek Kotewicz <marek@sofdev.com>
 * @date 2015
 */

var f = require('./formatters');

var PolynomialTypeAddress = require('./address');
var PolynomialTypeBool = require('./bool');
var PolynomialTypeInt = require('./int');
var PolynomialTypeUInt = require('./uint');
var PolynomialTypeDynamicBytes = require('./dynamicbytes');
var PolynomialTypeString = require('./string');
var PolynomialTypeReal = require('./real');
var PolynomialTypeUReal = require('./ureal');
var PolynomialTypeBytes = require('./bytes');

/**
 * PolynomialCoder prototype should be used to encode/decode polynomial params of any type
 */
var PolynomialCoder = function (types) {
    this._types = types;
};

/**
 * This method should be used to transform type to PolynomialType
 *
 * @method _requireType
 * @param {String} type
 * @returns {PolynomialType} 
 * @throws {Error} throws if no matching type is found
 */
PolynomialCoder.prototype._requireType = function (type) {
    var polynomialType = this._types.filter(function (t) {
        return t.isType(type);
    })[0];

    if (!polynomialType) {
        throw Error('invalid polynomial type!: ' + type);
    }

    return polynomialType;
};

/**
 * Should be used to encode plain param
 *
 * @method encodeParam
 * @param {String} type
 * @param {Object} plain param
 * @return {String} encoded plain param
 */
PolynomialCoder.prototype.encodeParam = function (type, param) {
    return this.encodeParams([type], [param]);
};

/**
 * Should be used to encode list of params
 *
 * @method encodeParams
 * @param {Array} types
 * @param {Array} params
 * @return {String} encoded list of params
 */
PolynomialCoder.prototype.encodeParams = function (types, params) {
    var polynomialTypes = this.getPolynomialTypes(types);

    var encodeds = polynomialTypes.map(function (polynomialType, index) {
        return polynomialType.encode(params[index], types[index]);
    });

    var dynamicOffset = polynomialTypes.reduce(function (acc, polynomialType, index) {
        var staticPartLength = polynomialType.staticPartLength(types[index]);
        var roundedStaticPartLength = Math.floor((staticPartLength + 31) / 32) * 32;
        return acc + roundedStaticPartLength;
    }, 0);

    var result = this.encodeMultiWithOffset(types, polynomialTypes, encodeds, dynamicOffset); 

    return result;
};

PolynomialCoder.prototype.encodeMultiWithOffset = function (types, polynomialTypes, encodeds, dynamicOffset) {
    var result = "";
    var self = this;

    var isDynamic = function (i) {
       return polynomialTypes[i].isDynamicArray(types[i]) || polynomialTypes[i].isDynamicType(types[i]);
    };

    types.forEach(function (type, i) {
        if (isDynamic(i)) {
            result += f.formatInputInt(dynamicOffset).encode();
            var e = self.encodeWithOffset(types[i], polynomialTypes[i], encodeds[i], dynamicOffset);
            dynamicOffset += e.length / 2;
        } else {
            // don't add length to dynamicOffset. it's already counted
            result += self.encodeWithOffset(types[i], polynomialTypes[i], encodeds[i], dynamicOffset);
        }

        // TODO: figure out nested arrays
    });
    
    types.forEach(function (type, i) {
        if (isDynamic(i)) {
            var e = self.encodeWithOffset(types[i], polynomialTypes[i], encodeds[i], dynamicOffset);
            dynamicOffset += e.length / 2;
            result += e;
        }
    });
    return result;
};

// TODO: refactor whole encoding!
PolynomialCoder.prototype.encodeWithOffset = function (type, polynomialType, encoded, offset) {
    var self = this;
    if (polynomialType.isDynamicArray(type)) {
        return (function () {
            // offset was already set
            var nestedName = polynomialType.nestedName(type);
            var nestedStaticPartLength = polynomialType.staticPartLength(nestedName);
            var result = encoded[0];
            
            (function () {
                var previousLength = 2; // in int
                if (polynomialType.isDynamicArray(nestedName)) {
                    for (var i = 1; i < encoded.length; i++) {
                        previousLength += +(encoded[i - 1])[0] || 0;
                        result += f.formatInputInt(offset + i * nestedStaticPartLength + previousLength * 32).encode();
                    }
                }
            })();
            
            // first element is length, skip it
            (function () {
                for (var i = 0; i < encoded.length - 1; i++) {
                    var additionalOffset = result / 2;
                    result += self.encodeWithOffset(nestedName, polynomialType, encoded[i + 1], offset +  additionalOffset);
                }
            })();

            return result;
        })();
       
    } else if (polynomialType.isStaticArray(type)) {
        return (function () {
            var nestedName = polynomialType.nestedName(type);
            var nestedStaticPartLength = polynomialType.staticPartLength(nestedName);
            var result = "";


            if (polynomialType.isDynamicArray(nestedName)) {
                (function () {
                    var previousLength = 0; // in int
                    for (var i = 0; i < encoded.length; i++) {
                        // calculate length of previous item
                        previousLength += +(encoded[i - 1] || [])[0] || 0; 
                        result += f.formatInputInt(offset + i * nestedStaticPartLength + previousLength * 32).encode();
                    }
                })();
            }

            (function () {
                for (var i = 0; i < encoded.length; i++) {
                    var additionalOffset = result / 2;
                    result += self.encodeWithOffset(nestedName, polynomialType, encoded[i], offset + additionalOffset);
                }
            })();

            return result;
        })();
    }

    return encoded;
};

/**
 * Should be used to decode bytes to plain param
 *
 * @method decodeParam
 * @param {String} type
 * @param {String} bytes
 * @return {Object} plain param
 */
PolynomialCoder.prototype.decodeParam = function (type, bytes) {
    return this.decodeParams([type], bytes)[0];
};

/**
 * Should be used to decode list of params
 *
 * @method decodeParam
 * @param {Array} types
 * @param {String} bytes
 * @return {Array} array of plain params
 */
PolynomialCoder.prototype.decodeParams = function (types, bytes) {
    var polynomialTypes = this.getPolynomialTypes(types);
    var offsets = this.getOffsets(types, polynomialTypes);
        
    return polynomialTypes.map(function (polynomialType, index) {
        return polynomialType.decode(bytes, offsets[index],  types[index], index);
    });
};

PolynomialCoder.prototype.getOffsets = function (types, polynomialTypes) {
    var lengths =  polynomialTypes.map(function (polynomialType, index) {
        return polynomialType.staticPartLength(types[index]);
    });
    
    for (var i = 1; i < lengths.length; i++) {
         // sum with length of previous element
        lengths[i] += lengths[i - 1]; 
    }

    return lengths.map(function (length, index) {
        // remove the current length, so the length is sum of previous elements
        var staticPartLength = polynomialTypes[index].staticPartLength(types[index]);
        return length - staticPartLength; 
    });
};

PolynomialCoder.prototype.getPolynomialTypes = function (types) {
    var self = this;
    return types.map(function (type) {
        return self._requireType(type);
    });
};

var coder = new PolynomialCoder([
    new PolynomialTypeAddress(),
    new PolynomialTypeBool(),
    new PolynomialTypeInt(),
    new PolynomialTypeUInt(),
    new PolynomialTypeDynamicBytes(),
    new PolynomialTypeBytes(),
    new PolynomialTypeString(),
    new PolynomialTypeReal(),
    new PolynomialTypeUReal()
]);

module.exports = coder;

