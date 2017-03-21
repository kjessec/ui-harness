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
 * A wrapper that puts content within a card.
 */
var Card = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  _createClass(Card, [{
    key: 'styles',
    value: function styles() {
      var BACKGROUND_COLOR = (0, _color2.default)('white').darken(this.props.darken);
      return (0, _util.css)({
        base: {
          background: BACKGROUND_COLOR.hexString(),
          Absolute: 0,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.12)',
          borderRadius: 1,
          boxShadow: '0 0 8px 0px rgba(0, 0, 0, 0.1)',
          padding: this.props.padding,
          overflow: 'hidden'
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

  return Card;
}(_react2.default.Component);

Card.propTypes = {
  padding: _util.PropTypes.numberOrString,
  darken: _util.PropTypes.numberOrString,
  children: _util.PropTypes.node
};
Card.defaultProps = {
  padding: 0,
  darken: 0
};
exports.default = (0, _radium2.default)(Card);
//# sourceMappingURL=Card.js.map