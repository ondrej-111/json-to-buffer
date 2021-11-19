const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src/index.ts"),
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "json-to-buffer",
    clean: true,
  },
  target: "node",
  module: {
    rules: [
      {
        use: "ts-loader",
        resolve: {
          extensions: [".ts"],
        },
        exclude: /node_modules/,
      },
    ],
  },
  mode: "production",
  watch: false,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: [
      path.resolve(__dirname, "dist"),
      path.resolve(__dirname, "node_modules"),
    ],
  },
};
