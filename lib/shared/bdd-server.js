'use strict';

var _jsBdd = require('js-bdd');

var _jsBdd2 = _interopRequireDefault(_jsBdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Add an `it.server` extension to the BDD/DSL.
 */
if (!_jsBdd2.default.it.server) {
  _jsBdd2.default.extend.it('server', function (spec) {
    spec.isServer = true;
  });
}
//# sourceMappingURL=bdd-server.js.map