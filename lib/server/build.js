'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _webpackBuilder = require('./webpack-builder');

var _webpackBuilder2 = _interopRequireDefault(_webpackBuilder);

var _webpackConfig = require('./webpack-config');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _paths = require('./paths');

var _log = require('../shared/log');

var _log2 = _interopRequireDefault(_log);

var _yamlConfig = require('./yaml-config');

var yamlConfig = _interopRequireWildcard(_yamlConfig);

var _initRelay = require('../relay/init-relay');

var _initRelay2 = _interopRequireDefault(_initRelay);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Builds the JS bundle.
 * @param {Object} buildConfig:
 a
 *            NOTE: If not specified, a configuraiton is looked for within the
 *                  projects [.uiharness.yml] file.
 *
 *            -- prod:          Flag indicating if the build should be minified.
 *                              Default: false.
 *            -- outputFolder:  (Optional) Path to the folder to save files to.
 *                              Default: `./build`
 *            -- modules:       Array of { name:entry-path } objects.
 *            -- vendor:        Array of vendor modules.
 *            -- graphqlSchema: The path to the GraphQL schema if relay is being used.
 *
 * @param {Object} options:
 *
 *           --silent: Flag indicating if log output should be suppressed.
 *                     Default: false.
 *
 */
exports.default = function (buildConfig) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new _bluebird2.default(function (resolve, reject) {

    // Setup initial conditions.
    var silent = options.silent;

    _log2.default.silent = silent || false;

    // Ensure there is a build-config.
    var config = yamlConfig.load();
    if (!buildConfig) {
      // Attempt to load the build-config from the YAML file.
      if (!config) {
        var err = 'No build configuration supplied and a `.uiharness.yml` file was not found.';
        _log2.default.error();
        _log2.default.error(_chalk2.default.red(err));
        _log2.default.error();
        reject(new Error(err));
        return;
      }
      buildConfig = config.build;
      if (!_ramda2.default.is(Object, buildConfig)) {
        var _err = 'The `.uiharness.yml` file must have a `build` section.';
        _log2.default.error();
        _log2.default.error(_chalk2.default.red(_err));
        _log2.default.error();
        reject(new Error(_err));
        return;
      }
    }

    // Prepare for GraphQL/Relay.
    var graphqlSchema = buildConfig.graphqlSchema || config.graphqlSchema;
    var isRelayEnabled = _ramda2.default.is(String, graphqlSchema);
    var prepareRelay = function prepareRelay() {
      return new _bluebird2.default(function (resolveRelay, rejectRelay) {
        if (isRelayEnabled) {
          // Ensure the relay babel-plugin knows about the GraphQL schema.
          (0, _initRelay2.default)(graphqlSchema).then(function () {
            return resolveRelay({});
          }).catch(function (err) {
            return rejectRelay(err);
          });
        } else {
          resolveRelay({}); // Relay is not enabled.
        }
      });
    };

    // Extract the vendor array.
    var vendor = buildConfig.vendor || [];
    var isProduction = buildConfig.prod || process.env.NODE_ENV === 'production' || false;
    var outputFolder = _path2.default.resolve(buildConfig.outputFolder || './.build');
    var extensions = config.extensions;

    // Initial message.
    var msg = 'Building javascript (' + (isProduction ? 'production' : 'development') + ')';
    _log2.default.info(_chalk2.default.grey(msg + '...\n'));

    var buildItem = function buildItem(filename, entry) {
      return new _bluebird2.default(function (resolveItem, rejectItem) {
        _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
          var itemConfig, stats, save;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  entry = (0, _paths.formatEntryPaths)(entry);

                  // Prepare the Webpack configuration.
                  itemConfig = (0, _webpackConfig2.default)({
                    isProduction: isProduction,
                    isRelayEnabled: isRelayEnabled,
                    entry: entry,
                    vendor: vendor,
                    outputFile: filename + '.js',
                    extensions: extensions
                  });

                  // Build the JS.

                  stats = void 0;
                  _context.prev = 3;
                  _context.next = 6;
                  return (0, _webpackBuilder2.default)(itemConfig);

                case 6:
                  stats = _context.sent;
                  _context.next = 13;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context['catch'](3);

                  rejectItem(_context.t0);
                  return _context.abrupt('return');

                case 13:
                  _context.prev = 13;

                  save = function save(file, js) {
                    _fsExtra2.default.outputFileSync(_path2.default.join(outputFolder, file), js.toString('utf8'));
                  };

                  save(filename + '.js', stats.modules.app.js);
                  save('vendor.js', stats.modules.vendor.js);
                  _context.next = 23;
                  break;

                case 19:
                  _context.prev = 19;
                  _context.t1 = _context['catch'](13);

                  rejectItem(_context.t1);
                  return _context.abrupt('return');

                case 23:

                  // Finish up.
                  resolveItem({ filename: filename, stats: stats, entry: entry });
                  return _context.abrupt('return');

                case 25:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined, [[3, 9], [13, 19]]);
        }))();
      });
    };

    var logModule = function logModule(filename, data, modules) {
      // General information.
      _log2.default.info('', _chalk2.default.blue(filename));
      _log2.default.info(_chalk2.default.grey('   - size:     '), data.size.display, _chalk2.default.grey('=>'), _chalk2.default.magenta(data.zipped.display), _chalk2.default.grey('zipped'), _chalk2.default.grey(isProduction ? '(minified)' : ''));

      // List modules/paths.
      modules = modules.map(function (item) {
        return (0, _paths.trimRootModulePath)(item);
      });
      _log2.default.info(_chalk2.default.grey('   - input:    '), modules[0] || _chalk2.default.magenta('None.'));
      _ramda2.default.takeLast(modules.length - 1, modules).forEach(function (item) {
        _log2.default.info(_chalk2.default.grey('               '), item);
      });

      // Output path.
      var outputPath = _path2.default.join(outputFolder, filename + '.js');
      _log2.default.info(_chalk2.default.grey('   - output:   '), (0, _paths.trimRootModulePath)(outputPath));
      _log2.default.info();
    };

    var logModules = function logModules(modules) {
      // Log each built module.
      modules.forEach(function (item) {
        logModule(item.filename, item.stats.modules.app, item.entry);
      });
      logModule('vendor', _ramda2.default.last(modules).stats.modules.vendor, vendor);
    };

    // Start building each item.
    var startBuilders = function startBuilders() {
      return Object.keys(buildConfig.modules).map(function (key) {
        return buildItem(key, buildConfig.modules[key]);
      });
    };

    prepareRelay().then(function () {
      return startBuilders();
    }).then(function (builders) {
      return _bluebird2.default.all(builders);
    }).then(function (results) {
      var secs = _ramda2.default.reduce(function (prev, curr) {
        return prev + curr.stats.buildTime.secs;
      }, 0, results);
      secs = +secs.toFixed(1);
      var files = results.map(function (item) {
        return _path2.default.join(outputFolder, item.filename + '.js');
      });

      // Log results.
      logModules(results, secs);
      _log2.default.info(_chalk2.default.green(secs + ' seconds'));

      // Save 'stats.json' object.
      var modules = results.reduce(function (acc, value) {
        var items = {};
        Object.keys(value.stats.modules).forEach(function (key) {
          var _value$stats$modules$ = value.stats.modules[key],
              file = _value$stats$modules$.file,
              size = _value$stats$modules$.size,
              zipped = _value$stats$modules$.zipped;

          items[key] = {
            file: file,
            size: size.display,
            zipped: zipped.display
          };
        });
        acc[value.filename] = {
          buildTime: value.stats.buildTime.secs + 's',
          files: items
        };
        return acc;
      }, {});
      _fsExtra2.default.writeJsonSync(_path2.default.join(outputFolder, 'stats.json'), {
        buildTime: secs + 's',
        modules: modules
      });

      // Finish up.
      resolve({ files: files, secs: secs });
    }).catch(function (err) {
      return reject(err);
    });
  });
};
//# sourceMappingURL=build.js.map