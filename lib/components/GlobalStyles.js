'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FONT_MONO = exports.FONT_SANS = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FONT_SANS = exports.FONT_SANS = '"Helvetica Neue", sans-serif';
var FONT_MONO = exports.FONT_MONO = 'Menlo, monospace';

/**
 * Common CSS styles.
 */
var GlobalStyles = function GlobalStyles() {
  var rules = {
    code: {
      color: '#c7254e',
      padding: '2px 4px',
      fontSize: '80%',
      fontWeight: 'normal',
      fontFamily: FONT_MONO,
      background: 'rgba(0, 0, 0, 0.02)',
      border: 'solid 1px rgba(0, 0, 0, 0.04)',
      borderRadius: 4
    },
    pre: {
      background: 'rgba(0, 0, 0, 0.02)',
      border: 'solid 1px rgba(0, 0, 0, 0.04)',
      borderRadius: 4,
      margin: 25,
      padding: 15,
      paddingTop: 10,
      lineHeight: '1.2em',
      fontSize: 14
    },
    'pre code': {
      background: 'none',
      border: 'none'
    },
    hr: {
      borderTop: 'solid 1px rgba(0, 0, 0, 0.2)',
      borderBottom: 0
    },

    '.uih-markdown': {
      fontFamily: FONT_SANS,
      lineHeight: '1.8em'
    },

    '.uih-dark': {
      color: 'white'
    },
    '.uih-dark hr': {
      borderColor: 'rgba(255, 255, 255, 0.6)'
    },
    '.uih-dark code': {
      color: 'white',
      background: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(255, 255, 255, 0.2)'
    }
  };

  return _react2.default.createElement(_radium.Style, { rules: rules, scopeSelector: '.uih' });
};

exports.default = GlobalStyles;
//# sourceMappingURL=GlobalStyles.js.map