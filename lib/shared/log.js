'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint no-use-before-define:0 no-console:0 */

var log = function log(items, method) {
  if (!api.silent) {
    console[method](items.join(' '));
  }
};

/**
 * Stub log shim.
 * Pipe these log items into a proper service log.
 */
var api = {
  silent: false,
  info: function info() {
    for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    log(items, 'info');
  },
  warn: function warn() {
    for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      items[_key2] = arguments[_key2];
    }

    log(items, 'warn');
  },
  error: function error() {
    for (var _len3 = arguments.length, items = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      items[_key3] = arguments[_key3];
    }

    log(items, 'error');
  }
};

exports.default = api;
//# sourceMappingURL=log.js.map