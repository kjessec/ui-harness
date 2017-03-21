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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A single crop-mark within the <CropMarks>.
 */
var CropMark = function (_React$Component) {
  _inherits(CropMark, _React$Component);

  function CropMark() {
    _classCallCheck(this, CropMark);

    return _possibleConstructorReturn(this, (CropMark.__proto__ || Object.getPrototypeOf(CropMark)).apply(this, arguments));
  }

  _createClass(CropMark, [{
    key: 'styles',
    value: function styles() {
      var SIZE = this.props.size;
      var OFFSET = this.props.offset;
      var BORDER_COLOR = this.props.color;
      var base = void 0;
      var xAxis = void 0;
      var yAxis = void 0;

      switch (this.props.edge) {
        case 'topLeft':
          base = { Absolute: '-' + (SIZE - 1) + ' auto auto -' + (SIZE - 1) };
          xAxis = { Absolute: 'null ' + OFFSET + ' 0 0' };
          yAxis = { Absolute: '0 0 ' + OFFSET + ' auto' };
          break;

        case 'topRight':
          base = { Absolute: '-' + (SIZE - 1) + ' -' + (SIZE - 1) + ' auto auto' };
          xAxis = { Absolute: 'auto 0 0 ' + OFFSET };
          yAxis = { Absolute: '0 auto ' + OFFSET + ' 0' };
          break;

        case 'bottomLeft':
          base = { Absolute: 'auto auto -' + (SIZE - 1) + ' -' + (SIZE - 1) };
          xAxis = { Absolute: '0 ' + OFFSET + ' auto 0' };
          yAxis = { Absolute: OFFSET + ' 0 0 auto' };
          break;

        case 'bottomRight':
          base = { Absolute: 'null -' + (SIZE - 1) + ' -' + (SIZE - 1) + ' auto' };
          xAxis = { Absolute: '0 0 auto ' + OFFSET };
          yAxis = { Absolute: OFFSET + ' auto 0 0' };
          break;

        default: // Ignore.
      }

      base.width = SIZE;
      base.height = SIZE;
      xAxis.borderBottom = 'solid 1px ' + BORDER_COLOR;
      yAxis.borderRight = 'solid 1px ' + BORDER_COLOR;
      return (0, _util.css)({ base: base, xAxis: xAxis, yAxis: yAxis });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var el = null;
      if (this.props.size > 0) {
        el = _react2.default.createElement(
          'div',
          { style: styles.base },
          _react2.default.createElement('div', { style: styles.xAxis }),
          _react2.default.createElement('div', { style: styles.yAxis })
        );
      }
      return el;
    }
  }]);

  return CropMark;
}(_react2.default.Component);

CropMark.propTypes = {
  edge: _util.PropTypes.oneOf(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  length: _util.PropTypes.number,
  offset: _util.PropTypes.number,
  color: _util.PropTypes.string,
  size: _util.PropTypes.number
};
CropMark.defaultProps = {
  size: 20,
  offset: 5,
  color: 'rgba(0, 0, 0, 0.15)'
};
exports.default = (0, _radium2.default)(CropMark);
//# sourceMappingURL=CropMark.js.map