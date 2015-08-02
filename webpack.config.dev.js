"use strict";

var webpack = require("webpack");
var config = require("./webpack.config");

// **WARNING**: Mutates base configuration.
config.output.filename = "[name].js";
config.plugins = [
  new webpack.SourceMapDevToolPlugin("[file].map")
];

// Export mutated base.
module.exports = config;
