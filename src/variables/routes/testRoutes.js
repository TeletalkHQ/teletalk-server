const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
  extractFromInfo,
} = require("@/functions/utilities/utilsNoDeps");

const testBaseUrl = routeGenerator(true, "/test", true, "1.0.0");

const getAllUsersRoute = routeGenerator("get", "getAllUsers", 200, "1.0.0");

const routes = {
  testBaseUrl,
  getAllUsersRoute,
};

const testRoutes = {
  properties: routes,

  info: {
    version: versionCalculator(extractVersions(extractFromInfo(routes))),
  },
};

module.exports = { testRoutes };
