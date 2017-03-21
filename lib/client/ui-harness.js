'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _apiInternal = require('../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _bdd = require('../shared/bdd');

var _bdd2 = _interopRequireDefault(_bdd);

var _Shell = require('../components/Shell');

var _Shell2 = _interopRequireDefault(_Shell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Ensure the 'describe/it' statements are in the global namespace.
_bdd2.default.register();

// Render the <Shell> into the DOM.
/**
 * Main entry point for the UIHarness in the browser.
 */

var render = function render() {
  _apiInternal2.default.shell = _reactDom2.default.render(_react2.default.createElement(_Shell2.default, { current: _apiInternal2.default.current }), document.getElementById('page-root'));
};

// Initialize the UIHarness.
var init = function init() {
  return _apiInternal2.default.init().then(render);
};

// Wait for all scripts to load before initializing.
window.addEventListener('load', init);
//# sourceMappingURL=ui-harness.js.map