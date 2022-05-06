const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
  extractFromInfo,
} = require("@/functions/utilities/utilsNoDeps");

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
  properties: routes,

  info: {
    version: versionCalculator(extractVersions(extractFromInfo(routes))),
  },
};

module.exports = { versionControlRoutes };
