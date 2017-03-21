'use strict';

/*
  The path to the [schema.json] file is passed in within a temporarily stored
  global variables.

  See: [./init-relay] for more details on this.
*/
var getBabelRelayPlugin = require('babel-relay-plugin');

// Generate the plugin.
var schema = require(global.__relayPluginSchemaJsonPath);
module.exports = getBabelRelayPlugin(schema.data);
//# sourceMappingURL=babel-relay-plugin.js.map