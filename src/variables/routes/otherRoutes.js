const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
  extractFromInfo,
} = require("@/functions/utilities/utilsNoDeps");

const otherRouteBaseUrl = routeGenerator(true, "/other", true, "1.0.0");

const countriesRoute = routeGenerator(
  "get",
  "/countries",
  200,
  "1.0.0",
  "Use for get countries for normal account"
);

const welcomeRoute = routeGenerator(
  "get",
  "/welcomeMessage",
  200,
  "1.0.0",
  "Use to get welcome message for client"
);

const routes = { otherRouteBaseUrl, countriesRoute, welcomeRoute };

const otherRoutes = {
  info: {
    version: versionCalculator(extractVersions(extractFromInfo(routes))),
  },
  properties: routes,
};

module.exports = { otherRoutes };
