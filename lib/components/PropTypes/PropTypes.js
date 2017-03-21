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

var _util = require('../util');

var _reactObject = require('react-object');

var _shared = require('../shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types:0 */

/**
 * Renders a visual representation of the PropTypes API.
 */
var PropTypesComponent = function (_React$Component) {
  _inherits(PropTypesComponent, _React$Component);

  function PropTypesComponent() {
    _classCallCheck(this, PropTypesComponent);

    return _possibleConstructorReturn(this, (PropTypesComponent.__proto__ || Object.getPrototypeOf(PropTypesComponent)).apply(this, arguments));
  }

  _createClass(PropTypesComponent, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          position: 'relative',
          paddingTop: 18,
          paddingLeft: 3,
          paddingRight: 3,
          paddingBottom: 10
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var _props = this.props,
          props = _props.props,
          propTypes = _props.propTypes;


      var toValueItem = function toValueItem(key) {
        return { label: key, value: props[key] };
      };
      var items = _ramda2.default.pipe(_ramda2.default.keys, _ramda2.default.map(toValueItem), _ramda2.default.reject(_ramda2.default.isNil))(propTypes);

      var el = items.length > 0 ? _react2.default.createElement(_reactObject.ValueList, { items: items, collapsedTotal: 0 }) : _react2.default.createElement(
        _shared.EmptyLabel,
        null,
        'No PropTypes on component.'
      );

      return _react2.default.createElement(
        'div',
        { style: styles.base },
        el
      );
    }
  }]);

  return PropTypesComponent;
}(_react2.default.Component);

PropTypesComponent.propTypes = {
  props: _util.PropTypes.object.isRequired,
  propTypes: _util.PropTypes.object.isRequired
};
PropTypesComponent.defaultProps = {};
exports.default = (0, _radium2.default)(PropTypesComponent);
//# sourceMappingURL=PropTypes.js.map