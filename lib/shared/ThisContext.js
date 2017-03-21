'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsUtil = require('js-util');

var util = _interopRequireWildcard(_jsUtil);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _AlignmentContainer = require('react-atoms/components/AlignmentContainer');

var _AlignmentContainer2 = _interopRequireDefault(_AlignmentContainer);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _reactSchema = require('react-schema');

var _apiInternal = require('./api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var formatColorNumber = function formatColorNumber(value) {
  if (_ramda2.default.is(Number, value)) {
    value = _ramda2.default.clamp(0, 1, value);
  }
  return value;
};

var PROP = Symbol('Prop');
var PROPS = {
  children: {
    key: 'componentChildren' },
  childContextTypes: {
    key: 'componentChildContextTypes',
    type: _reactSchema.PropTypes.object
  },
  width: {
    default: 'auto',
    type: _reactSchema.PropTypes.numberOrString,
    resetOn: null
  },
  height: {
    default: 'auto',
    type: _reactSchema.PropTypes.numberOrString,
    resetOn: null
  },
  cropMarks: {
    default: true,
    type: _reactSchema.PropTypes.bool
  },
  'cropMarks.size': {
    default: 25,
    type: _reactSchema.PropTypes.number
  },
  'cropMarks.offset': {
    default: 5,
    type: _reactSchema.PropTypes.number
  },
  margin: {
    default: 60,
    type: _reactSchema.PropTypes.number
  },
  align: {
    default: 'center top',
    type: _AlignmentContainer2.default.propTypes.align
  },
  header: {
    type: _reactSchema.PropTypes.string
  },
  footer: {
    type: _reactSchema.PropTypes.string
  },
  hr: {
    default: true,
    type: _reactSchema.PropTypes.bool
  },
  backdrop: {
    default: 0,
    type: _reactSchema.PropTypes.numberOrString,
    format: formatColorNumber
  },
  background: {
    type: _reactSchema.PropTypes.numberOrString,
    format: formatColorNumber
  },
  scroll: {
    default: false,
    type: _reactSchema.PropTypes.oneOf([true, false, 'x', 'y', 'x:y'])
  },
  style: {
    type: _reactSchema.PropTypes.object
  },
  tools: {
    type: _reactSchema.PropTypes.element
  }
};

var getPropParent = function getPropParent(ns, obj) {
  return ns.length === 0 ? obj : getPropParent(_ramda2.default.takeLast(ns.length - 1, ns), obj[ns[0]]);
};

/**
 * The [this] context that is passed into the [describe/it]
 * BDD methods.
 */

