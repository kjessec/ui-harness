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

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _util = require('../util');

var _shared = require('../shared');

var _apiInternal = require('../../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _SpecList = require('../SpecList');

var _SpecList2 = _interopRequireDefault(_SpecList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isOpenStorage = function isOpenStorage(section, isOpen) {
  return _apiInternal2.default.localStorage(section.id, isOpen, { default: true });
};

/**
 * A section of Specs.
 */

var Section = function (_React$Component) {
  _inherits(Section, _React$Component);

  function Section(props) {
    _classCallCheck(this, Section);

    var _this = _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).call(this, props));

    _this.handleClick = function () {
      var isOpen = !_this.state.isOpen;
      _this.setState({ isOpen: isOpen });
      isOpenStorage(_this.props.section, isOpen);
    };

    _this.state = { isOpen: isOpenStorage(props.section) };
    return _this;
  }

  _createClass(Section, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {},
        titleBar: {
          background: 'rgba(0, 0, 0, 0.05)',
          borderTop: 'solid 1px rgba(0, 0, 0, 0.04)',
          color: (0, _color2.default)('white').darken(0.5).hexString(),
          fontSize: 14,
          padding: '6px 10px',
          marginBottom: 3,
          cursor: 'pointer'
        },
        empty: {
          textAlign: 'center',
          fontSize: 13,
          fontStyle: 'italic',
          color: (0, _color2.default)('white').darken(0.5).hexString(),
          paddingTop: 10,
          paddingBottom: 20
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var _props = this.props,
          section = _props.section,
          hasOnly = _props.hasOnly,
          current = _props.current;
      var isOpen = this.state.isOpen;

      var specs = section.specs();
      if (hasOnly) {
        specs = specs.filter(function (spec) {
          return spec.isOnly;
        });
      }

      return _react2.default.createElement(
        'div',
        { style: styles.base },
        _react2.default.createElement(
          'div',
          { style: styles.titleBar, onClick: this.handleClick },
          _react2.default.createElement(
            _shared.Ellipsis,
            null,
            _react2.default.createElement(_shared.Twisty, { margin: '0 5px 0 0', isOpen: this.state.isOpen }),
            _react2.default.createElement(
              _shared.FormattedText,
              null,
              section.name
            )
          )
        ),
        isOpen && specs.length > 0 ? _react2.default.createElement(_SpecList2.default, { specs: specs, current: current }) : null,
        isOpen && specs.length === 0 ? _react2.default.createElement(
          'div',
          { style: styles.empty },
          'Empty'
        ) : null
      );
    }
  }]);

  return Section;
}(_react2.default.Component);

Section.propTypes = {
  current: _util.PropTypes.instanceOf(_immutable2.default.Map).isRequired,
  section: _util.PropTypes.object.isRequired,
  hasOnly: _util.PropTypes.bool
};
Section.defaultProps = {
  hasOnly: false
};
exports.default = (0, _radium2.default)(Section);
//# sourceMappingURL=Section.js.map