'use strict';

var _util = require('./util');

var LONG_MARKDOWN = '\n  # Title\n  ## H2 My Subtitle of the thing about the thing.\n  ---\n  Lorem `ipsum dolor` sit amet, consectetur adipisicing elit, sed do.\n\n  - One\n  - Two\n  - Three\n\n\n  Text: ' + (0, _util.lorem)(30) + '\n\n  ## Another H2 Section\n  ' + (0, _util.lorem)(15) + '\n\n  ### H3 Section\n  ' + (0, _util.lorem)(40) + '\n\n      <Markdown\n            display=\'block\'\n            trimIndent={true}>\n        { this.props.markdown }\n      </Markdown>\n\n\n  #### H4 Section\n  ' + (0, _util.lorem)(40) + '\n\n';

describe('Header/Footer', function () {
  var _this = this;

  this.header('\n  # Title\n  ## Subtitle of `the` component.\n  ---\n  ');
  // this.header(LONG_MARKDOWN);
  this.footer(LONG_MARKDOWN);

  it('`null`', function () {
    _this.header(null);
    _this.footer(null);
  });

  var contentOptions = function contentOptions(method) {
    it('title only <h1>', function () {
      method('# My Header');
    });
    it('subtitle only <h2>', function () {
      method('## ' + (0, _util.lorem)(10) + ' \n---');
    });
    it('title `.hr(true)`', function () {
      method('# My Title').hr(true);
    });
    it('subtitle `.hr(true)`', function () {
      method('## ' + (0, _util.lorem)(10)).hr(true);
    });
    it('subtitle ---`.hr(true)`', function () {
      method('## ' + (0, _util.lorem)(10) + '\n---').hr(true);
    });
    it('subtitle ---`.hr(false)`', function () {
      method('## ' + (0, _util.lorem)(10) + '\n---').hr(false);
    });

    it('title / subtitle (short)', function () {
      method('\n      # Title\n      ## Subtitle of the thing as a thing.\n      ---\n      ');
    });

    it('title / subtitle (long)', function () {
      method('\n        # Title\n        ## Subtitle `lorem ipsum dolor` sit amet, ' + (0, _util.lorem)(60) + '\n        ---\n      ');
    });

    it('long', function () {
      method(LONG_MARKDOWN);
    });
    it('long `.hr(true)`', function () {
      method(LONG_MARKDOWN).hr(true);
    });
    it('long `.hr(false)`', function () {
      method(LONG_MARKDOWN).hr(false);
    });
  };

  section('header', function () {
    return contentOptions(_this.header);
  });
  section('footer', function () {
    return contentOptions(_this.footer);
  });

  section('backdrop', function () {
    it('`backdrop:0`', function () {
      _this.backdrop(0);
    });
    it('`backdrop:0.6`', function () {
      _this.backdrop(0.6);
    });
    it('`backdrop:1`', function () {
      _this.backdrop(1);
    });
    it('`backdrop:red`', function () {
      _this.backdrop('red');
    });
  });
});
//# sourceMappingURL=header-footer.spec.js.map