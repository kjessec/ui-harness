'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require('../util');

var _shared = require('../shared');

var _apiInternal = require('../../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _SuiteHeader = require('./SuiteHeader');

var _SuiteHeader2 = _interopRequireDefault(_SuiteHeader);

var _SpecList = require('../SpecList');

var _SpecList2 = _interopRequireDefault(_SpecList);

var _Section = require('./Section');

var _Section2 = _interopRequireDefault(_Section);

var _PropTypes = require('../PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The index-column view a [Suite]'s set of specs.
 */
var Suite = function (_React$Component) {
  _inherits(Suite, _React$Component);

  function Suite() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Suite);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Suite.__proto__ || Object.getPrototypeOf(Suite)).call.apply(_ref, [this].concat(args))), _this), _this.handleKeyDown = function (e) {
      switch (e.which) {
        case 37:
          // LEFT.
          _apiInternal2.default.indexMode('tree'); // Slide back to the tree-view.
          break;
        default: // Ignore.
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Suite, [{
    key: 'styles',
    value: function styles(hasPropTypes) {
      return (0, _util.css)({
        base: { Absolute: 0 },
        middle: { Absolute: 0 },
        specsList: {
          Absolute: [0, 0, hasPropTypes ? 27 : 0, 0],
          paddingTop: 6,
          overflow: 'hidden',
          overflowY: 'auto'
        },
        propTypesTitle: {
          Absolute: [null, 0, 0, 0],
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 16,
          textShadow: '0px -1px rgba(0, 0, 0, 0.1)',
          color: '#fff',
          background: '#D1D1D1',
          borderTop: 'solid 1px rgba(0, 0, 0, 0.05)',
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.05)',
          padding: 3
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          suite = _props.suite,
          current = _props.current;

      var hasOnly = _ramda2.default.any(function (spec) {
        return spec.isOnly;
      }, suite.specs);
      var componentProps = current.get('componentProps');
      var componentType = current.get('componentType');
      var hasPropTypes = componentType && componentType.propTypes;
      var styles = this.styles(hasPropTypes);
      var sections = void 0;

      var specs = _ramda2.default.filter(function (item) {
        if (item.section) {
          return false;
        }
        return hasOnly ? item.isOnly : true;
      }, suite.specs);

      if (suite.sections) {
        var includeSection = function includeSection(section) {
          return hasOnly ? _ramda2.default.any(function (item) {
            return item.isOnly;
          }, section.specs()) : true;
        };
        sections = suite.sections.map(function (section, i) {
          if (includeSection(section)) {
            return _react2.default.createElement(_Section2.default, {
              key: i,
              section: section,
              hasOnly: hasOnly,
              current: current });
          }
          return undefined;
        });
      }
      return _react2.default.createElement(
        'div',
        { style: styles.base },
        _react2.default.createElement(
          _shared.FlexEdge,
          { orientation: 'vertical' },
          _react2.default.createElement(_SuiteHeader2.default, { suite: suite }),
          _react2.default.createElement(
            'div',
            { style: styles.middle, 'data-flexEdge': 1 },
            _react2.default.createElement(
              'div',
              { style: styles.specsList },
              _react2.default.createElement(_SpecList2.default, { specs: specs, current: current }),
              sections
            ),
            hasPropTypes && _react2.default.createElement(
              'div',
              { style: styles.propTypesTitle },
              'API'
            )
          ),
          hasPropTypes && _react2.default.createElement(
            'div',
            {
              'data-flexEdge': {
                maxHeight: '50%',
                overflow: 'hidden',
                overflowY: 'auto' } },
            _react2.default.createElement(_PropTypes2.default, {
              props: componentProps,
              propTypes: componentType.propTypes })
          )
        )
      );
    }
  }]);

  return Suite;
}(_react2.default.Component);

Suite.propTypes = {
  current: _util.PropTypes.instanceOf(_immutable2.default.Map).isRequired,
  suite: _util.PropTypes.object.isRequired
};
Suite.defaultProps = {};
exports.default = (0, _radium2.default)(Suite);
//# sourceMappingURL=Suite.js.map