'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Foo = require('react-atoms/components/Foo');

var _Foo2 = _interopRequireDefault(_Foo);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactObject = require('react-object');

var _apiInternal = require('../shared/api-internal');

var _apiInternal2 = _interopRequireDefault(_apiInternal);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyFoo = function (_React$Component) {
  _inherits(MyFoo, _React$Component);

  function MyFoo() {
    _classCallCheck(this, MyFoo);

    return _possibleConstructorReturn(this, (MyFoo.__proto__ || Object.getPrototypeOf(MyFoo)).apply(this, arguments));
  }

  _createClass(MyFoo, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {
          padding: 20,
          position: 'relative'
        },
        container: {
          paddingBottom: 10,
          marginBottom: 10,
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)'
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      return _react2.default.createElement(
        _Foo2.default,
        null,
        _react2.default.createElement(
          'div',
          { style: styles.container },
          'foo:',
          this.props.foo
        ),
        _react2.default.createElement(
          'div',
          { style: styles.container },
          _react2.default.createElement(_reactObject.ValueList, { items: [{ label: 'context', value: this.context }] })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.container },
          this.props.children
        )
      );
    }
  }]);

  return MyFoo;
}(_react2.default.Component);

MyFoo.contextTypes = {
  store: _util.PropTypes.object
};
exports.default = (0, _radium2.default)(MyFoo);


