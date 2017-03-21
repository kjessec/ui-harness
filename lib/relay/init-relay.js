'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _updateSchema = require('./update-schema');

var _updateSchema2 = _interopRequireDefault(_updateSchema);

var _paths = require('../server/paths');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ROOT_PATH = (0, _paths.rootModulePath)();

/**
 * Initializes Relay, ensuring the GraphQL [schema.json] exists and
 * the relay-babel plugin has access to it.
 *
 * @param {String} schemaPath:  The absolute path to the GraphQL
 *                              `schema.js` or `schema.json` file.
 *
 * @return {Promise}.
 */

exports.default = function (schemaPath) {
    return new _bluebird2.default(function (resolve, reject) {
        _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            var msg, isJson, dir, file, jsonPath;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            // Resolve to an absolute path.
                            schemaPath = schemaPath.startsWith('.') ? _path2.default.join(ROOT_PATH, schemaPath) : schemaPath;

                            // Ensure the schema exists.

                            if (_fsExtra2.default.existsSync(schemaPath)) {
                                _context.next = 5;
                                break;
                            }

                            msg = 'The GraphQL JS schema file path \'' + schemaPath + '\' does not exist.';

                            reject(new Error(msg));
                            return _context.abrupt('return');

                        case 5:

                            // Extract path information.
                            isJson = schemaPath.endsWith('.json');
                            dir = _path2.default.dirname(schemaPath);
                            file = _path2.default.basename(schemaPath, isJson ? '.json' : '.js');
                            jsonPath = _path2.default.join(dir, file + '.json');

                            // Ensure the [schema.json] exists.

                            if (!(!isJson && !_fsExtra2.default.existsSync(jsonPath))) {
                                _context.next = 19;
                                break;
                            }

                            _context.prev = 10;
                            _context.next = 13;
                            return (0, _updateSchema2.default)(schemaPath, dir, file);

                        case 13:
                            _context.next = 19;
                            break;

                        case 15:
                            _context.prev = 15;
                            _context.t0 = _context['catch'](10);

                            reject(_context.t0);
                            return _context.abrupt('return');

                        case 19:

                            // Initialize the plugin with the path to the [schema.json].

                            // HACK:  Store the path to the GraphQL Schema in a global variable.
                            //        This is so the path can be dynamically set for the `babel-relay-plugin`
                            //        and not hard-coded, which is the only way the Realy samples show how this works.
                            //        There is no apparent way to pass an actual instance of the `babel-relay-plugin`
                            //        (with the schema path dynamically set) into the WebPack babel-loader.
                            global.__relayPluginSchemaJsonPath = jsonPath;
                            require('./babel-relay-plugin');

                            // Finish up.
                            resolve({ jsonPath: jsonPath });

                        case 22:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[10, 15]]);
        }))();
    });
};
//# sourceMappingURL=init-relay.js.map