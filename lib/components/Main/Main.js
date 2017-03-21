'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _util = require('../util');

var _shared = require('../shared');

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _ComponentHost = require('./ComponentHost');

var _ComponentHost2 = _interopRequireDefault(_ComponentHost);

var _OutputLog = require('../OutputLog');

var _OutputLog2 = _interopRequireDefault(_OutputLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len:0 */

/**
 * The Main (center) pane that hosts the component.
 */
var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main() {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
  }

  _createClass(Main, [{
    key: 'backgroundColor',
    value: function backgroundColor() {
      var color = this.props.current.get('backdrop') || '#fff';
      color = (0, _util.numberToGreyscale)(color);
      return color;
    }
  }, {
    key: 'styles',
    value: function styles(isDark) {
      var HR_COLOR = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)';

      return (0, _util.css)({
        base: {
          Absolute: 0,
          overflow: 'hidden',
          backgroundColor: this.backgroundColor()
        },
        footerHr: {
          borderTop: 'solid 8px ' + HR_COLOR,
          borderBottom: 'none',
          margin: '0 20px'
        }
      });
    }
  }, {
    key: 'scroll',
    value: function scroll() {
      var current = this.props.current;

      var currentScroll = current.get('scroll');
      var overflowX = currentScroll === true || currentScroll === 'x' || currentScroll === 'x:y' ? 'auto' : 'hidden';
      var overflowY = currentScroll === true || currentScroll === 'y' || currentScroll === 'x:y' ? 'auto' : 'hidden';
      return { scroll: currentScroll, overflowX: overflowX, overflowY: overflowY };
    }
  }, {
    key: 'render',
    value: function render() {
      var current = this.props.current;

      var _scroll = this.scroll(),
          overflowX = _scroll.overflowX,
          overflowY = _scroll.overflowY;

      var isDark = (0, _color2.default)(this.backgroundColor()).dark();
      var styles = this.styles(isDark);

      var elHeader = void 0;
      var elFooter = void 0;
      var elFooterHr = void 0;
      var hr = current.get('hr');

      // Header.
      var header = current.get('header');
      if (header) {
        elHeader = _react2.default.createElement(_Header2.default, {
          markdown: header,
          edge: 'top',
          hr: hr,
          isDark: isDark });
      }

      // Footer.
      var footer = current.get('footer');
      if (footer) {
        elFooterHr = _react2.default.createElement('hr', { style: styles.footerHr });
        elFooter = _react2.default.createElement(_Footer2.default, {
          markdown: footer,
          isDark: isDark,
          flexEdge: { maxHeight: '50%', overflowY: 'auto' } });
      }

      // Main content.
      var el = _react2.default.createElement(_ComponentHost2.default, { current: current });

      // Swap out the main host with the log if required.
      var log = current.get('log');
      el = current.get('showLog') && log ? el = _react2.default.createElement(_OutputLog2.default, { items: log.toJS() }) : el;

      return _react2.default.createElement(
        _shared.Card,
        null,
        _react2.default.createElement(
          'div',
          { style: styles.base },
          _react2.default.createElement(
            _shared.FlexEdge,
            { orientation: 'vertical' },
            elHeader,
            _react2.default.createElement(
              'div',
              { 'data-flexEdge': { flex: 1, overflowX: overflowX, overflowY: overflowY } },
              el
            ),
            elFooterHr,
            elFooter
          )
        )
      );
    }
  }]);

  return Main;
}(_react2.default.Component);

Main.propTypes = {
  current: _util.PropTypes.instanceOf(_immutable2.default.Map).isRequired
};
Main.defaultProps = {};
exports.default = (0, _radium2.default)(Main);
//# sourceMappingURL=Main.js.map