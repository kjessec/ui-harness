'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _webpackConfig = require('./webpack-config');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _webpackDevServer = require('./webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _paths = require('./paths');

var _log = require('../shared/log');

var _log2 = _interopRequireDefault(_log);

var _initRelay = require('../relay/init-relay');

var _initRelay2 = _interopRequireDefault(_initRelay);

var _yamlConfig = require('./yaml-config');

var yamlConfig = _interopRequireWildcard(_yamlConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var REQUIRED_NODE_VERSION = '>=5.5.0';
var ROOT_PATH = (0, _paths.rootModulePath)();
var YAML_CONFIG = yamlConfig.load() || {};

var displayPath = function displayPath(path) {
  return (0, _paths.trimRootModulePath)(path);
};

/**
 * Starts the UIHarness development server.
 *
 * @param {Object} options:
 *
 *    --entry:             Required. Path to the specs files (comma seperated if more than one).
 *
 *    --port:              Optional. The port to start the server on.
 *                         Default: 3030
 *
 *    --proxy:             Optional. An object containing { path, host } mappings
 *                         to proxy server requests to.
 *                         (https://webpack.github.io/docs/webpack-dev-server.html#proxy)
 *
 *   -- graphqlSchema:     Optional. A path to the GraphQL `schema.js` or `schema.json` file.
 *                         If not specified Relay will not be enabled.
 *
 * @return {Promise}.
 */

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new _bluebird2.default(function (resolve, reject) {
    _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var packageJson, entry, env, port, proxy, graphqlSchema, images, css, cssModules, nodeVersion, isRelayEnabled, specs, config, app;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Setup initial conditions.
              packageJson = require(_path2.default.resolve('./package.json'));

              // Extract options or default values.

              entry = options.entry || YAML_CONFIG.entry;
              env = process.env.NODE_ENV || 'development';
              port = options.port || YAML_CONFIG.port || 3030;
              proxy = options.proxy || YAML_CONFIG.proxy;
              graphqlSchema = options.graphqlSchema || YAML_CONFIG.graphqlSchema;
              images = options.images || YAML_CONFIG.images || { baseUrl: '/' + packageJson.name + '/images', dir: 'images' };
              css = options.css || YAML_CONFIG.css || { baseUrl: '/' + packageJson.name + '/css', dir: 'css' };
              cssModules = options.cssModules || YAML_CONFIG.cssModules;

              // Ensure required values exist.

              if (!(_ramda2.default.isNil(entry) || _ramda2.default.isEmpty(entry))) {
                _context.next = 11;
                break;
              }

              throw new Error('Entry path(s) must be specified.');

            case 11:

              // Ensure the minimum version of node is supported.
              nodeVersion = _semver2.default.clean(_shelljs2.default.exec('node -v', { silent: true }).stdout);

              if (_semver2.default.satisfies(nodeVersion, REQUIRED_NODE_VERSION)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', reject(new Error('The UIHarness requires node version ' + REQUIRED_NODE_VERSION + '.')));

            case 14:

              // Ensure ES6+ within the specs can be imported.
              require('babel-register');

              // Initialize the Relay/GraphQL schema (if specified).
              isRelayEnabled = _ramda2.default.is(String, graphqlSchema);

              if (!isRelayEnabled) {
                _context.next = 25;
                break;
              }

              _context.prev = 17;
              _context.next = 20;
              return (0, _initRelay2.default)(graphqlSchema);

            case 20:
              _context.next = 25;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context['catch'](17);
              return _context.abrupt('return', reject(_context.t0));

            case 25:

              // Prepare the Webpack configuration.
              specs = (0, _paths.formatSpecPaths)(entry);
              config = (0, _webpackConfig2.default)({
                isRelayEnabled: isRelayEnabled,
                entry: specs,
                outputFile: 'specs.js',
                cssModules: cssModules
              });

              // Create the development server.

              app = (0, _webpackDevServer2.default)(config, { proxy: proxy });

              app.use('/', _express2.default.static(_path2.default.resolve(__dirname, '../../public')));

              // Create an end-point to serve images and CSS from.
              app.use(images.baseUrl, _express2.default.static(_path2.default.join(ROOT_PATH, images.dir)));
              app.use(css.baseUrl, _express2.default.static(_path2.default.join(ROOT_PATH, css.dir)));

              // Start the server.
              _log2.default.info('\n');
              _log2.default.info(_chalk2.default.grey('Starting (' + env + ')...'));
              app.listen(port, function () {
                // Server details.
                var reactJson = require(_path2.default.join(_paths.REACT_PATH, 'package.json'));
                var moduleVersion = packageJson.version || '0.0.0';
                var packageName = _chalk2.default.magenta(packageJson.name);
                var packageVersion = _chalk2.default.grey('(v' + moduleVersion + ')');
                _log2.default.info();
                _log2.default.info(_chalk2.default.green('UIHarness' + _chalk2.default.grey('@') + _chalk2.default.grey(_package2.default.version)));
                _log2.default.info(_chalk2.default.grey(' - module:   '), packageName, packageVersion);
                _log2.default.info(_chalk2.default.grey(' - port:     '), port);
                _log2.default.info(_chalk2.default.grey(' - react:    '), 'v' + reactJson.version);
                if (isRelayEnabled) {
                  _log2.default.info(_chalk2.default.grey(' - graphql:  '), displayPath(graphqlSchema));
                }
                // Specs.
                _log2.default.info(_chalk2.default.grey(' - specs:    '), displayPath(specs[0]) || _chalk2.default.magenta('None.'));
                _ramda2.default.takeLast(specs.length - 1, specs).forEach(function (path) {
                  _log2.default.info(_chalk2.default.grey('             '), displayPath(path));
                });

                // Images.
                _log2.default.info(_chalk2.default.grey(' - images:   '), _chalk2.default.grey(images.baseUrl + ' =>'), images.dir);

                // Proxy.
                if (YAML_CONFIG.proxy) {
                  var formatProxy = function formatProxy(item) {
                    return _chalk2.default.grey(item.from, '=>') + ' ' + item.to;
                  };
                  var proxyItems = Object.keys(YAML_CONFIG.proxy).map(function (key) {
                    return { from: key, to: proxy[key] };
                  });
                  _log2.default.info(_chalk2.default.grey(' - proxy:    '), formatProxy(proxyItems[0]));
                  _ramda2.default.takeLast(proxyItems.length - 1, proxyItems).forEach(function (item) {
                    _log2.default.info(_chalk2.default.grey('             '), formatProxy(item));
                  });
                }

                // Finish up.
                _log2.default.info('');
                resolve({});
              });
              return _context.abrupt('return', undefined);

            case 35:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[17, 22]]);
    }))();
  });
};
//# sourceMappingURL=start.js.map