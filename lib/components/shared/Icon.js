'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _util = require('../util');

var _IconImage = require('./IconImage');

var _IconImage2 = _interopRequireDefault(_IconImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OFFSET = {
  menu: { x: 3, y: 6 },
  refresh: { x: 4, y: 4 }
};

/**
 * Represents a standard sized icon.
 */

var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Icon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Icon.__proto__ || Object.getPrototypeOf(Icon)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
      var handler = _this.props.onClick;
      if (_ramda2.default.is(Function, handler)) {
        handler(e);
      }
    }, _this.handleMouseDown = function () {
      _this.setState({ isDown: true });
    }, _this.handleMouseUp = function () {
      _this.setState({ isDown: false });
    }, _this.handleMouseLeave = function () {
      _this.setState({ isDown: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Icon, [{
    key: 'styles',
    value: function styles() {
      var iconOffset = OFFSET[this.props.name] || {};
      var clickOffset = {};
      if (this.state.isDown) {
        clickOffset = this.props.clickOffset || 0;
      }
      var base = {
        textAlign: 'left',
        boxSizing: 'border-box',
        width: 24,
        height: 24,
        paddingLeft: (iconOffset.x || 0) + (clickOffset.x || 0),
        paddingTop: (iconOffset.y || 0) + (clickOffset.y || 0),
        cursor: this.props.cursor
      };

      // An 'absolute' position may have been passed in (optional).
      if (this.props.absolute) {
        base.Absolute = this.props.absolute;
      } else {
        base.position = 'relative';
        base.display = 'inline-block';
      }
      return (0, _util.css)({ base: base });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var opacity = this.props.opacity;


      return _react2.default.createElement(
        'div',
        {
          style: styles.base,
          onClick: this.handleClick,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onMouseLeave: this.handleMouseLeave },
        _react2.default.createElement(_IconImage2.default, { name: this.props.name, opacity: opacity })
      );
    }
  }]);

  return Icon;
}(_react2.default.Component);

Icon.propTypes = {
  name: _IconImage2.default.propTypes.name,
  onClick: _util.PropTypes.func,
  opacity: _util.PropTypes.number,
  absolute: _util.PropTypes.string,
  cursor: _util.PropTypes.string,
  clickOffset: _util.PropTypes.shape({
    x: _util.PropTypes.number,
    y: _util.PropTypes.number
  })
};
Icon.defaultProps = {
  opacity: 1,
  cursor: 'default'
};
exports.default = (0, _radium2.default)(Icon);
//# sourceMappingURL=Icon.js.map