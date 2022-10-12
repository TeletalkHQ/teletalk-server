const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const testRouteBuilder = routeBuilder(baseUrls.test);

const getAllUsers = testRouteBuilder
  .create()
  .method("get")
  .url("/getAllUsers")
  .statusCode(200)
  .version("1.0.0")
  .build();

const routes = {
  getAllUsers,
};

const testRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { testRoutes };
