"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const serviceRegistry = require("service-registry-library");

module.exports = () => {
  const statusCheckPollDuration = 15;
  return serviceRegistry.register("categories-api-specs", statusCheckPollDuration)
    .then(port => {
      const config = {
        entry: ["mocha-loader!./spec/index.js"],
        devServer: {
          host: "localhost",
          port: port
        },
        devtool: "inline-sourcemap",
        plugins: [new HtmlWebpackPlugin({
          filename: "specs.html"
        })],
        module: {
          rules: [{
            test: /\.js/,
            exclude: /node_modules/,
            use: [{
              loader: "babel-loader"
            }]
          }, {
            test: /\.json/,
            exclude: /node_modules/,
            use: [{
              loader: "json-loader"
            }]
          }]
        }
      };
      return config;
    })
    .catch(error => {
      console.log(error);
    });
};
