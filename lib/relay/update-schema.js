'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _util = require('js-util/lib/util');

var _graphql = require('graphql');

var _utilities = require('graphql/utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Updates the schema at the given path.
 *
 * @param {String} schemaPath: The absolute path to the schema JS file to build.
 *                             The file must export a { Schema } field.
 *
 * @param {String} outputDir: The absolute directory to save the file to.
 *
 * @param {String} outputFile: The name of the files (.json and .graphql) to wirte.
 *                             Default: 'schema'.
 *
 */
exports.default = function (schemaPath, outputDir) {
  var outputFile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'schema';
  return new Promise(function (resolve, reject) {

    // Setup initial conditions.
    if ((0, _util.isBlank)(outputDir)) {
      reject(new Error('An output directory was not specified'));
      return;
    }
    var paths = {
      json: outputDir + '/' + outputFile + '.json',
      graphql: outputDir + '/' + outputFile + '.graphql'
    };

    // Ensure the schema exists.
    if (!_fsExtra2.default.existsSync(schemaPath)) {
      reject(new Error('A schema at the path \'' + schemaPath + '\' does not exist.'));
      return;
    }
    var Schema = require(schemaPath).Schema;
    if (!(Schema instanceof _graphql.GraphQLSchema)) {
      reject(new Error('The module at the path \'' + schemaPath + '\' does not expose a {Schema}.'));
      return;
    }

    _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var jsonResult, error;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _graphql.graphql)(Schema, _utilities.introspectionQuery);

            case 2:
              jsonResult = _context.sent;

              if (!jsonResult.errors) {
                _context.next = 8;
                break;
              }

              error = new Error('Failed while introspecting schema.');

              error.errors = jsonResult.errors;
              reject(error);
              return _context.abrupt('return');

            case 8:
              _fsExtra2.default.outputFileSync(paths.json, JSON.stringify(jsonResult, null, 2));

              // Save user readable type system shorthand of schema.
              _fsExtra2.default.outputFileSync(paths.graphql, (0, _utilities.printSchema)(Schema));

              // Finish up.
              resolve({ paths: paths });

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }))();
  });
};
//# sourceMappingURL=update-schema.js.map