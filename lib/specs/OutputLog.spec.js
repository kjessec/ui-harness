'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Foo = require('react-atoms/components/Foo');

var _Foo2 = _interopRequireDefault(_Foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('OutputLog', function () {
  var _this = this;

  this.header('## A tailing output log.');

  before(function () {
    _this.width(300)
    // .component( <Foo>Foo</Foo> );
    .log('foo').log('foo1', 'bar');
    // .log('foo2')
  });

  it('`component(<Foo/>)`', function () {
    return _this.component(_react2.default.createElement(
      _Foo2.default,
      null,
      'Foo'
    ));
  });

  section('log', function () {
    it('`log()`', function () {
      return _this.log();
    });
    it('`log(123)`', function () {
      _this.log(123);
    });
    it('`log(123, "four")`', function () {
      _this.log(123, 'four');
    });
  });
  it('`log.clear()`', function () {
    return _this.log.clear();
  });
});
//# sourceMappingURL=OutputLog.spec.js.map