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

var _shared = require('../shared');

var _Markdown = require('react-atoms/components/Markdown');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var elementStyles = function elementStyles(isDark) {
  var HR_COLOR = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)';

  var firstTitle = {
    border: 'none',
    padding: 0,
    margin: 0
  };
  return (0, _util.css)({
    h1: {
      fontSize: 32,
      lineHeight: '40px',
      padding: 0,
      margin: 0,
      fontWeight: 700
    },
    h2: {
      fontSize: 20,
      lineHeight: '28px',
      padding: 0,
      margin: 0,
      fontWeight: 200,
      borderColor: HR_COLOR,
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      paddingBottom: 8,
      marginBottom: 10,
      marginTop: 30
    },
    'h2:first-of-type': firstTitle,
    h3: {
      fontSize: 18,
      padding: 0,
      margin: 0,
      marginTop: 30
    },
    'h3:first-of-type': firstTitle,
    h4: {
      fontSize: 14,
      textTransform: 'uppercase',
      padding: 0,
      margin: 0,
      marginTop: 30,
      opacity: isDark ? 0.6 : 0.4
    },
    'h5:first-of-type': firstTitle,
    p: {
      fontWeight: 400,
      fontSize: 15,
      lineHeight: '22px',
      marginTop: 0,
      marginBottom: 15
    },
    ul: {
      fontWeight: 200,
      fontSize: 15,
      lineHeight: '22px'
    },
    hr: {
      borderColor: HR_COLOR,
      marginTop: 20,
      marginBottom: 20
    },
    'hr:last-child': {
      marginBottom: 0
    },
    'hr:first-child': {
      marginTop: 0,
      marginBottom: 10,
      borderBottomWidth: 10
    }
  });
};

/**
 * The Header/Footer bar of the [main] component host.
 */

var Marginal = function (_React$Component) {
  _inherits(Marginal, _React$Component);

  function Marginal() {
    _classCallCheck(this, Marginal);

    return _possibleConstructorReturn(this, (Marginal.__proto__ || Object.getPrototypeOf(Marginal)).apply(this, arguments));
  }

  _createClass(Marginal, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          paddingTop: 15,
          paddingBottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
          fontFamily: _GlobalStyles.FONT_SANS,
          color: 'rgba(0, 0, 0, 0.5)'
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var markdown = this.props.markdown;
      var _props = this.props,
          hr = _props.hr,
          isDark = _props.isDark;

      var removeHR = function removeHR() {
        markdown = markdown.replace(/\n\s*-{3,}\n*$/, '');
      };

      // Trim the indent
      // (which may exist if from indented multi-line ES6 template strings).
      var trimmed = (0, _Markdown.trimIndent)(markdown);
      markdown = trimmed.text;

      // Append or remove the <HR> at the end of the markdown
      if (markdown) {
        if (hr === true) {
          removeHR(); // Ensure there is only one <HR>.
          var INDENT = ' '.repeat(trimmed.indent);
          markdown = '' + markdown + INDENT + '\n\n---';
        }
        if (hr === false) {
          removeHR();
        }
      }

      return _react2.default.createElement(
        'div',
        { style: styles.base, className: 'uih' },
        _react2.default.createElement(
          'div',
          { className: 'uih-header uih-markdown ' + (this.props.isDark && 'uih-dark') },
          _react2.default.createElement(_radium.Style, { rules: elementStyles(isDark), scopeSelector: '.uih-header' }),
          _react2.default.createElement(
            _shared.Markdown,
            {
              display: 'block',
              trimIndent: false,
              escapeHtml: false },
            markdown
          )
        )
      );
    }
  }]);

  return Marginal;
}(_react2.default.Component);

Marginal.propTypes = {
  markdown: _util.PropTypes.string,
  hr: _util.PropTypes.bool,
  isDark: _util.PropTypes.bool,
  edge: _util.PropTypes.oneOf(['top', 'bottom'])
};
Marginal.defaultProps = {
  hr: false,
  isDark: false,
  edge: 'top'
};
exports.default = (0, _radium2.default)(Marginal);
//# sourceMappingURL=Header.js.map