'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe('Page', function () {
  var _this = this;

  this.header('## API for manipulating the containing HTML page.');
  before(function () {
    _this.align('top left').component(_react2.default.createElement(FontSample, null));
  });

  section('insertFont', function () {
    var load = function load(url, fontFamily) {
      _this.page.insertFont('https://fonts.googleapis.com/css?family=' + url).component(_react2.default.createElement(FontSample, { fontFamily: fontFamily }));
    };

    it('`Lato`', function () {
      return load('Lato:900,300', 'Lato');
    });
    it('`Roboto`', function () {
      return load('Roboto:900,300', 'Roboto');
    });
    it('`Josefin Slab`', function () {
      return load('Josefin+Slab:300,700', '"Josefin Slab"');
    });
    it('`Vollkorn`', function () {
      return load('Vollkorn:400,700', 'Vollkorn');
    });
  });

  section('insertScript', function () {
    it('`string:alert`', function () {
      _this.page.insertScript('alert("foo")');
    });

    it('`string:console`', function () {
      _this.page.insertScript('console.info("Written from inserted script!")');
    });

    it('`object:src`', function () {
      _this.page.insertScript({ src: '/sample.js' });
    });
  });
});

/**
 *
 */

var FontSample = function (_React$Component) {
  _inherits(FontSample, _React$Component);

  function FontSample() {
    _classCallCheck(this, FontSample);

    return _possibleConstructorReturn(this, (FontSample.__proto__ || Object.getPrototypeOf(FontSample)).apply(this, arguments));
  }

  _createClass(FontSample, [{
    key: 'render',
    value: function render() {
      var rules = {
        main: {
          fontFamily: this.props.fontFamily
        },
        h1: {
          fontWeight: 900,
          fontSize: 60,
          marginBottom: 0
        },
        p: {
          fontWeight: 300,
          marginBottom: 30,
          fontSize: 22
        }
      };
      return _react2.default.createElement(
        'div',
        { className: 'FontSample' },
        _react2.default.createElement(_radium.Style, { rules: rules, scopeSelector: '.FontSample' }),
        _react2.default.createElement(
          'main',
          null,
          _react2.default.createElement(
            'h1',
            null,
            this.props.fontFamily
          ),
          _react2.default.createElement(
            'p',
            null,
            (0, _util.lorem)(50)
          ),
          _react2.default.createElement(
            'p',
            null,
            (0, _util.lorem)(50)
          )
        )
      );
    }
  }]);

  return FontSample;
}(_react2.default.Component);
//# sourceMappingURL=page.spec.js.map