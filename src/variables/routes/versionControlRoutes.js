const { routeBuilder } = require("@/classes/Builders");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utils");

const versionControlRouteBuilder = routeBuilder("/versionControl");

const versionControlBaseUrl = versionControlRouteBuilder
  .create()
  .baseUrlObject("1.0.0");

const getAllStuffsRoute = versionControlRouteBuilder
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
  getAllStuffsRoute,
  versionControlBaseUrl,
};

const versionControlRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { versionControlRoutes };
