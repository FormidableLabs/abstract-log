"use strict";

var webpack = require("webpack");
var path = require("path");
var meta = require("./meta");

module.exports = {
  cache: true,
  entry: path.join(__dirname, "lib/index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: meta.FILE_NAME + ".min.js",
    library: meta.LIB_NAME,
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
