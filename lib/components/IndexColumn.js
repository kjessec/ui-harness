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

var _util = require('./util');

var _apiInternal = require('../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _SuiteTree = require('./SuiteTree');

var _SuiteTree2 = _interopRequireDefault(_SuiteTree);

var _Suite = require('./Suite');

var _Suite2 = _interopRequireDefault(_Suite);

var _GlobalStyles = require('./GlobalStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The index column.
 */
var IndexColumn = function (_React$Component) {
  _inherits(IndexColumn, _React$Component);

  function IndexColumn() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IndexColumn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IndexColumn.__proto__ || Object.getPrototypeOf(IndexColumn)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseEnter = function () {
      _this.isOver = true;
    }, _this.handleMouseLeave = function () {
      _this.isOver = false;
    }, _this.handleKeyDown = function (e) {
      if (_this.isOver) {
        // Alert child components of the key-event.
        switch (_apiInternal2.default.indexMode()) {
          case 'tree':
            _this.refs.suiteTree.handleKeyDown(e);
            break;

          case 'suite':
            _this.refs.suite.handleKeyDown(e);
            break;

          default: // Ignore.
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IndexColumn, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'styles',
    value: function styles() {
      var width = this.props.width;

      var indexMode = _apiInternal2.default.indexMode();
      var suiteTreeLeft = void 0;
      var suiteLeft = void 0;

      // Calculate slide position of panels.
      if (indexMode && width) {
        suiteTreeLeft = indexMode === 'tree' ? 0 : 0 - width;
        suiteLeft = indexMode === 'suite' ? 0 : width;
      }

      return (0, _util.css)({
        base: {
          Absolute: 0,
          overflow: 'hidden',
          fontFamily: _GlobalStyles.FONT_SANS,
          userSelect: 'none'
        },
        outer: {
          transition: 'transform 0.15s'
        },
        suiteTree: {
          position: 'absolute', top: 4, bottom: 0, left: 0,
          width: '100%',
          transform: 'translateX(' + suiteTreeLeft + 'px)'
        },
        specs: {
          position: 'absolute', top: 0, bottom: 0, left: 0,
          width: '100%',
          transform: 'translateX(' + suiteLeft + 'px)'
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var _props = this.props,
          current = _props.current,
          width = _props.width;

      var currentSuite = current.get('suite');
      var indexMode = _apiInternal2.default.indexMode();

      var elSuite = void 0;
      if (currentSuite && indexMode === 'suite') {
        elSuite = _react2.default.createElement(_Suite2.default, { ref: 'suite', suite: currentSuite, current: current });
      }

      return _react2.default.createElement(
        'div',
        {
          style: styles.base,
          className: 'uih',
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave },
        _react2.default.createElement(
          'div',
          { style: [styles.outer, styles.suiteTree] },
          _react2.default.createElement(_SuiteTree2.default, { ref: 'suiteTree', selectedSuite: currentSuite, width: width })
        ),
        _react2.default.createElement(
          'div',
          { style: [styles.outer, styles.specs] },
          elSuite
        )
      );
    }
  }]);

  return IndexColumn;
}(_react2.default.Component);

IndexColumn.propTypes = {
  current: _util.PropTypes.instanceOf(_immutable2.default.Map).isRequired,
  width: _react2.default.PropTypes.number.isRequired
};
IndexColumn.defaultProps = {};
exports.default = (0, _radium2.default)(IndexColumn);
//# sourceMappingURL=IndexColumn.js.map