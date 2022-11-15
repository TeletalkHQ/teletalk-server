//! This order is important ==>
require("module-alias/register");
require("@/variables/others/customGlobals");
require("@/functions/helpers/requireDotenv").requireDotenv();
//! This order is important <==

const {
  mainServerRequirements,
} = require("~/startupRequirements/mainServerRequirements");
const {
  testServerRequirements,
} = require("~/startupRequirements/testServerRequirements");

module.exports = {
  mainServerRequirements,
  testServerRequirements,
};
