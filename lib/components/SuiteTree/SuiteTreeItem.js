'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _jsUtil = require('js-util');

var _color = require('js-util/lib/color');

var _util = require('../util');

var _color2 = require('color');

var _color3 = _interopRequireDefault(_color2);

var _apiInternal = require('../../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _shared = require('../shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEXT_COLOR = (0, _color3.default)('white').darken(0.6).hexString();
var SELECTED_BG_COLOR = (0, _color.fromAlpha)(-0.08);

/**
 * An <LI> that renders a single [Suite] list item.
 */

var SuiteTreeItem = function (_React$Component) {
  _inherits(SuiteTreeItem, _React$Component);

  function SuiteTreeItem(props) {
    _classCallCheck(this, SuiteTreeItem);

    var _this = _possibleConstructorReturn(this, (SuiteTreeItem.__proto__ || Object.getPrototypeOf(SuiteTreeItem)).call(this, props));

    _this.handleClick = function () {
      if (_this.hasChildren()) {
        _this.toggle();
      } else {
        var suite = _this.props.suite;

        if (_this.isCurrent()) {
          _apiInternal2.default.indexMode('suite'); // Slide to the 'Suite' view.
        } else {
          _apiInternal2.default.loadSuite(suite); // Load the suite.
        }
      }
    };

    _this.handleMouseEnter = function () {
      // Alert parent that the mouse is over the [Suite].
      var _this$props = _this.props,
          suite = _this$props.suite,
          onOverSuite = _this$props.onOverSuite;

      onOverSuite({
        suite: _this.hasChildren() ? null : suite,
        toggle: function toggle(isOpen) {
          _this.toggle(isOpen);
        }
      });
      _this.setState({ isOver: true });
    };

    _this.handleMouseLeave = function () {
      _this.setState({ isOver: false });
    };

    _this.state = { isOpen: false, isOver: false, isMounted: false };
    return _this;
  }

  _createClass(SuiteTreeItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // Ensure the item is open if a child is selected.
      var isOpen = this.storageIsOpen();
      if (this.isChildSelected()) {
        isOpen = true;
      }
      this.toggle(isOpen);

      // Indicate that the component is rendered.
      // NB: Used to prevent <Twisty> from animating on inital load.
      (0, _jsUtil.delay)(function () {
        return _this2.setState({ isMounted: true });
      });
    }
  }, {
    key: 'widths',
    value: function widths() {
      var _props = this.props,
          level = _props.level,
          width = _props.width;

      var indent = 0;
      if (level > 0) {
        indent = 15 * level;
      }
      var content = width ? width - (indent + 27) : ''; // Set so that ellipsis show.
      return {
        indent: indent,
        content: content,
        title: this.isSelected() ? content - 18 : content - 5
      };
    }
  }, {
    key: 'styles',
    value: function styles() {
      var _props2 = this.props,
          index = _props2.index,
          isRoot = _props2.isRoot;
      var isOver = this.state.isOver;

      var isFirst = index === 0;
      var hasChildren = this.hasChildren();
      var widths = this.widths();

      return (0, _util.css)({
        base: {
          borderTop: isRoot && isFirst ? 'none' : 'solid 1px rgba(0, 0, 0, 0.04)',
          boxSizing: 'border-box'
        },
        content: {
          position: 'relative',
          width: widths.content,
          fontSize: 14,
          lineHeight: '36px',
          color: TEXT_COLOR,
          paddingLeft: 27 + widths.indent,
          marginRight: 120,
          ':hover': {
            background: (0, _color.fromAlpha)(-0.02),
            cursor: 'pointer'
          }
        },
        contentSelected: {
          background: SELECTED_BG_COLOR,
          ':hover': {
            // NB: Selected item does not present 'hover' style.
            background: SELECTED_BG_COLOR
          }
        },
        title: {
          position: 'relative',
          display: 'inline-block',
          paddingLeft: 3
        },
        iconOuter: {
          boxSizing: 'border-box',
          position: 'absolute',
          left: 7 + widths.indent,
          top: 8,
          paddingLeft: hasChildren ? 7 : 4,
          paddingTop: hasChildren ? 5 : 2,
          width: 20,
          height: 20
        },
        drillInIcon: {
          Absolute: '11 5 null null',
          opacity: 0.3,
          transform: isOver ? 'translateX(4px)' : null,
          transition: 'transform 0.15s linear'
        }
      });
    }
  }, {
    key: 'hasChildren',
    value: function hasChildren() {
      return this.props.suite.childSuites.length > 0;
    }
  }, {
    key: 'isSelected',
    value: function isSelected() {
      var _props3 = this.props,
          suite = _props3.suite,
          selectedSuite = _props3.selectedSuite;

      return selectedSuite ? suite.id === selectedSuite.id : false;
    }
  }, {
    key: 'isCurrent',
    value: function isCurrent() {
      var currentSuite = _apiInternal2.default.current.get('suite');
      return currentSuite && currentSuite.id === this.props.suite.id;
    }
  }, {
    key: 'isChildSelected',
    value: function isChildSelected() {
      var _props4 = this.props,
          suite = _props4.suite,
          selectedSuite = _props4.selectedSuite;

      if (!selectedSuite) {
        return false;
      }
      if (selectedSuite.id.length <= suite.id.length) {
        return false;
      }
      return selectedSuite.id.startsWith(suite.id);
    }
  }, {
    key: 'toggle',
    value: function toggle(isOpen) {
      if (this.hasChildren()) {
        if (isOpen === undefined) {
          isOpen = !this.state.isOpen;
        }
        this.setState({ isOpen: isOpen });
        this.storageIsOpen(isOpen);
      }
    }
  }, {
    key: 'storageIsOpen',
    value: function storageIsOpen(isOpen) {
      return _apiInternal2.default.localStorage('suite-is-open::' + this.props.suite.id, isOpen, { default: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var _props5 = this.props,
          suite = _props5.suite,
          level = _props5.level,
          selectedSuite = _props5.selectedSuite,
          onOverSuite = _props5.onOverSuite,
          width = _props5.width;
      var _state = this.state,
          isOpen = _state.isOpen,
          isMounted = _state.isMounted;

      var totalChildSuites = suite.childSuites.length;
      var hasChildren = totalChildSuites > 0;
      var isSelected = this.isSelected();
      var widths = this.widths();

      // Prepare selected chrevron pointer.
      var chrevronIcon = void 0;
      if (isSelected) {
        chrevronIcon = _react2.default.createElement(
          'div',
          { style: styles.drillInIcon },
          _react2.default.createElement(_shared.IconImage, { name: 'chevronRight' })
        );
      }

      // Prepare a list of child-suites if they exist.
      var childItems = void 0;
      if (isOpen && hasChildren) {
        childItems = suite.childSuites.map(function (item, i) {
          return _react2.default.createElement(SuiteTreeItemRadium, {
            key: i,
            suite: item,
            index: i,
            total: totalChildSuites,
            level: level + 1,
            selectedSuite: selectedSuite,
            onOverSuite: onOverSuite,
            width: width });
        });

        childItems = _react2.default.createElement(
          _shared.Ul,
          null,
          childItems
        );
      }

      return _react2.default.createElement(
        'li',
        { style: styles.base },
        _react2.default.createElement(
          'div',
          {
            style: [styles.content, isSelected && styles.contentSelected],
            onClick: this.handleClick,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave },
          _react2.default.createElement(
            'div',
            { style: styles.iconOuter },
            hasChildren ? _react2.default.createElement(_shared.Twisty, { isOpen: isOpen, isAnimated: isMounted }) : _react2.default.createElement(_shared.IconImage, { name: 'suiteBook' })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.title },
            _react2.default.createElement(
              _shared.Ellipsis,
              { width: widths.title },
              _react2.default.createElement(
                _shared.FormattedText,
                null,
                suite.name
              )
            )
          ),
          chrevronIcon
        ),
        childItems
      );
    }
  }]);

  return SuiteTreeItem;
}(_react2.default.Component);

SuiteTreeItem.propTypes = {
  suite: _react2.default.PropTypes.object.isRequired,
  index: _react2.default.PropTypes.number.isRequired,
  total: _react2.default.PropTypes.number.isRequired,
  isRoot: _react2.default.PropTypes.bool,
  level: _react2.default.PropTypes.number,
  selectedSuite: _react2.default.PropTypes.object,
  onOverSuite: _react2.default.PropTypes.func.isRequired,
  width: _react2.default.PropTypes.number.isRequired
};
SuiteTreeItem.defaultProps = {
  isRoot: false,
  level: 0
};


var SuiteTreeItemRadium = (0, _radium2.default)(SuiteTreeItem);
exports.default = SuiteTreeItemRadium;
//# sourceMappingURL=SuiteTreeItem.js.map