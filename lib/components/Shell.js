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

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _IndexColumn = require('./IndexColumn');

var _IndexColumn2 = _interopRequireDefault(_IndexColumn);

var _util = require('./util');

var _GlobalStyles = require('./GlobalStyles');

var _GlobalStyles2 = _interopRequireDefault(_GlobalStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COLUMN_MARGIN = 6;

/*
The root shell of the UIHarness.
*/

var UIHarness = function (_React$Component) {
  _inherits(UIHarness, _React$Component);

  function UIHarness(props) {
    _classCallCheck(this, UIHarness);

    var _this = _possibleConstructorReturn(this, (UIHarness.__proto__ || Object.getPrototypeOf(UIHarness)).call(this, props));

    _this.state = {
      current: props.current || _immutable2.default.Map(),
      leftWidth: 250,
      rightWidth: 12
    };
    return _this;
  }

  _createClass(UIHarness, [{
    key: 'styles',
    value: function styles() {
      var _state = this.state,
          leftWidth = _state.leftWidth,
          rightWidth = _state.rightWidth;

      return (0, _util.css)({
        base: {
          Absolute: 0,
          background: '#F5F5F5',
          boxSizing: 'border-box'
        },
        column: {
          position: 'relative',
          marginTop: COLUMN_MARGIN,
          marginBottom: COLUMN_MARGIN
        },
        left: {
          Absolute: [COLUMN_MARGIN, null, COLUMN_MARGIN, 0],
          width: leftWidth
        },
        main: {
          Absolute: [COLUMN_MARGIN, rightWidth, COLUMN_MARGIN, leftWidth]
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var _state2 = this.state,
          current = _state2.current,
          leftWidth = _state2.leftWidth;

      return _react2.default.createElement(
        'div',
        { style: styles.base },
        _react2.default.createElement(_GlobalStyles2.default, null),
        _react2.default.createElement(
          'div',
          { style: [styles.column, styles.left] },
          _react2.default.createElement(_IndexColumn2.default, { current: current, width: leftWidth })
        ),
        _react2.default.createElement(
          'div',
          { style: [styles.column, styles.main] },
          _react2.default.createElement(_Main2.default, { current: current })
        )
      );
    }
  }]);

  return UIHarness;
}(_react2.default.Component);

UIHarness.propTypes = {
  current: _util.PropTypes.object
};
UIHarness.defaultProps = {};
exports.default = (0, _radium2.default)(UIHarness);
//# sourceMappingURL=Shell.js.map