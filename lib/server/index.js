'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Flag indicating that the application is running within
 * the context of the UIHarness.
 */
global.__UIHARNESS__ = false; // False until the UIHarness environment is started.


// Server API.
exports.default = { start: _start2.default, build: _build2.default };
//# sourceMappingURL=index.js.map