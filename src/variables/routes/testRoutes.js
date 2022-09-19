const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const testRouteBuilder = routeBuilder("/test");

const testBaseUrl = testRouteBuilder.create().createBaseUrlObject("1.0.0");

const getAllUsersRoute = testRouteBuilder
  .create()
  .method("get")
  .url("/getAllUsers")
  .statusCode(200)
  .version("1.0.0")
  .build();

const routes = {
  getAllUsersRoute,
  testBaseUrl,
};

const testRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { testRoutes };
