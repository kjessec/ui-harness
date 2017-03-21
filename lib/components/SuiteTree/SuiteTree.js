'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _apiInternal = require('../../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _bdd = require('../../shared/bdd');

var _bdd2 = _interopRequireDefault(_bdd);

var _shared = require('../shared');

var _util = require('../util');

var _SuiteTreeItem = require('./SuiteTreeItem');

var _SuiteTreeItem2 = _interopRequireDefault(_SuiteTreeItem);

var _SuiteTreeEmpty = require('./SuiteTreeEmpty');

var _SuiteTreeEmpty2 = _interopRequireDefault(_SuiteTreeEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The index tree-view of [Suites].
 */
var SuiteTree = function (_React$Component) {
  _inherits(SuiteTree, _React$Component);

  function SuiteTree() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SuiteTree);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SuiteTree.__proto__ || Object.getPrototypeOf(SuiteTree)).call.apply(_ref, [this].concat(args))), _this), _this.handleOverSuite = function (e) {
      _this.mouseOverItem = e;
    }, _this.handleMouseLeave = function () {
      _this.mouseOverItem = null;
    }, _this.handleKeyDown = function (e) {
      var selectedSuite = _this.props.selectedSuite;

      var item = _this.mouseOverItem;
      var suite = item ? item.suite : null;
      if (item) {
        switch (e.which) {
          case 37:
            // LEFT.
            item.toggle(false);
            break;

          case 39:
            // RIGHT.
            if (suite) {
              if (selectedSuite && selectedSuite.id === suite.id) {
                _apiInternal2.default.indexMode('suite'); // Drill into already loaded suite.
              } else {
                _apiInternal2.default.loadSuite(suite); // Load the new suite.
              }
            } else {
              item.toggle(true);
            }
            break;

          default: // Ignore.
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SuiteTree, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          Absolute: 0,
          userSelect: 'none',
          overflow: 'hidden',
          overflowY: 'auto'
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();
      var _props = this.props,
          selectedSuite = _props.selectedSuite,
          width = _props.width;

      // Filter on root suites.

      var suites = _bdd2.default.rootSuites();
      var items = suites.map(function (suite, i) {
        return _react2.default.createElement(_SuiteTreeItem2.default, {
          isRoot: true,
          key: i,
          index: i,
          suite: suite,
          total: suites.length,
          selectedSuite: selectedSuite,
          onOverSuite: _this2.handleOverSuite,
          width: width });
      });

      return _react2.default.createElement(
        'div',
        {
          style: styles.base,
          onMouseLeave: this.handleMouseLeave },
        items.length > 0 ? _react2.default.createElement(
          _shared.Ul,
          null,
          items
        ) : _react2.default.createElement(_SuiteTreeEmpty2.default, null)
      );
    }
  }]);

  return SuiteTree;
}(_react2.default.Component);

SuiteTree.propTypes = {
  selectedSuite: _util.PropTypes.object,
  width: _util.PropTypes.number.isRequired
};
SuiteTree.defaultProps = {};
exports.default = (0, _radium2.default)(SuiteTree);
//# sourceMappingURL=SuiteTree.js.map