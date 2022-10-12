const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const versionControlRouteBuilder = routeBuilder(baseUrls.versionControl);

const getAllStuffs = versionControlRouteBuilder
  .create()
  .method("get")
  .url("/getAllStuff")
  .statusCode(200)
  .version("1.0.0")
  .description(
    "Use for get all routes, models, validation models, errors and more"
  )
  .inputFields([{}])
  .outputFields([{}])
  .build();

const routes = {
  getAllStuffs,
};

const versionControlRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { versionControlRoutes };
