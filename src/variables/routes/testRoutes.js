const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const testRouteBuilder = routeBuilder("/test");

const testBaseUrl = testRouteBuilder.create().baseUrlObject("1.0.0");

const getAllUsersRoute = testRouteBuilder
  .create()
  .method("get")
  .url("/getAllUsers")
  .statusCode(200)
  .version("1.0.0")
  .build();

const routes = {
  testBaseUrl,
  getAllUsersRoute,
};

const testRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { testRoutes };
