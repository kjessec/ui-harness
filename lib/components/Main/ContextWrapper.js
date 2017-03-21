'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _util = require('../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var object = _util.PropTypes.object,
    node = _util.PropTypes.node;

var ContextWrapper = function (_Component) {
  _inherits(ContextWrapper, _Component);

  function ContextWrapper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ContextWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContextWrapper.__proto__ || Object.getPrototypeOf(ContextWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.getChildContext = function () {
      return _this.props.context;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ContextWrapper, [{
    key: 'render',
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return ContextWrapper;
}(_react.Component);

ContextWrapper.propTypes = {
  context: object,
  children: node.isRequired
};
exports.default = ContextWrapper;
//# sourceMappingURL=ContextWrapper.js.map