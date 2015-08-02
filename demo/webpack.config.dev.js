/*globals __dirname:false */
"use strict";

var webpack = require("webpack");

module.exports = {

  devServer: {
    contentBase: __dirname,
    noInfo: false
  },

  output: {
    path: __dirname,
    filename: "main.js",
    publicPath: "/assets/"
  },

  cache: true,
  devtool: "source-map",
  entry: {
    app: ["./demo/app.js"]
  },
  stats: {
    colors: true,
    reasons: true
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
