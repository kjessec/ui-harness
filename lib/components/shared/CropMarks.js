'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _util = require('../util');

var _CropMark = require('./CropMark');

var _CropMark2 = _interopRequireDefault(_CropMark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Positions a set of crop-marks around it's contents.
 */
var CropMarks = function (_React$Component) {
  _inherits(CropMarks, _React$Component);

  function CropMarks() {
    _classCallCheck(this, CropMarks);

    return _possibleConstructorReturn(this, (CropMarks.__proto__ || Object.getPrototypeOf(CropMarks)).apply(this, arguments));
  }

  _createClass(CropMarks, [{
    key: 'styles',
    value: function styles() {
      var _props = this.props,
          width = _props.width,
          height = _props.height;

      return (0, _util.css)({
        base: {
          position: 'relative',
          display: this.props.display,
          width: width,
          height: height
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var props = this.props;
      return _react2.default.createElement(
        'div',
        { style: styles.base },
        this.props.children,
        _react2.default.createElement(_CropMark2.default, _extends({}, props, { edge: 'topLeft' })),
        _react2.default.createElement(_CropMark2.default, _extends({}, props, { edge: 'topRight' })),
        _react2.default.createElement(_CropMark2.default, _extends({}, props, { edge: 'bottomLeft' })),
        _react2.default.createElement(_CropMark2.default, _extends({}, props, { edge: 'bottomRight' }))
      );
    }
  }]);

  return CropMarks;
}(_react2.default.Component);

CropMarks.propTypes = _ramda2.default.merge(_ramda2.default.clone(_CropMark2.default.propTypes), {
  display: _util.PropTypes.oneOf(['block', 'inline-block', 'inline']),
  width: _util.PropTypes.numberOrString,
  height: _util.PropTypes.numberOrString
});
CropMarks.defaultProps = _ramda2.default.merge(_ramda2.default.clone(_CropMark2.default.defaultProps), {
  display: 'block',
  width: 'auto',
  height: 'auto'
});
exports.default = (0, _radium2.default)(CropMarks);
//# sourceMappingURL=CropMarks.js.map