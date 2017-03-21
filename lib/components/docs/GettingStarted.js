'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _Markdown = require('react-atoms/components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var introMarkdown = '\nUIHarness uses familiar `"describe/it"` testing concepts to rapidly\nconstruct test interfaces around your components as you build them.\n\n    // Visual Spec:\n\n    import React from "react";\n    import MyComponent from "../components/MyComponent";\n\n    describe("MyComponent", function() {\n      before(() => {\n        this.load( <MyComponent color="red" /> );\n      });\n\n      it("green", () => this.props({ color: "green" }));\n    });\n\nSee more [documentation here](https://github.com/philcockfield/ui-harness/blob/master/docs/index.md).\n';

/**
 * A "getting started" introduction.
 */

var GettingStarted = function (_React$Component) {
  _inherits(GettingStarted, _React$Component);

  function GettingStarted() {
    _classCallCheck(this, GettingStarted);

    return _possibleConstructorReturn(this, (GettingStarted.__proto__ || Object.getPrototypeOf(GettingStarted)).apply(this, arguments));
  }

  _createClass(GettingStarted, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          paddingTop: 80,
          paddingBottom: 40
        },
        content: {
          maxWidth: 550,
          margin: '0 auto',
          padding: '0 50px'
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      return _react2.default.createElement(
        'div',
        { className: 'uih', style: styles.base },
        _react2.default.createElement(
          'div',
          { className: 'uih-markdown', style: styles.content },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _Markdown2.default,
              null,
              introMarkdown
            )
          )
        )
      );
    }
  }]);

  return GettingStarted;
}(_react2.default.Component);

exports.default = (0, _radium2.default)(GettingStarted);
//# sourceMappingURL=GettingStarted.js.map