const { routeBuilder } = require("@/classes/Builders");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

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
