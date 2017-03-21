'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsUtil = require('js-util');

var _apiInternal = require('../../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _ContextWrapper = require('./ContextWrapper');

var _ContextWrapper2 = _interopRequireDefault(_ContextWrapper);

var _CropMarks = require('../shared/CropMarks');

var _CropMarks2 = _interopRequireDefault(_CropMarks);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Style = _radium2.default.Style;

/**
 * Loads and displays a component.
 */

var Component = function (_React$Component) {
  _inherits(Component, _React$Component);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
  }

  _createClass(Component, [{
    key: 'size',
    value: function size() {
      var current = this.props.current;

      var width = current.get('width');
      var height = current.get('height');
      return { width: width, height: height };
    }
  }, {
    key: 'styles',
    value: function styles() {
      var _size = this.size(),
          width = _size.width,
          height = _size.height;

      var current = this.props.current;

      var background = current.get('background');
      var border = current.get('border');

      if (border !== undefined) {
        if (_ramda2.default.is(Number, border)) {
          border = 'solid 1px ' + (0, _util.numberToGreyscale)(border);
        }
      }

      return (0, _util.css)({
        base: {
          position: 'relative',
          width: width,
          height: height,
          backgroundColor: (0, _util.numberToGreyscale)(background)
        }
      });
    }
  }, {
    key: 'handleLoaded',
    value: function handleLoaded(componentInstance) {
      // Store component instance on load.
      if (!_ramda2.default.isNil(componentInstance)) {
        _apiInternal2.default.component(componentInstance);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();
      var current = this.props.current;

      var _size2 = this.size(),
          width = _size2.width,
          height = _size2.height;

      var styleElement = void 0;
      var styleRules = current.get('style');
      if (styleRules) {
        styleElement = _react2.default.createElement(Style, {
          scopeSelector: '.uih-Component',
          rules: styleRules
        });
      }

      var element = void 0;
      var type = current.get('componentType');
      if (type) {
        // Props.
        var props = current.get('componentProps') || {};
        props.ref = function (c) {
          return (0, _jsUtil.delay)(function () {
            return _this2.handleLoaded(c);
          });
        };

        // Children.
        var children = current.get('componentChildren');
        element = _react2.default.createElement(type, props, children);

        var childContextTypes = current.get('componentChildContextTypes');
        if (childContextTypes) _ContextWrapper2.default.childContextTypes = childContextTypes;
      }

      var cropMarksSize = current.get('cropMarks') ? current.get('cropMarks.size') : 0;

      return _react2.default.createElement(
        _CropMarks2.default,
        {
          size: cropMarksSize,
          offset: current.get('cropMarks.offset'),
          display: width === '100%' ? 'block' : 'inline-block',
          width: width,
          height: height },
        _react2.default.createElement(
          'div',
          { className: 'uih-Component', style: styles.base },
          styleElement,
          _react2.default.createElement(
            _ContextWrapper2.default,
            { context: current.get('componentContext') },
            element
          )
        )
      );
    }
  }]);

  return Component;
}(_react2.default.Component);

Component.propTypes = {
  current: _util.PropTypes.instanceOf(_immutable2.default.Map).isRequired
};
Component.defaultProps = {};
exports.default = (0, _radium2.default)(Component);
//# sourceMappingURL=Component.js.map