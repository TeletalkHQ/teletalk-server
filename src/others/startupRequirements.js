const startupRequirements = () => {
  require("@/variables/others/customGlobals");
  require("@/functions/helpers/requireDotenv").requireDotenv();
  require("@/classes/AppConfigs");
  require("@/database/databaseConnector").databaseConnector();
};

module.exports = { startupRequirements };
