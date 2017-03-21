'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatText = exports.escapeHtml = undefined;

var _jsUtil = require('js-util');

var util = _interopRequireWildcard(_jsUtil);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Converts HTML chars into escaped versions.
 */
var escapeHtml = exports.escapeHtml = function escapeHtml(text) {
  var isWithinBlock = false;
  var result = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = text[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var char = _step.value;

      // Don't escape <HTML> that is wihtin the markdown `tick` block.
      if (char === '`') {
        isWithinBlock = !isWithinBlock;
      }
      if (!isWithinBlock) {
        if (char === '<') {
          char = '&lt;';
        }
        if (char === '>') {
          char = '&gt;';
        }
      }
      result += char;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

/**
 * Formats text for display.
 * @param {string} text: The text for format.
 * @return {string} HTML.
 */
var formatText = exports.formatText = function formatText(text) {
  if (util.isBlank(text)) {
    return text;
  }
  text = text.toString();
  text = escapeHtml(text);
  text = (0, _marked2.default)(text);
  text = text.substring(3, text.length - 5); // Remove the wrapping <p>...</p> tags.
  return text;
};
//# sourceMappingURL=util.js.map