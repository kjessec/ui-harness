'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The text label for an empty collection.
 */
var EmptyLabel = function (_React$Component) {
  _inherits(EmptyLabel, _React$Component);

  function EmptyLabel() {
    _classCallCheck(this, EmptyLabel);

    return _possibleConstructorReturn(this, (EmptyLabel.__proto__ || Object.getPrototypeOf(EmptyLabel)).apply(this, arguments));
  }

  _createClass(EmptyLabel, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          fontSize: this.props.size,
          fontStyle: this.props.italic && 'italic',
          color: this.props.color,
          fontWeight: this.props.weight,
          textAlign: this.props.align
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      return _react2.default.createElement(
        'div',
        { style: styles.base },
        this.props.children
      );
    }
  }]);

  return EmptyLabel;
}(_react2.default.Component);

EmptyLabel.propTypes = {
  color: _util.PropTypes.string,
  weight: _util.PropTypes.numberOrString,
  size: _util.PropTypes.numberOrString,
  italic: _util.PropTypes.bool,
  align: _util.PropTypes.oneOf(['left', 'center', 'right']),
  children: _util.PropTypes.node
};
EmptyLabel.defaultProps = {
  color: (0, _color2.default)('white').darken(0.3).hexString(),
  weight: 300,
  size: 13,
  italic: false,
  align: 'center'
};
exports.default = (0, _radium2.default)(EmptyLabel);
//# sourceMappingURL=EmptyLabel.js.map