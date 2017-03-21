'use strict';

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var MyComponent = function MyComponent() {
  return React.createElement(
    'div',
    { className: 'MyComponent' },
    'MyComponent'
  );
};

var styles = {
  background: 'rgba(255, 0, 0, 0.1)',
  '.MyComponent': {
    position: 'relative',
    padding: 20,
    margin: 40,
    background: 'red',
    color: 'white'
  }
};

describe('style', function () {
  var _this = this;

  this.header('## External style object');
  before(function () {
    _this.style(styles).component(React.createElement(MyComponent, null));
  });
});
//# sourceMappingURL=style.spec.js.map