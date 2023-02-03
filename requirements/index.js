require("module-alias/register");
require("@/variables/others/customGlobals");
require("@/helpers/requireDotenv").requireDotenv();

const { mainServer } = require("./mainServer");
const { testServer } = require("./testServer");

module.exports = {
  mainServer,
  testServer,
};
