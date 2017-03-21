'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_BROWSER = typeof window !== 'undefined';

var elementExists = function elementExists(parentElement, tag) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var childElement = arguments[3];

  var elements = document.head.getElementsByTagName(tag);

  // Get the child <element> content as text for matching.
  var childText = '';
  if (childElement) {
    var div = document.createElement('div');
    div.appendChild(childElement);
    childText = div.innerText;
  }

  var hasMatchingContent = function hasMatchingContent(el) {
    return el.innerText === childText;
  };
  var isMatchingProp = function isMatchingProp(el, key) {
    return _ramda2.default.is(Function, props[key]) || el[key] === props[key];
  };
  var hasMatchingProps = function hasMatchingProps(el) {
    return _ramda2.default.all(function (key) {
      return isMatchingProp(el, key);
    }, Object.keys(props));
  };
  var isMatch = function isMatch(el) {
    return hasMatchingProps(el) && hasMatchingContent(el);
  };
  return _ramda2.default.any(isMatch, elements);
};

/**
 * API for manipulating the containing page.
 */

exports.default = function (context) {
  return {
    /**
     * Inserts a new element into the DOM.
     *
     * WARNING: Typically you don't want to do this when using React.
     *          This is for things like inserting a SCRIPT tag, or a
     *          LINK into the head of the document.
     *
     * @param {DomElement} parentElement: The element to append.
     * @param {String} tag: The name of the element tag.
     * @param {Object} props: An object containing the {attr:value} to apply.
     * @param {Object} childElement: The child of the new element.
     *
     * @return {Object} The 'this' context for chaining.
     */
    insert: function insert(parentElement, tag) {
      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var childElement = arguments[3];

      if (IS_BROWSER) {
        var exists = elementExists(parentElement, tag, props, childElement);
        if (!exists) {
          var el = document.createElement(tag);
          Object.keys(props).forEach(function (key) {
            el[key] = props[key];
          });
          if (childElement) {
            el.appendChild(childElement);
          }
          parentElement.appendChild(el);
        }
      }
      return context;
    },


    /**
     * Inserts a <link> into the <head>.
     * @param {Object} props: An object containing the {attr:value} to apply.
     * @return {Object} The 'this' context for chaining.
     */
    insertLink: function insertLink() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (IS_BROWSER) {
        this.insert(document.head, 'link', props);
      }
      return context;
    },


    /**
     * Inserts a <link> to a webfont into the <head>.
     * @param {String|Array} url: The URL(s) to the web-font.
     * @return {Object} The 'this' context for chaining.
     */
    // insertFont: (url) => this.insertLink({ rel: 'stylesheet', type: 'text/css' }),
    insertFont: function insertFont(url) {
      var _this = this;

      if (IS_BROWSER) {
        url = _ramda2.default.is(Array, url) ? url : [url];
        url.forEach(function (item) {
          _this.insertLink({ href: item, rel: 'stylesheet', type: 'text/css' });
        });
      }
      return context;
    },


    /**
     * Inserts a script.
     * @param {String|Object} value:
     *                          - If a script is passed it is considered the script content itself.
     *                          - If an object is passed it is considered the props of the <script>
     *                            use this to pass a { src } value.
     *
     */
    insertScript: function insertScript(value) {
      if (IS_BROWSER) {
        if (_ramda2.default.is(Object, value)) {
          // Ensure the src has a full URL.
          //    Note: This is required for matching the existence of the <script> in the future
          //    as the browser automatically inserts the full URL on the DOM element itself.
          if (_ramda2.default.is(String, value.src) && value.src.startsWith('/')) {
            value.src = '' + location.origin + value.src;
          }
          this.insert(document.head, 'script', value);
        } else if (_ramda2.default.is(String, value)) {
          // Raw JS code has been given.  Insert it within the script.
          this.insert(document.head, 'script', {}, document.createTextNode(value));
        }
      }
      return context;
    }
  };
};
//# sourceMappingURL=page.js.map