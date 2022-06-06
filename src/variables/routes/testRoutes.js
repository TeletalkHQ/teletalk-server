const { routeBuilder } = require("@/functions/helpers/Builder");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const testBaseUrl = routeBuilder.create().url("/test").version("1.0.0").build();

const getAllUsersRoute = routeBuilder
  .create()
  .method("get")
  .url("getAllUsers")
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
