'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _util = require('../util');

var _images = require('../../../public/images');

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Icon image (library).
 */
var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'styles',
    value: function styles() {
      var icon = _images2.default[this.props.name];
      var base = {
        Image: [icon['1x'], icon['2x'], icon.width, icon.height],
        opacity: this.props.opacity
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
      return _react2.default.createElement('div', { style: this.styles().base });
    }
  }]);

  return Icon;
}(_react2.default.Component);

Icon.propTypes = {
  name: _util.PropTypes.oneOf(Object.keys(_images2.default)).isRequired,
  absolute: _util.PropTypes.string,
  opacity: _util.PropTypes.number
};
Icon.defaultProps = {
  opacity: 1
};
exports.default = (0, _radium2.default)(Icon);
//# sourceMappingURL=IconImage.js.map