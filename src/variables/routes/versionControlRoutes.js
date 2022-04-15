const { routeGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeGenerator(true, "/versionControl", true, "1.0.0");

const getAllStuffs = routeGenerator(
  "get",
  "/getAllStuff",
  200,
  "1.0.0",
  "Use for get all templates schemas and validators"
);

const versionControlRoutes = {
  properties: { baseUrl, getAllStuffs },

  info: { version: "1.0.0" },
};

module.exports = { versionControlRoutes };