var UIHContext = function () {
  function UIHContext() {
    var _this = this;

    _classCallCheck(this, UIHContext);

    this.page = (0, _page2.default)(this);

    // Determine whether this is the currently loaded suite.
    var isCurrent = function isCurrent() {
      var currentSuite = _apiInternal2.default.current.get('suite');
      return currentSuite && currentSuite.id === _this.suite.id;
    };

    // Read|Write helper for data-property methods.
    this[PROP] = function (key, value, options) {
      options = options || PROPS[key] || {};
      key = options.key || key; // The property options may provide an alternative
      // key to store as on the {current} map.

      // WRITE.
      if (value !== undefined) {
        // Format the value if a formatter function was provided.
        if (_ramda2.default.is(Function, options.format)) {
          value = options.format(value);
        }

        // Reset the value if required.
        if (options.resetOn !== undefined && value === options.resetOn) {
          value = options.default;
        }

        // Store the value.
        _this[PROP].state[key] = value;
        if (isCurrent()) {
          _apiInternal2.default.setCurrent(_this[PROP].state); // Update the state after every update
        }
        return _this; // When writing the [this] context is returned.
        // This allows for chaining of write operations.
      }
      // READ.
      var result = _this[PROP].state[key];
      if (result === undefined) {
        result = options.default;
      }
      return result;
    };
    this[PROP].state = {};

    // Create property functions.
    Object.keys(PROPS).forEach(function (key) {
      if (_this[key]) {
        throw new Error('Property named \'' + key + '\' already exists.');
      }

      // Ensure nested property extensions are added to the hierarchy.
      // ie. functions as properites of parent functions, for example:
      //     - cropMarks
      //     - cropMarks.size
      var parts = key.split('.');
      var ns = _ramda2.default.take(parts.length - 1, parts);
      var propName = _ramda2.default.takeLast(1, parts).join('.');
      var parent = getPropParent(ns, _this);

      // Store the propery.
      parent[propName] = function (value) {
        return _this[PROP](key, value);
      };
    });

    // Property extension methods.
    this.log.clear = function () {
      return _apiInternal2.default.clearLog();
    };
  }

  /*
  API for manipulating the containing page.
  */


  _createClass(UIHContext, [{
    key: 'toValues',


    /**
     * Converts to an object of all current values.
     */
    value: function toValues() {
      var _this2 = this;

      var result = {};
      Object.keys(PROPS).forEach(function (key) {
        var propFunc = util.ns(_this2, key);
        if (_ramda2.default.is(Function, propFunc)) {
          result[key] = propFunc.call(_this2);
        } else {
          result[key] = _this2[PROP].state[key];
        }
      });
      return result;
    }

    /**
     * Resets the UI Harness.
     */

  }, {
    key: 'reset',
    value: function reset(options) {
      _apiInternal2.default.reset(options);
    }

    /**
     * Cumulatively sets property values on the current component.
     * @param {object} value:  An object containing {prop:value} to add
     */

  }, {
    key: 'props',
    value: function props(value) {
      var val = value;
      // WRITE.
      if (_ramda2.default.is(Object, val)) {
        // Cumulatively add given props to the existing
        // props on the component.
        var props = this[PROP]('componentProps');
        // No need to clone when using R.merge
        val = _ramda2.default.merge(props, val);
      }
      // READ.
      return this[PROP]('componentProps', val);
    }

    /**
     * Cumulatively sets context values on the current component.
     * @param {object} value:  An object containing {context: value} to add
     */

  }, {
    key: 'context',
    value: function context(value) {
      var currentContextTypes = this[PROP]('componentChildContextTypes');

      (0, _invariant2.default)(
      // If we're setting the value to nothing, it doesn't need to have a context type
      currentContextTypes || !value, 'Make sure you set `this.contextTypes` before trying to set `this.context`.');

      if (_ramda2.default.is(Object, value)) {
        // Cumulatively add given props to the existing context
        var context = this[PROP]('componentContext') || {};
        _ramda2.default.map(function (key) {
          return (0, _invariant2.default)(currentContextTypes[key], 'Context key ' + key + ' not specified in contextTypes. Add to context types using this.contextTypes' // eslint-disable-line max-len
          );
        }, _ramda2.default.keys(value));
        value = _ramda2.default.merge(context, value);
      }

      return this[PROP]('componentContext', // Set the component's context to the value passed
      value, // and make sure it conforms to the context types
      { type: _reactSchema.PropTypes.object });
    }

    /**
     * OBSOLETE: Stub for the `component` method, emitting a warning that it will
     * be deprecated in a future version.
     */

  }, {
    key: 'load',
    value: function load(component) {
      _log2.default.warn('The `load` method is deprecated. Please use the `this.component` method.');
      return this.component(component);
    }

    /**
     * Loads the given component.
     *
     * @param component:  The component Type (e.g. MyComponent)
     *                    or created component element (e.g.: <MyComponent/>).
     */

  }, {
    key: 'component',
    value: function component(_component) {
      (0, _invariant2.default)(_component, 'Cannot load: a component was not specified (undefined/null)');

      // Create a props object of any props set by this.props with props
      // passed down by JSX.
      var props = _ramda2.default.merge(this[PROP]('componentProps'), // Existing props from this.props()
      _ramda2.default.omit('children', _component.props) // Don't include props.children in
      // props plucked from JSX
      );

      // Update the props in internal state.
      this[PROP]('componentProps', props);

      // Find the children of the passed JSX component (if any).
      var children = _ramda2.default.path(['props', 'children'], _component);

      // Update internal state with these children.
      if (children) this[PROP]('componentChildren', children);

      // Load the component in the window.
      _apiInternal2.default.loadComponent(_component);

      // Update the window state with internal state
      _apiInternal2.default.setCurrent(this[PROP].state);
      return this;
    }

    /**
     * Unloads the currently loaded component.
     */

  }, {
    key: 'unload',
    value: function unload() {
      _apiInternal2.default.component(null);
      return this;
    }

    /**
     * Logs a value to the output.
     * @param {array} value: The value or values to append.
     */

  }, {
    key: 'log',
    value: function log() {
      for (var _len = arguments.length, value = Array(_len), _key = 0; _key < _len; _key++) {
        value[_key] = arguments[_key];
      }

      _apiInternal2.default.log(value);
      return this;
    }
  }]);

  return UIHContext;
}();

exports.default = UIHContext;
//# sourceMappingURL=ThisContext.js.map