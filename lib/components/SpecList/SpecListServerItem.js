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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import api from '../../shared/api-internal';


/**
 * An spec list-item that is invoked on the server.
 */
var SpecListServerItem = function (_React$Component) {
  _inherits(SpecListServerItem, _React$Component);

  function SpecListServerItem() {
    _classCallCheck(this, SpecListServerItem);

    return _possibleConstructorReturn(this, (SpecListServerItem.__proto__ || Object.getPrototypeOf(SpecListServerItem)).apply(this, arguments));
  }

  _createClass(SpecListServerItem, [{
    key: 'styles',
    value: function styles() {
      return (0, _util.css)({
        base: {}
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      // console.log('TODO', 'Delete');
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      return _react2.default.createElement(
        'li',
        { style: styles.base },
        'Server Method - ',
        _react2.default.createElement(
          'a',
          { onClick: this.handleClick },
          'Invoke'
        )
      );
    }
  }]);

  return SpecListServerItem;
}(_react2.default.Component);

SpecListServerItem.propTypes = {
  spec: _util.PropTypes.object.isRequired,
  current: _util.PropTypes.instanceOf(_immutable2.default.Map).isRequired
};
SpecListServerItem.defaultProps = {};
exports.default = (0, _radium2.default)(SpecListServerItem);
//# sourceMappingURL=SpecListServerItem.js.map