const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const versionControlBaseUrl = routeGenerator(
  true,
  "/versionControl",
  true,
  "1.0.0"
);

const getAllStuffsRoute = routeGenerator(
  "get",
  "/getAllStuff",
  200,
  "1.0.0",
  "Use for get all templates schemas and validators"
);

const routes = { versionControlBaseUrl, getAllStuffsRoute };

const versionControlRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { versionControlRoutes };
