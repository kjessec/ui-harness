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

var _apiInternal = require('../../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _Icon = require('../shared/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _shared = require('../shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The header bar for the [Suite] index column.
 */
var SuiteHeader = function (_React$Component) {
  _inherits(SuiteHeader, _React$Component);

  function SuiteHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SuiteHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SuiteHeader.__proto__ || Object.getPrototypeOf(SuiteHeader)).call.apply(_ref, [this].concat(args))), _this), _this.handleMenuClick = function () {
      _apiInternal2.default.indexMode('tree');
    }, _this.handleRefreshClick = function () {
      _apiInternal2.default.setCurrent(null);
      _apiInternal2.default.loadSuite(_this.props.suite);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SuiteHeader, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          position: 'relative',
          height: 32,
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.08)',
          cursor: 'default'
        },
        titleOuter: {
          Absolute: '0 32 null 32',
          textAlign: 'center',
          color: (0, _color2.default)('white').darken(0.4).hexString(),
          textShadow: '0px 1px white',
          fontWeight: 700,
          fontSize: '16px',
          userSelect: 'none'
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var suite = this.props.suite;

      var title = suite.name;

      return _react2.default.createElement(
        'div',
        { style: styles.base },
        _react2.default.createElement(_Icon2.default, {
          name: 'menu',
          absolute: '-2 null null 4',
          onClick: this.handleMenuClick,
          opacity: 0.4,
          cursor: 'pointer',
          clickOffset: { y: 1 } }),
        _react2.default.createElement(
          'div',
          { style: styles.titleOuter },
          _react2.default.createElement(
            _shared.Ellipsis,
            { display: 'block' },
            _react2.default.createElement(
              _shared.FormattedText,
              null,
              title
            )
          )
        ),
        _react2.default.createElement(_Icon2.default, {
          name: 'refresh',
          absolute: '-1 6 null null',
          onClick: this.handleRefreshClick,
          opacity: 0.4,
          cursor: 'pointer',
          clickOffset: { y: 1 } })
      );
    }
  }]);

  return SuiteHeader;
}(_react2.default.Component);

SuiteHeader.propTypes = {
  suite: _util.PropTypes.object.isRequired
};
SuiteHeader.defaultProps = {};
exports.default = (0, _radium2.default)(SuiteHeader);
//# sourceMappingURL=SuiteHeader.js.map