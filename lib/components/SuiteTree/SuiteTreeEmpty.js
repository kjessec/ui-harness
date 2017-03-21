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

var _shared = require('../shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The empty message when no Suites have been declared.
 */
var SuiteTreeEmpty = function (_React$Component) {
  _inherits(SuiteTreeEmpty, _React$Component);

  function SuiteTreeEmpty() {
    _classCallCheck(this, SuiteTreeEmpty);

    return _possibleConstructorReturn(this, (SuiteTreeEmpty.__proto__ || Object.getPrototypeOf(SuiteTreeEmpty)).apply(this, arguments));
  }

  _createClass(SuiteTreeEmpty, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          paddingTop: 20,
          textAlign: 'center'
        },
        icon: {
          marginBottom: 12,
          opacity: 0.1
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
        _react2.default.createElement(
          'div',
          { style: styles.icon },
          _react2.default.createElement(_shared.IconImage, { name: 'startStar' })
        ),
        _react2.default.createElement(
          _shared.EmptyLabel,
          null,
          'Add some test suites.'
        )
      );
    }
  }]);

  return SuiteTreeEmpty;
}(_react2.default.Component);

exports.default = (0, _radium2.default)(SuiteTreeEmpty);
//# sourceMappingURL=SuiteTreeEmpty.js.map