'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new WebpackDevServer.
 *
 * @param {Object} config: The Webpack configuration object.
 *
 * @param {Object} options:
 *                   -- proxy:  Optional. An object containing { path, host }
 *                              mappings to proxy server requests to.
 *                              (https://webpack.github.io/docs/webpack-dev-server.html#proxy)
 *
 * @return The dev-server instance.
 */
exports.default = function (config) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var compiler = (0, _webpack2.default)(config);
  var settings = {
    noInfo: true, // Lower the noise in the console.
    contentBase: '/public/',
    proxy: options.proxy,
    publicPath: '/js/',
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false
    }
  };

  // Finish up.
  return new _webpackDevServer2.default(compiler, settings);
};
//# sourceMappingURL=webpack-dev-server.js.map