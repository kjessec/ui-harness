'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _jsBdd = require('js-bdd');

var _jsBdd2 = _interopRequireDefault(_jsBdd);

var _jsUtil = require('js-util');

var _ThisContext = require('./ThisContext');

var _ThisContext2 = _interopRequireDefault(_ThisContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ORIGINAL_DSL = {};

exports.default = {
  supportedMethods: ['describe', 'before', 'it', 'section'],
  suites: _jsBdd2.default.allSuites,

  /**
   * Gets the set of [Suites] to show in the index.
   */
  rootSuites: function rootSuites() {
    var getRoot = function getRoot(suite) {
      var parent = suite.parentSuite;
      return parent ? getRoot(parent) : suite;
    };
    var suites = _jsBdd2.default.suites();
    suites = suites.filter(function (suite) {
      return suite.parentSuite === undefined || suite.isOnly;
    });
    suites = suites.map(function (suite) {
      return getRoot(suite);
    });
    suites = (0, _jsUtil.compact)(_ramda2.default.uniq(suites));
    return suites;
  },


  /**
   * Sets up the BDD domain specific language.
   * @param {object} namespace: The target object to register onto (ie. global||window).
   */
  register: function register() {
    // Set the __UIHARNESS__ flag to true so that spec files which share
    // both server unit-tests and client visual-specs can determine what
    // environment they are running within.
    global.__UIHARNESS__ = true;

    // Put the BDD domain-specific language into the global global.
    this.supportedMethods.forEach(function (name) {
      ORIGINAL_DSL[name] = global[name];
      global[name] = _jsBdd2.default[name];
    });

    // Create the special context API that is used as [this]
    // within [describe/it] blocks.
    _jsBdd2.default.contextFactory = function (type) {
      return new _ThisContext2.default(type);
    };
  },


  /**
   * Removes the DSL from the global namespace.
   * @param {object} namespace: The target object to register onto (ie. global||window).
   */
  unregister: function unregister() {
    this.supportedMethods.forEach(function (name) {
      global[name] = ORIGINAL_DSL[name];
    });
  },


  /**
   * Resets the global namespace and the BDD data structure.
   */
  reset: function reset() {
    this.unregister();
    _jsBdd2.default.reset();
  }
};
//# sourceMappingURL=bdd.js.map