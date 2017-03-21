'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberToGreyscale = exports.PropTypes = exports.css = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = exports.css = require('js-util/lib/react-css').default;
var PropTypes = exports.PropTypes = require('react-schema').PropTypes;

/**
 * Converts a number between 0..1 to a greyscale color (opacity of black).
 *   1 == black
 *   0 == white
 * @param {Number|String} value:  The value to convert.
 *                                Ignore (returns) strings.
 * @return {String} a hex value.
 */
var numberToGreyscale = exports.numberToGreyscale = function numberToGreyscale(value) {
  if (_ramda2.default.is(Number, value)) {
    value = _ramda2.default.clamp(0, 1, value);
    value = (0, _color2.default)('white').darken(value).hexString();
  }
  return value;
};
//# sourceMappingURL=util.js.map