const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(true, "/versionControl", "1.0.0");

const getAllStuffs = routeTemplateGenerator(
  "get",
  "/getAllStuff",
  "1.0.0",
  "Use for get all templates schemas and validators"
);

const versionControlRouterTemplate = {
  properties: { baseUrl, getAllStuffs },
  info: { version: "1.0.0" },
};

module.exports = { versionControlRouterTemplate };
