'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _localStorage2 = require('js-util/lib/local-storage');

var _localStorage3 = _interopRequireDefault(_localStorage2);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _apiConsole = require('./api-console');

var _apiConsole2 = _interopRequireDefault(_apiConsole);

var _bdd = require('./bdd');

var _bdd2 = _interopRequireDefault(_bdd);

var _GettingStarted = require('../components/docs/GettingStarted');

var _GettingStarted2 = _interopRequireDefault(_GettingStarted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LOG_LIST = Symbol('log-list');
var COMPONENT = Symbol('component');

/**
 * The API used internally by the UIHarness components.
 */

var Api = function () {
  function Api() {
    _classCallCheck(this, Api);

    this.current = _immutable2.default.Map();
    this[LOG_LIST] = _immutable2.default.List();
    this.loadInvokeCount = 0;
  }

  /**
   * Initializes the UIHarness environment.
   * @return {Promise}.
   */


  _createClass(Api, [{
    key: 'init',
    value: function init() {
      var _this = this;

      return new _bluebird2.default(function (resolve) {
        // Put state into global namespace.
        _bdd2.default.register();
        global.UIHarness = global.uih = _apiConsole2.default;

        // Ensure the last loaded suite is set as the current state.
        var suite = _this.lastSelectedSuite();
        if (suite) {
          _this.loadSuite(_this.lastSelectedSuite(), { storeAsLastSuite: false });
        }

        // Show 'getting started' if empty.
        if (Object.keys(_bdd2.default.suites).length === 0) {
          _this.setCurrent({
            header: '## Getting Started',
            hr: true,
            scroll: 'y',
            width: '100%'
          });
          _this.loadComponent(_GettingStarted2.default);
        }

        // Done.
        resolve({});
      });
    }

    /**
     * Resets the internal API.
     * @param {boolean} hard: Flag indicating if all state from local-storage
     *                        should be cleared away, or just current selection state.
     */

  }, {
    key: 'reset',
    value: function reset() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$hard = _ref.hard,
          hard = _ref$hard === undefined ? true : _ref$hard;

      if (hard) {
        this.clearLocalStorage();
      } else {
        this.clearLocalStorage('lastInvokedSpec:');
      }
      this.lastSelectedSuite(null);
      this.setCurrent(null);
      this.component(null);
      return this;
    }

    /**
     * Removes all ui-harness values stored in local-storage.
     */

  }, {
    key: 'clearLocalStorage',
    value: function clearLocalStorage() {
      var startsWith = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _localStorage3.default.keys().forEach(function (key) {
        var match = 'ui-harness:';
        if (startsWith) {
          match += startsWith;
        }
        if (key.startsWith(match)) {
          _localStorage3.default.prop(key, null); // Remove.
        }
      });
    }

    /**
     * Gets or sets the current component instance.
     * Pass {null} to clear.
     */

  }, {
    key: 'component',
    value: function component(value) {
      // WRITE.
      if (value !== undefined) {
        if (value === null) {
          // Unload component.
          delete this[COMPONENT];
          delete _apiConsole2.default.component;
          this.setCurrent({
            componentType: undefined,
            componentProps: undefined,
            componentChildren: undefined,
            component: undefined
          });
        } else {
          // Store component instance.
          this[COMPONENT] = value;
          _apiConsole2.default.component = value;
          if (this.current.get('component') !== value) {
            // NB: Perform instance comparison before updating the
            //     current state to prevent render loop.
            this.setCurrent({ component: value });
          }
        }
      }

      // READ.
      return this[COMPONENT];
    }

    /**
     * Loads the current suite into the Harness.
     *
     * @param suite: The {Suite} to load.
     * @param options
     *          - storeAsLastSuite: Flag indicating if the suite should be stored
     *                              as the last invoked suite in localStorage.
     *                              Default: true.
     */

  }, {
    key: 'loadSuite',
    value: function loadSuite(suite) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$storeAsLastSuit = _ref2.storeAsLastSuite,
          storeAsLastSuite = _ref2$storeAsLastSuit === undefined ? true : _ref2$storeAsLastSuit;

      // Setup initial conditions.
      if (!suite) {
        return this;
      }
      if (this.current.get('suite') === suite) {
        return this;
      }

      // Only load the suite if it does not have children
      // ie. is not a container/folder suite.
      if (suite.childSuites.length === 0) {
        // Clear the current state.
        this.setCurrent(null);

        // Prepare the new current state.
        var current = suite.meta.thisContext.toValues();
        current.suite = suite;
        current.indexMode = this.indexMode();
        current.isBeforeInvoked = false;
        this.setCurrent(current);
        if (storeAsLastSuite) {
          this.lastSelectedSuite(suite);
        }

        // Invoke before handlers.
        this.invokeBeforeHandlers(suite);

        // If the last invoked spec on the suite contained a load.
        var lastInvokedSpec = this.lastInvokedSpec(suite);
        if (lastInvokedSpec && lastInvokedSpec.spec && lastInvokedSpec.isLoader) {
          this.invokeSpec(lastInvokedSpec.spec);
        }
      }

      // Finish up.
      return this;
    }

    /**
     * Loads the given component.
     *
     * @param component:  The component Type
     *                    or created component element (eg: <MyComponent/>).
     *
     * @param props:      Optional. The component props (if not passed in with
     *                    a component element).
     *
     * @param children:   Optional. The component children (if not passed in
     *                    with a component element).
     *
     */

  }, {
    key: 'loadComponent',
    value: function loadComponent(component) {
      (0, _invariant2.default)(component, 'Component not specified in this.component().');

      // If a React element was passed pull out its type.
      var updates = {};
      if (_react2.default.isValidElement(component)) {
        updates.componentType = component.type;
      } else {
        updates.componentType = component;
      }

      // Store on the current state.
      this.setCurrent(updates);

      // Finish up.
      this.loadInvokeCount += 1;
      return this;
    }

    /**
     * Invokes the [before] handlers for
     * the given suite if required.
     * @return {boolean}  - true if the handlers were invoked
     *                    - false if they have already been invoked.
     */

  }, {
    key: 'invokeBeforeHandlers',
    value: function invokeBeforeHandlers(suite) {
      if (this.current.get('isBeforeInvoked')) {
        return false;
      }
      var self = suite.meta.thisContext;
      suite.beforeHandlers.invoke(self);
      this.current = this.current.set('isBeforeInvoked', true);
      return true;
    }

    /**
     * Invokes the given spec.
     * @param spec: The [Spec] to invoke.
     * @param callback: Invoked upon completion.
     *                   Immediately if the spec is not asynchronous.
     */

  }, {
    key: 'invokeSpec',
    value: function invokeSpec(spec, callback) {
      // Setup initial conditions.
      var suite = spec.parentSuite;
      var self = suite.meta.thisContext;
      this.invokeBeforeHandlers(suite);
      var loadInvokeCountBefore = this.loadInvokeCount;

      // Invoke the methods.
      spec.invoke(self, callback);

      // Store a reference to last-invoked spec.
      this.lastInvokedSpec(suite, {
        spec: spec,
        isLoader: this.loadInvokeCount > loadInvokeCountBefore
      });

      // Increment the current invoke count for the spec.
      var specInvokeCount = this.current.get('specInvokeCount') || {};
      var total = specInvokeCount[spec.id] || 0;
      specInvokeCount[spec.id] = total + 1;
      this.setCurrent({ specInvokeCount: specInvokeCount });

      // Finish up.
      return this;
    }

    /**
     * Gets or sets the last selected [Suite].
     */

  }, {
    key: 'lastSelectedSuite',
    value: function lastSelectedSuite(suite) {
      if (suite) {
        suite = suite.id;
      }
      var result = this.localStorage('lastSelectedSuite', suite);
      return _bdd2.default.suites[result];
    }

    /**
     * Gets or sets the last spec for the given suite
     * that was invoked that had a `.load()` call within it.
     */

  }, {
    key: 'lastInvokedSpec',
    value: function lastInvokedSpec(suite) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          spec = _ref3.spec,
          _ref3$isLoader = _ref3.isLoader,
          isLoader = _ref3$isLoader === undefined ? false : _ref3$isLoader;

      var KEY = 'lastInvokedSpec:' + suite.id;
      var value = void 0;
      if (spec !== undefined) {
        // WRITE.
        value = { isLoader: isLoader, spec: spec.id };
        spec = spec.id;
      }

      // READ.
      var result = this.localStorage(KEY, value);
      if (result) {
        result.spec = _ramda2.default.find(function (s) {
          return s.id === result.spec;
        }, suite.specs);
      }
      return result;
    }

    /**
     * Gets or sets the display mode of the left-hand index.
     * @param {string} mode: tree|suite
     */

  }, {
    key: 'indexMode',
    value: function indexMode(mode) {
      var result = this.localStorage('indexMode', mode, { default: 'tree' });
      if (mode !== undefined) {
        // WRITE (store in current state).
        this.setCurrent({ indexMode: mode });
      }

      // READ.
      result = result || 'tree';
      if (result !== 'tree' && this.current.get('suite') === undefined) {
        result = 'tree';
      }
      return result;
    }

    /**
     * Updates the current state with the given values.
     *     NOTE: These values are cumulatively added to the state.
     *           Use 'reset' to clear the state.
     *
     * @param args:  An object containing they [key:values] to set
     *               or null to clear values.
     */

  }, {
    key: 'setCurrent',
    value: function setCurrent(args) {
      var _this2 = this;

      // Update the state object.
      if (args) {
        Object.keys(args).forEach(function (key) {
          var value = args[key];
          _this2.current = value === undefined ? _this2.current.remove(key) : _this2.current.set(key, args[key]);
        });
      } else {
        this.current = this.current.clear();
      }

      // Apply to the <Shell>.
      if (this.shell) {
        this.shell.setState({ current: this.current });
      }
      return this;
    }

    /**
     * Logs a value to the output.
     * @param {array} values: The value or values to append.
     */

  }, {
    key: 'log',
    value: function log() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      values = _ramda2.default.flatten(values);
      var item = { time: new Date(), values: values };
      this[LOG_LIST] = this[LOG_LIST].push(item);
      this.setCurrent({ log: this[LOG_LIST], showLog: true });
      return this;
    }

    /**
     * Clears the output log.
     */

  }, {
    key: 'clearLog',
    value: function clearLog() {
      // console.log('clear log');
      this[LOG_LIST] = this[LOG_LIST].clear();
      this.setCurrent({ log: this[LOG_LIST], showLog: false });
    }

    /**
     * Provides common access to localStorage.
     *
     * @param key:          The unique identifier of the value (this is
     *                      prefixed with the namespace).
     *
     * @param value:        (optional). The value to set (pass null to remove).
     *
     * @param options:
     *           default:   (optional). The default value to return if the session
     *                      does not contain the value (ie. undefined).
     *
     * @return the read value.
     */

  }, {
    key: 'localStorage',
    value: function localStorage(key, value, options) {
      return _localStorage3.default.prop('ui-harness:' + key, value, options);
    }
  }]);

  return Api;
}();

// Singleton instance.


exports.default = new Api();
//# sourceMappingURL=api-internal.js.map