'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_BROWSER = typeof window !== 'undefined';
var css = {};
if (IS_BROWSER) {
  css = require('./css-module.module.css');
  // console.log("css", css);
}

var CssSample = function CssSample() {
  return _react2.default.createElement(
    'div',
    { className: css.sample },
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
  );
};

describe('css-module', function () {
  var _this = this;

  this.header('## Webpack CSS modules.');
  before(function () {
    _this.component(_react2.default.createElement(CssSample, null));
  });
});
//# sourceMappingURL=css-module.spec.js.map