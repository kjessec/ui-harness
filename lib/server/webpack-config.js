'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _paths = require('./paths');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE_MODULES_PATH = _path2.default.join((0, _paths.rootModulePath)(), 'node_modules');
var UIHARNESS_ENTRY = _path2.default.join(__dirname, '../client/ui-harness');

// HACK (Relay).
//       Prevent error with `fetch` which attempts to look for a `self` object.
//       This occurs when parsing the `react-relay` module on the server while compiling.
global.self = { fetch: null };

var productionEnvPlugin = new _webpack2.default.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

var babelLoader = function babelLoader(extension, isRelayEnabled) {
  var loader = {
    // See: https://github.com/babel/babel-loader#options
    loaders: ['babel'],
    test: extension,
    exclude: /(node_modules|bower_components)/
  };

  // Add optional plugins.
  if (isRelayEnabled) {
    loader.loaders[0] += '?plugins[]=' + _path2.default.join(__dirname, '../relay/babel-relay-plugin');
  }

  // Finish up.
  return loader;
};

var typescriptLoader = function typescriptLoader(extension, isRelayEnabled) {
  // Extend existing config
  var loader = babelLoader(extension, isRelayEnabled);

  // Add typescript loader
  loader.loaders.push('awesome-typescript-loader');

  return loader;
};

/**
 * Creates a Webpack compiler instance.
 *
 * @param {Object} options:
 *            -- entry:           Array of entry paths.
 *            -- isProduction:    Flag indicating if the builder is in production mode.
 *                                Default: false.
 *
 *            -- outputFile:      The name of the output file.
 *                                Default: 'bundle.js'.
 *
 *            -- isRelayEnabled:  Flag indicating if relay is being used.
 *                                Default: false.
 *
 *            -- vendor:          An array of vendor modules or entry paths.
 *                                Pass empty-array for no vendor modules
 *                                otherwise the default set of vendors is included.
 *
 *            -- cssModules:      An array of regular expressions.
 *                                Default: undefined.
 *
 * @return {Object} compiler.
 */

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var isProduction = options.isProduction || false;
  var outputFile = options.outputFile || 'bundle.js';
  var isRelayEnabled = options.isRelayEnabled || false;

  if (!_paths.REACT_PATH) {
    throw new Error('The path to the `react` module was not found. Make sure it is installed');
  }

  var vendor = options.vendor;
  if (vendor === undefined) {
    vendor = ['react', 'react-dom', 'react-relay', UIHARNESS_ENTRY];
  }

  var config = {
    entry: {
      app: options.entry,
      vendor: vendor
    },
    output: { path: '/', filename: outputFile },
    module: {
      loaders: [babelLoader(/\.js$/, isRelayEnabled), babelLoader(/\.jsx$/, isRelayEnabled), typescriptLoader(/\.tsx?$/, isRelayEnabled), { test: /\.json$/, loader: 'json' }, { test: /\.(png|svg)$/, loader: 'url-loader' },

      // kjessec; font loader
      { test: /\.woff$/, loader: 'url?mimetype=application/octet-stream&name=public/fonts/[name].[ext]' }]
    },
    devtool: isProduction ? undefined : 'cheap-module-eval-source-map',
    resolve: {
      moduleDirectories: NODE_MODULES_PATH,
      extensions: [''].concat(options.extensions || ['.web.tsx', '.web.ts', '.web.js', '.web.jsx', '.js', '.jsx', '.json', '.ts', '.tsx']),
      resolveLoader: { fallback: NODE_MODULES_PATH },
      alias: {
        react: _paths.REACT_PATH }
    },
    plugins: [
    // Remove duplicate code.
    //    See - https://github.com/webpack/docs/wiki/optimization#deduplication
    new _webpack2.default.optimize.DedupePlugin(),

    // [Moment.js] only load subset of locales to reduce size.
    //    See - http://stackoverflow.com/a/25426019/1745661
    new _webpack2.default.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),

    // Break out common libs into their own code-chunk.
    //    See - https://webpack.github.io/docs/code-splitting.html#split-app-and-vendor-code
    new _webpack2.default.optimize.CommonsChunkPlugin({ name: 'vendor', path: '/', filename: 'vendor.js' })]
  };

  // Configure CSS loaders
  var loaders = config.module.loaders;
  var cssModules = options.cssModules;

  var simpleCssLoader = { test: /\.css$/, loader: 'style!css' };
  if (cssModules) {
    var simpleLoaderAdded = false;
    cssModules.forEach(function (test) {
      loaders.push({
        test: test,
        loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'],
        exclude: /node_modules/

      });
      if (test.toString() === simpleCssLoader.test.toString()) {
        simpleLoaderAdded = true;
      }
    });

    // added: postcss plugins for webpack1
    config.postcss = function () {
      return [require('precss'), require('autoprefixer')];
    };

    // Add the simple CSS loader if the extension was not included for css-module's.
    if (!simpleLoaderAdded) {

      /*
      We need to exclude all paths meant for css modules from the standard css parser, otherwise
      webpack will run the module code through both matches, which results in the JS being parsed
      as CSS. Eek!
        To do this, we need to "exclude" all the css modules regexes from the standard css regex. We
      can do this using negative lookups.
        General regex form: /^((?![css_sources joined with |]).)*.[standard_css_source]$/
      Explanation:
      ^ -   need to assert start of string otherwise our negative lookup won't work
      ?! -  negative lookup - don't match what's in this matching group (i.e. parenthesis)
      [css_sources] -   the regexes *not* to match
      | -   a way to join sources as to not match *any* of them
      . -   match any other character, i.e. normal file names with dashes etc.
      * -   match this "non-matching" group as many times as necessary
      [standard_css_source] - our existing css file path
      $ -   need to match end of string for same reason as above
        Refs
      ----
      https://github.com/css-modules/css-modules/pull/65
      http://stackoverflow.com/questions/2078915/a-regular-expression-to-exclude-a-word-stringify
      https://regex101.com/r/gL5lR9/1 (regex tester made to test this code)
      */

      // We need to extract the regex part inside the // markers - i.e. don't use the string
      // representation
      var sources = cssModules.map(function (test) {
        return test.source;
      });
      var simpleRegexWithoutModule = new RegExp('^((?!' + sources.join('|') + ').)*' + simpleCssLoader.test.source);

      // Push the new loader onto the list of loaders, but with a different test.
      loaders.push(_extends({}, simpleCssLoader, {
        test: simpleRegexWithoutModule
      }));
    }
  } else {
    // Add simple CSS loader (default).
    loaders.push(simpleCssLoader);
  }

  // Configure optional plugins.
  //    See - https://webpack.github.io/docs/list-of-plugins.html
  //        - https://github.com/webpack/docs/wiki/optimization
  //
  var addPlugin = function addPlugin(flag, plugin) {
    if (flag === true) {
      config.plugins.push(plugin);
    }
  };
  addPlugin(isProduction, new _webpack2.default.optimize.UglifyJsPlugin({ minimize: true }));
  addPlugin(isProduction, new _webpack2.default.optimize.OccurrenceOrderPlugin(true));
  addPlugin(isProduction, productionEnvPlugin);

  // Finish up.
  return config;
};
//# sourceMappingURL=webpack-config.js.map