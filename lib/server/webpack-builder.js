'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _memoryFs = require('memory-fs');

var _memoryFs2 = _interopRequireDefault(_memoryFs);

var _filesize = require('filesize');

var _filesize2 = _interopRequireDefault(_filesize);

var _admZip = require('adm-zip');

var _admZip2 = _interopRequireDefault(_admZip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toSizeStats = function toSizeStats(text) {
  return {
    bytes: text.length,
    display: (0, _filesize2.default)(text.length)
  };
};

var getInfo = function getInfo(fsMemory, file) {
  // Read the generated javascript.
  var js = fsMemory.readFileSync(file);

  // Calculate the size of the JS when zipped.
  var zip = new _admZip2.default();
  zip.addFile('file.js', new Buffer(js));

  // Prepare stats.
  return {
    file: file,
    js: js,
    size: toSizeStats(js),
    zipped: toSizeStats(zip.toBuffer().toString('utf8'))
  };
};

/**
 * Builds the given Webpack configuration to memory.
 * @param {Object} config: The Webpack configuration object.
 * @return {Promise}.
 */

exports.default = function (config) {
  return new _bluebird2.default(function (resolve, reject) {
    // Prepare the webpack compiler.
    config = _ramda2.default.clone(config);
    var compiler = (0, _webpack2.default)(config);
    var fsMemory = compiler.outputFileSystem = new _memoryFs2.default();

    // Compile the JS.
    compiler.run(function (err, stats) {
      if (err) {
        reject(err); // Failed.
      } else {

        // Get info about each code chunk.
        var app = getInfo(fsMemory, _path2.default.join(config.output.path, config.output.filename));
        var vendor = getInfo(fsMemory, '/vendor.js');

        // Finish up.
        var msecs = stats.endTime - stats.startTime;
        resolve({
          buildTime: {
            msecs: msecs,
            secs: +(msecs / 1000).toFixed(1)
          },
          modules: { app: app, vendor: vendor }
        });
      }
    });
  });
};
//# sourceMappingURL=webpack-builder.js.map