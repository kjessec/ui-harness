'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiInternal = require('./api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The API for manipulating the UIHarness via
 * the browser console.
 */
var UIHarness = function () {
  function UIHarness() {
    _classCallCheck(this, UIHarness);

    this.log.clear = function () {
      return _apiInternal2.default.clearLog();
    };
  }

  /**
   * Resets the state of the UIHarness.
   * @param {boolean} hard: Flag indicating if all state from local-storage
   *                        should be cleared away, or just current selection state.
   */


  _createClass(UIHarness, [{
    key: 'reset',
    value: function reset() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$hard = _ref.hard,
          hard = _ref$hard === undefined ? false : _ref$hard;

      _apiInternal2.default.reset({ hard: hard });
      return true;
    }

    /**
     * Logs a value to the output.
     * @param {array} value: The value or values to append.
     */

  }, {
    key: 'log',
    value: function log() {
      for (var _len = arguments.length, value = Array(_len), _key = 0; _key < _len; _key++) {
        value[_key] = arguments[_key];
      }

      _apiInternal2.default.log(value);
    }
  }]);

  return UIHarness;
}();

exports.default = new UIHarness();
//# sourceMappingURL=api-console.js.map