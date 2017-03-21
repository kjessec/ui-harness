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

var _OutputLogItem = require('./OutputLogItem');

var _OutputLogItem2 = _interopRequireDefault(_OutputLogItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An output log.
 */
var Output = function (_React$Component) {
  _inherits(Output, _React$Component);

  function Output() {
    _classCallCheck(this, Output);

    return _possibleConstructorReturn(this, (Output.__proto__ || Object.getPrototypeOf(Output)).apply(this, arguments));
  }

  _createClass(Output, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          Absolute: 0,
          overflowY: 'auto',
          paddingLeft: 20,
          paddingRight: 20
        },
        table: {
          width: '100%',
          padding: 0,
          marginTop: 0,
          marginBottom: 0
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var items = this.props.items;

      items = items.reverse();
      items = items.map(function (item, i) {
        return _react2.default.createElement(_OutputLogItem2.default, {
          key: i,
          time: item.time,
          values: item.values });
      });

      return _react2.default.createElement(
        'div',
        { style: styles.base },
        _react2.default.createElement(
          'table',
          { style: styles.table },
          _react2.default.createElement(
            'tbody',
            null,
            items
          )
        )
      );
    }
  }]);

  return Output;
}(_react2.default.Component);

Output.propTypes = {
  items: _util.PropTypes.array
};
Output.defaultProps = {
  items: []
};
exports.default = (0, _radium2.default)(Output);
//# sourceMappingURL=OutputLog.js.map