const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const testBaseUrl = routeGenerator(true, "/test", true, "1.0.0");

const getAllUsersRoute = routeGenerator("get", "getAllUsers", 200, "1.0.0");

const routes = {
  testBaseUrl,
  getAllUsersRoute,
};

const testRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { testRoutes };
