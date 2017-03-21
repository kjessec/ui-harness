'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_BROWSER = typeof window !== 'undefined';
if (IS_BROWSER) {
  require('./css-loader.css');
}

var CssSample = function CssSample() {
  return _react2.default.createElement(
    'div',
    { className: 'css-loader-sample' },
    _react2.default.createElement(
      'p',
      null,
      (0, _util.lorem)(50)
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
  );
};

describe('css-loader', function () {
  var _this = this;

  this.header('## Webpack simple CSS loader.');
  before(function () {
    _this.component(_react2.default.createElement(CssSample, null));
  });
});
//# sourceMappingURL=css-loader.spec.js.map