describe('Component Host', function () {
  var _this2 = this;

  this.header('## Properties of the host container.').hr(true);

  before(function () {
    _this2.align('top left').width(350).component(_react2.default.createElement(
      MyFoo,
      { foo: 'load' },
      _react2.default.createElement(
        'span',
        null,
        'Hello'
      )
    ));
  });

  section('load `component`', function () {
    it('from `<element>`', function () {
      _this2.component(_react2.default.createElement(
        MyFoo,
        { foo: 123 },
        _react2.default.createElement(
          'span',
          null,
          'Hello'
        )
      ));
    });

    it('from `<div>`', function () {
      _this2.component(_react2.default.createElement(
        'div',
        null,
        'My Div'
      ));
    });

    it('function component', function () {
      var MyFunc = function MyFunc(props) {
        return _react2.default.createElement(
          'div',
          null,
          'My ',
          props.name,
          ' Component'
        );
      };
      _this2.component(_react2.default.createElement(MyFunc, { name: 'Funky' }));
    });
  });

  section('Nothing in the Section', function () {});

  section('this.props', function () {
    it('props( `{ foo:now }` )', function () {
      _this2.props({ foo: new Date().toString() });
    });
  });

  section('this.tools', function () {
    it('`tools: <Foo>`', function () {
      _this2.tools(_react2.default.createElement(
        _Foo2.default,
        null,
        'My Tools'
      ));
    });

    it('`tools: null`', function () {
      _this2.tools(null);
    });
  });

  section('context', function () {
    it('set `childContextTypes`', function () {
      _this2.childContextTypes({ store: _react2.default.PropTypes.object });
    });
    it('Redux `store`', function () {
      _this2.context({ store: { getState: function getState() {
            return { contextWorks: true };
          } } });
    });
    it('Redux `dispatch`', function () {
      _this2.context({ store: { dispatch: function dispatch() {
            return function (v) {
              return console.info('dispatched ' + (v && v.type));
            };
          } } });
    });
  });

  section('children', function () {
    it('date', function () {
      _this2.children(_react2.default.createElement(
        'span',
        null,
        'Children: ',
        new Date().toString()
      ));
    });

    it('lorem (long)', function () {
      _this2.children(_react2.default.createElement(
        'span',
        null,
        'Children: ',
        (0, _util.lorem)(1000)
      ));
    });
  });

  section('size', function () {
    it('read', function () {
      console.log('width():', _this2.width());
      console.log('height():', _this2.height());
      console.log('');
    });
    it('`null:null`', function () {
      _this2.width(null).height(null);
    });
    it('`350:200`', function () {
      _this2.width(350).height(200);
    });
    it('`350:null`', function () {
      _this2.width(350).height(null);
    });
    it('`100%:100%`', function () {
      _this2.width('100%').height('100%');
    });
    it('`80%:80%`', function () {
      _this2.width('80%').height('80%');
    });

    it('`100%:null`', function () {
      _this2.width('100%').height(null);
    });
    it('`null:100%`', function () {
      _this2.width(null).height('100%');
    });

    it('`1000:null`', function () {
      _this2.width(1000).height(null);
    });
    it('`null:1000`', function () {
      _this2.width(null).height(1000);
    });
  });

  section('scroll', function () {
    it('`scroll:true`', function () {
      _this2.scroll(true);
    });
    it('`scroll:false`', function () {
      _this2.scroll(false);
    });
    it('`scroll:"x"`', function () {
      _this2.scroll('x');
    });
    it('`scroll:"y"`', function () {
      _this2.scroll('y');
    });
    it('`scroll:"x:y"`', function () {
      _this2.scroll('x:y');
    });
  });

  section('align', function () {
    it('`left top`', function () {
      _this2.align('left top');
    });
    it('`left middle`', function () {
      _this2.align('left middle');
    });
    it('`left bottom`', function () {
      _this2.align('left bottom');
    });

    it('`center top`', function () {
      _this2.align('center top');
    });
    it('`center middle`', function () {
      _this2.align('center middle');
    });
    it('`center bottom`', function () {
      _this2.align('center bottom');
    });

    it('`right top`', function () {
      _this2.align('right top');
    });
    it('`right middle`', function () {
      _this2.align('right middle');
    });
    it('`right bottom`', function () {
      _this2.align('right bottom');
    });
  });

  section('align: single value (defaults)', function () {
    it('`left`', function () {
      _this2.align('left');
    });
    it('`middle`', function () {
      _this2.align('middle');
    });
  });

  section('margin', function () {
    it('`0`', function () {
      _this2.margin(0);
    });
    it('`40`', function () {
      _this2.margin(40);
    });
    it('`120`', function () {
      _this2.margin(120);
    });
  });

  section('cropMarks', function () {
    it('read', function () {
      console.log('cropMarks():', _this2.cropMarks());
      console.log('cropMarks.size():', _this2.cropMarks.size());
      console.log('cropMarks.offset():', _this2.cropMarks.offset());
      console.log('api.current.toJS()', _apiInternal2.default.current.toJS());
      console.log('');
    });
    it('`false`', function () {
      _this2.cropMarks(false);
    });
    it('`true`', function () {
      _this2.cropMarks(true);
    });
    it('`cropMarks.size: 10`', function () {
      _this2.cropMarks.size(10);
    });
    it('`cropMarks.size: 20`', function () {
      _this2.cropMarks.size(20);
    });
    it('`cropMarks.size: 30`', function () {
      _this2.cropMarks.size(30);
    });
    it('`cropMarks.offset: 0`', function () {
      _this2.cropMarks.offset(0);
    });
    it('`cropMarks.offset: 5`', function () {
      _this2.cropMarks.offset(5);
    });
    it('`cropMarks.offset: 10`', function () {
      _this2.cropMarks.offset(10);
    });
  });

  section('backdrop (color)', function () {
    it('`backdrop:0`', function () {
      _this2.backdrop(0);
    });
    it('`backdrop:0.02`', function () {
      _this2.backdrop(0.02);
    });
    it('`backdrop:0.3`', function () {
      _this2.backdrop(0.3);
    });
    it('`backdrop:0.6`', function () {
      _this2.backdrop(0.6);
    });
    it('`backdrop:1`', function () {
      _this2.backdrop(1);
    });
    it('`backdrop:red`', function () {
      _this2.backdrop('red');
    });
  });

  section('background (color)', function () {
    it('`background:0`', function () {
      _this2.background(0);
    });
    it('`background:0.02`', function () {
      _this2.background(0.02);
    });
    it('`background:0.3`', function () {
      _this2.background(0.3);
    });
    it('`background:0.6`', function () {
      _this2.background(0.6);
    });
    it('`background:1`', function () {
      _this2.background(1);
    });
    it('`background:red`', function () {
      _this2.background('red');
    });
  });
});
//# sourceMappingURL=ComponentHost.spec.js.map