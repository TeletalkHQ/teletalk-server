const npm_package = require("./package.json");

console.log(npm_package._moduleAliases);
module.exports = {
  resolve: {
    alias: npm_package._moduleAliases || {},
  },
};
