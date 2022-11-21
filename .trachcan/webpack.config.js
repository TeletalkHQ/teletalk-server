const path = require("path");

const nodeExternals = require("webpack-node-externals");

const srcPath = path.join(__dirname, "src");

module.exports = {
  externals: [nodeExternals()],
  // externals: {
  //   bufferutil: "bufferutil",
  //   "utf-8-validate": "utf-8-validate",
  //   "mongodb-client-encryption": "mongodb-client-encryption",
  // },
  externalsPresets: {
    node: true,
  },
  mode: "development",
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  target: "node",
};
