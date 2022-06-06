const { routeBuilder } = require("@/functions/helpers/Builder");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const versionControlBaseUrl = routeBuilder
  .create()
  .url("/versionControl")
  .version("1.0.0")
  .build();

const getAllStuffsRoute = routeBuilder
  .create()
  .method("get")
  .url("/getAllStuff")
  .statusCode(200)
  .version("1.0.0")
  .description(
    "Use for get all routes, models, validation models, errors and more"
  )
  .build();

const routes = { versionControlBaseUrl, getAllStuffsRoute };

const versionControlRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { versionControlRoutes };
