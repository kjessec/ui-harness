'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _util = require('../util');

var _GlobalStyles = require('../GlobalStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COLORS = {
  grey: '#CFCFCF',
  red: '#C61604',
  blue: '#1900D3',
  black: '#000000',
  green: '007500#'
};

/**
 * An <OutputLog> log value.
 */

var Value = function (_React$Component) {
  _inherits(Value, _React$Component);

  function Value() {
    _classCallCheck(this, Value);

    return _possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).apply(this, arguments));
  }

  _createClass(Value, [{
    key: 'styles',
    value: function styles() {
      var _props = this.props,
          color = _props.color,
          mono = _props.mono,
          size = _props.size;

      return (0, _util.css)({
        base: {
          fontFamily: mono ? _GlobalStyles.FONT_MONO : _GlobalStyles.FONT_SANS,
          fontSize: size,
          color: COLORS[color],
          paddingRight: 6
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      return _react2.default.createElement(
        'span',
        { style: styles.base },
        this.props.children
      );
    }
  }]);

  return Value;
}(_react2.default.Component);

Value.propTypes = {
  color: _util.PropTypes.oneOf(['black', 'blue', 'red', 'grey']),
  mono: _util.PropTypes.bool,
  size: _util.PropTypes.numberOrString,
  children: _util.PropTypes.node
};
Value.defaultProps = {
  mono: true,
  size: 12
};
exports.default = (0, _radium2.default)(Value);
//# sourceMappingURL=Value.js.map