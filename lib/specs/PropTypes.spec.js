'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Foo = require('react-atoms/components/Foo');

var _Foo2 = _interopRequireDefault(_Foo);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe('PropTypes', function () {
  var _this = this;

  this.header('## Renders a visual representation of the PropTypes API.');

  before(function () {
    _this.component(_react2.default.createElement(MyComponent, null));
  });

  it('`unload`', function () {
    return _this.unload();
  });
  it('`load: <MyComponent>`', function () {
    return _this.component(_react2.default.createElement(MyComponent, null));
  });
  it('`load: <Foo>`', function () {
    return _this.component(_react2.default.createElement(
      _Foo2.default,
      null,
      'Foo'
    ));
  });
});

// ----------------------------------------------------------------------------


var MyComponent = function (_React$Component) {
  _inherits(MyComponent, _React$Component);

  function MyComponent() {
    _classCallCheck(this, MyComponent);

    return _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).apply(this, arguments));
  }

  _createClass(MyComponent, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'MyComponent'
      );
    }
  }]);

  return MyComponent;
}(_react2.default.Component);

exports.default = MyComponent;
MyComponent.propTypes = {
  name: _util.PropTypes.string,
  obj: _util.PropTypes.shape({
    color: _util.PropTypes.string,
    isEnabled: _util.PropTypes.bool
  })
};
MyComponent.defaultProps = {
  obj: {
    color: 'tomato',
    isEnabled: true
  }
};
//# sourceMappingURL=PropTypes.spec.js.map