const { routeBuilder } = require("@/classes/Builders");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const versionControlBaseUrl = routeBuilder
  .create()
  .url("/versionControl")
  .baseUrl()
  .version("1.0.0")
  .build();

const getAllStuffsRoute = routeBuilder
  .create()
  .method("get")
  .url("/getAllStuff")
  .fullUrl()
  .statusCode(200)
  .version("1.0.0")
  .description(
    "Use for get all routes, models, validation models, errors and more"
  )
  .inputFields([{}])
  .outputFields([{}])
  .build();

const routes = { versionControlBaseUrl, getAllStuffsRoute };

const versionControlRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { versionControlRoutes };
