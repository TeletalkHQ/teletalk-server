//! This order is important ==>
require("module-alias/register");
require("@/variables/others/customGlobals");
require("@/helpers/requireDotenv").requireDotenv();
//! This order is important <==

const { mainServer } = require("./mainServer");
const { testServer } = require("./testServer");

module.exports = {
  mainServer,
  testServer,
};
