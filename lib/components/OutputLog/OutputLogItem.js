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

var _Value = require('./Value');

var _Value2 = _interopRequireDefault(_Value);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A list item within the output log.
 */
var OutputItem = function (_React$Component) {
  _inherits(OutputItem, _React$Component);

  function OutputItem() {
    _classCallCheck(this, OutputItem);

    return _possibleConstructorReturn(this, (OutputItem.__proto__ || Object.getPrototypeOf(OutputItem)).apply(this, arguments));
  }

  _createClass(OutputItem, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {},
        td: {
          borderBottom: 'dashed 1px rgba(0, 0, 0, 0.1)',
          padding: 6
        },
        left: {
          width: 80
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var _props = this.props,
          time = _props.time,
          values = _props.values;

      var valueElements = values.map(function (value, i) {
        return _react2.default.createElement(
          _Value2.default,
          { key: i },
          value
        );
      });

      return _react2.default.createElement(
        'tr',
        { style: styles.base },
        _react2.default.createElement(
          'td',
          { style: [styles.td, styles.left] },
          _react2.default.createElement(
            _Value2.default,
            {
              color: 'grey',
              mono: false,
              size: 11 },
            (0, _moment2.default)(time).format('h:mm:ss:SSSS')
          )
        ),
        _react2.default.createElement(
          'td',
          { style: [styles.td, styles.right] },
          _react2.default.createElement(
            _Value2.default,
            { color: 'red', size: 13 },
            valueElements
          )
        )
      );
    }
  }]);

  return OutputItem;
}(_react2.default.Component);

OutputItem.propTypes = {
  time: _util.PropTypes.instanceOf(Date),
  values: _util.PropTypes.array
};
OutputItem.defaultProps = {
  value: []
};
exports.default = (0, _radium2.default)(OutputItem);
//# sourceMappingURL=OutputLogItem.js.map