'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _util = require('../util');

var _shared = require('../shared');

var _apiInternal = require('../../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A single spec within the index list.
 */
var SpecListItem = function (_React$Component) {
  _inherits(SpecListItem, _React$Component);

  function SpecListItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SpecListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SpecListItem.__proto__ || Object.getPrototypeOf(SpecListItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseEnter = function () {
      _this.setState({ isOver: true });
    }, _this.handleMouseLeave = function () {
      _this.setState({ isOver: false });
    }, _this.handleClick = function () {
      _this.invoke();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SpecListItem, [{
    key: 'invokeCount',
    value: function invokeCount() {
      var _props = this.props,
          spec = _props.spec,
          current = _props.current;

      var specInvokeCount = current ? current.get('specInvokeCount') : {};
      return specInvokeCount ? specInvokeCount[spec.id] || 0 : 0;
    }
  }, {
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          position: 'relative',
          cursor: 'pointer',
          background: this.state.isOver ? 'rgba(0, 0, 0, 0.03)' : 'none'
        },
        name: {
          color: (0, _color2.default)('white').darken(0.5).hexString(),
          fontSize: 14,
          lineHeight: '28px',
          paddingLeft: 28
        },
        bullet: {
          Absolute: '11 null null 13',
          width: 6,
          height: 6,
          background: this.invokeCount() === 0 ? 'rgba(0, 0, 0, 0.22)' : '#4A90E2', // BLUE
          borderRadius: 3
        }
      });
    }
  }, {
    key: 'invoke',
    value: function invoke() {
      _apiInternal2.default.invokeSpec(this.props.spec);
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var spec = this.props.spec;

      return _react2.default.createElement(
        'li',
        {
          style: styles.base,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onClick: this.handleClick },
        _react2.default.createElement('div', { style: styles.bullet }),
        _react2.default.createElement(
          'div',
          { style: styles.name },
          _react2.default.createElement(
            _shared.Ellipsis,
            null,
            _react2.default.createElement(
              _shared.FormattedText,
              null,
              spec.name
            )
          )
        )
      );
    }
  }]);

  return SpecListItem;
}(_react2.default.Component);

SpecListItem.propTypes = {
  spec: _util.PropTypes.object.isRequired,
  current: _util.PropTypes.instanceOf(_immutable2.default.Map).isRequired
};
SpecListItem.defaultProps = {};
exports.default = (0, _radium2.default)(SpecListItem);
//# sourceMappingURL=SpecListItem.js.map