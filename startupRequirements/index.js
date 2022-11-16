//! This order is important ==>
require("module-alias/register");
require("@/variables/others/customGlobals");
require("@/functions/helpers/requireDotenv").requireDotenv();
//! This order is important <==

const { mainServer } = require("~/startupRequirements/mainServer");
const { testServer } = require("~/startupRequirements/testServer");

module.exports = {
  mainServer,
  testServer,
};
