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

var _util = require('../util');

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _AlignmentContainer = require('react-atoms/components/AlignmentContainer');

var _AlignmentContainer2 = _interopRequireDefault(_AlignmentContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The display host for a component under test.
 */
var ComponentHost = function (_React$Component) {
  _inherits(ComponentHost, _React$Component);

  function ComponentHost() {
    _classCallCheck(this, ComponentHost);

    return _possibleConstructorReturn(this, (ComponentHost.__proto__ || Object.getPrototypeOf(ComponentHost)).apply(this, arguments));
  }

  _createClass(ComponentHost, [{
    key: 'styles',
    value: function styles() {
      var current = this.props.current;

      var margin = current.get('margin');
      return (0, _util.css)({
        base: {
          Absolute: [margin, margin, margin, margin]
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var current = this.props.current;

      var elTools = current.get('tools');

      return _react2.default.createElement(
        'div',
        { style: styles.base },
        elTools,
        current.get('componentType') && _react2.default.createElement(
          _AlignmentContainer2.default,
          {
            align: current.get('align'),
            width: current.get('width'),
            height: current.get('height') },
          _react2.default.createElement(_Component2.default, { current: current })
        )
      );
    }
  }]);

  return ComponentHost;
}(_react2.default.Component);

ComponentHost.propTypes = {
  current: _util.PropTypes.instanceOf(_immutable2.default.Map).isRequired
};
ComponentHost.defaultProps = {};
exports.default = (0, _radium2.default)(ComponentHost);
//# sourceMappingURL=ComponentHost.js.map