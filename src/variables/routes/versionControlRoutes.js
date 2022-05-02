const { routeGenerator } = require("@/functions/utilities/generators");

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

const versionControlRoutes = {
  properties: { versionControlBaseUrl, getAllStuffsRoute },

  info: { version: "1.0.0" },
};

module.exports = { versionControlRoutes };
