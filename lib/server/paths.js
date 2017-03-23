'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatSpecPaths = exports.formatEntryPaths = exports.trimRootModulePath = exports.REACT_PATH = exports.closestModulePath = exports.rootModulePath = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _log = require('../shared/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieves the absolute path to the root module, which will be either:
 *   - the referencing parent module (typically)
 *   - or the ui-harness itself (when under development).
 *
 * @return {String}.
 */
var rootModulePath = exports.rootModulePath = function rootModulePath() {
  var parent = _path2.default.resolve('../');
  return _path2.default.basename(parent) === 'node_modules' ? _path2.default.resolve('../../') : _path2.default.resolve('./');
}; /* eslint max-len:0, no-useless-escape:0 */

var ROOT_PATH = rootModulePath();

/**
 * Walks up the folder hierarchy looking for the closest module.
 * @param {String} moduleDir: The path to the module directory
 *                            (ie. the parent of node_modules).
 * @param {String} moduleName: The name of the module you are looking for.
 *
 * @return {String}.
 */
var closestModulePath = exports.closestModulePath = function closestModulePath(moduleDir, moduleName) {
  var dir = _path2.default.join(moduleDir, 'node_modules', moduleName);
  if (_fsExtra2.default.existsSync(dir)) {
    return dir;
  }
  // Not found, walk up the folder-hierarhcy.
  var parent = _path2.default.resolve(moduleDir, '..');
  if (parent !== _path2.default.resolve('/')) {
    return closestModulePath(parent, moduleName); // <== RECURSION.
  }
  return undefined;
};

/**
 *  Retrieve the path to the `react` module.
 *
 *   - First look within the UIHarness module, as that will be the
 *     latest version supported by UIHarness, and will be here if another reference
 *     has caused a different version of react to be held in the root node_modules.
 *
 *   - If not found locally, then walk up the tree to find the first reference of it.
 */
var REACT_PATH = exports.REACT_PATH = closestModulePath(_path2.default.join(__dirname, '../../'), 'react');

/**
 * Trims the root module path from the given path (if it exists).
 * @param {String} path: The path to modify.
 * @return {String}.
 */
var trimRootModulePath = exports.trimRootModulePath = function trimRootModulePath(path) {
  if (!_ramda2.default.is(String, path)) {
    return path;
  }
  return path.startsWith(ROOT_PATH) ? '.' + path.substr(ROOT_PATH.length, path.length) : path;
};

/**
 * Prepare entry paths for the WebPack bundle.
 *
 * @param {String|Array} entry: Paths to entry points of files to pass
 *                              to WebPack to build for the client.
 *
 * @return {Object} of paths.
 */
var formatEntryPaths = exports.formatEntryPaths = function formatEntryPaths(entry) {
  entry = entry || [];
  if (!_ramda2.default.is(Array, entry)) {
    entry = [entry];
  }
  if (entry.length === 0) {
    entry.push('./specs');
    entry.push('./src/specs');
  }
  return entry
  // Ensure there is a specific index.js entry file if only a folder was given.
  // NB: Not having a specific entry file can cause build-errors in WebPack.
  .map(function (path) {
    return path.endsWith('.js') || path.endsWith('.jsx') ? path : path + '/index.js';
  })

  // Escape white-spaces within paths.
  .map(function (path) {
    return path.replace(/ /, '\ ');
  })

  // Resolve relative (.) paths into fully-qualified paths.
  .map(function (path) {
    return path.startsWith('.') ? _path2.default.resolve(path) : path;
  })

  // Remove any paths that don't actually exist.
  .filter(function (path) {
    return _fsExtra2.default.existsSync(path);
  });
};

/**
 * Prepare spec paths for the WebPack bundle.
 *
 * @param {String|Array} entry: Paths to entry points of files to pass
 *                              to WebPack to build for the client.
 *
 * @return {Object} of paths.
 */
var formatSpecPaths = exports.formatSpecPaths = function formatSpecPaths(entry) {
  var paths = formatEntryPaths(entry);

  // Check for non-standard characters within the paths.
  paths.forEach(function (path) {
    if (!path.match(/^[a-z0-9\.\-\_\s\/]+$/i)) {
      _log2.default.warn(_chalk2.default.red('WARNING Path contains non-standard characters. Auto-reloading may not work.'));
      _log2.default.warn(_chalk2.default.red('        Hint: Brackets in the path "(...)" will cause problems.'));
      _log2.default.warn(_chalk2.default.cyan('        ' + path));
      _log2.default.warn('');
    }
  });

  // Finish up.
  return paths;
};
//# sourceMappingURL=paths.js.map