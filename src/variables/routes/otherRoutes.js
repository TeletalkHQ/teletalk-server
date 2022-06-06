const { routeBuilder } = require("@/functions/helpers/Builder");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const otherRouteBaseUrl = routeBuilder
  .create()
  .url("/other")
  .version("1.0.0")
  .build();

const countriesRoute = routeBuilder
  .create()
  .method("get")
  .url("/countries")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for get countries for normal account")
  .build();

const welcomeRoute = routeBuilder
  .create()
  .method("get")
  .url("/welcomeMessage")
  .statusCode(200)
  .version("1.0.0")
  .description("Use to get welcome message for client")
  .build();

const routes = { otherRouteBaseUrl, countriesRoute, welcomeRoute };

const otherRoutes = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = { otherRoutes };
