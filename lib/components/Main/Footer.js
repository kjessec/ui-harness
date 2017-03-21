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
 * The optional Footer content for the [Main] component host.
 */
var Footer = function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          padding: '0 20px'
        },
        markdownOuter: {
          maxWidth: this.props.maxWidth,
          margin: '0 auto',
          paddingBottom: 40
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      return _react2.default.createElement(
        'div',
        { style: styles.base, className: 'uih' },
        _react2.default.createElement(
          'div',
          { style: styles.markdownOuter },
          _react2.default.createElement(
            _shared.Markdown,
            { className: 'uih-markdown ' + (this.props.isDark && 'uih-dark') },
            this.props.markdown
          )
        )
      );
    }
  }]);

  return Footer;
}(_react2.default.Component);

Footer.propTypes = {
  markdown: _util.PropTypes.string,
  isDark: _util.PropTypes.bool,
  maxWidth: _util.PropTypes.numberOrString
};
Footer.defaultProps = {
  isDark: false,
  maxWidth: 600
};
exports.default = (0, _radium2.default)(Footer);
//# sourceMappingURL=Footer.js.map