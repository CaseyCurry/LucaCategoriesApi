"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    entry: ["mocha-loader!./spec/index.js"],
    devServer: {
      host: "localhost"
    },
    devtool: "inline-sourcemap",
    plugins: [new HtmlWebpackPlugin({
      filename: "specs.html"
    })],
    module: {
      rules: [{
        enforce: "pre",
        test: /\.js/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }, {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.json/,
        exclude: /node_modules/,
        loader: "json-loader"
      }]
    }
  };
};
