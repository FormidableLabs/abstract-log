"use strict";

var webpack = require("webpack");
var path = require("path");

module.exports = {
  cache: true,
  entry: {
    "abstract-log": path.join(__dirname, "lib/index.js"),
    "abstract-log.shim": path.join(__dirname, "lib/shim.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].min.js",
    library: "AbstractLog",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.SourceMapDevToolPlugin("[file].map")
  ]
};
