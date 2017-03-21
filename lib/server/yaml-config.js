'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = exports.parse = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _jsUtil = require('js-util');

var _paths = require('./paths');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_PATH = (0, _paths.rootModulePath)();

var formatPath = function formatPath(path) {
  if (!_ramda2.default.is(String, path)) {
    return path;
  }
  path = path.trim();
  return path.startsWith('.') ? _path2.default.join(ROOT_PATH, path) : path;
};

var toFileExtensionRegEx = function toFileExtensionRegEx(item) {
  if (!(item instanceof RegExp)) {
    item = item.replace(/\./g, '\\.');
    item = new RegExp(item + '$');
  }
  return item;
};

/**
 * Parses the given YAML text into a config object.
 * @param {String} text: The raw YAML to parse.
 * @return {Object} config.
 */
var parse = exports.parse = function parse(text) {
  // Parse the YAML.
  var yaml = void 0;
  try {
    yaml = _jsYaml2.default.safeLoad(text) || {};
  } catch (err) {
    throw new Error('The [.uiharness.yml] file is invalid. ' + err.message);
  }

  // Format entry path.
  if (_ramda2.default.is(String, yaml.entry)) {
    yaml.entry = yaml.entry.split(',');
  }
  yaml.entry = yaml.entry || [];
  if (yaml.entry.length === 0) {
    yaml.entry[0] = './src/specs';
  }
  yaml.entry = yaml.entry.map(formatPath);

  // Format GraphQL path.
  if (yaml.graphqlSchema) {
    yaml.graphqlSchema = formatPath(yaml.graphqlSchema);
  }

  // Format css-modules.
  var cssModules = yaml.cssModules;
  if (cssModules) {
    cssModules = _ramda2.default.is(Array, cssModules) ? cssModules : [cssModules];
    cssModules = cssModules.map(toFileExtensionRegEx);
    yaml.cssModules = cssModules;
  }

  // Finish up.
  return yaml;
};

/**
 * Loads and parses the YAML file at the given location.
 *
 * @param {String} path:  Optional. The path to the YAML config file to load.
 *                        If not specified a path to [.uiharness.yml] in the root
 *                        of the project is used.
 *
 * @return {Object} config OR undefined if the file does not exist.
 */
var load = exports.load = function load(path) {
  // Setup initial conditions.
  path = (0, _jsUtil.isBlank)(path) ? _path2.default.join(ROOT_PATH, '.uiharness.yml') : path;
  path = path.startsWith('.') ? _path2.default.resolve(path) : path;

  // Ensure the path exists.
  if (!_fsExtra2.default.existsSync(path)) {
    return undefined;
  }

  // Load and parse the file.
  var yaml = _fsExtra2.default.readFileSync(path, 'utf8');
  return parse(yaml);
};
//# sourceMappingURL=yaml-config.js.map