const { routeBuilder } = require("@/classes/Builders");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const testBaseUrl = routeBuilder
  .create()
  .url("/test")
  .baseUrl()
  .version("1.0.0")
  .build();

const getAllUsersRoute = routeBuilder
  .create()
  .method("get")
  .url("/getAllUsers")
  .fullUrl()
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
