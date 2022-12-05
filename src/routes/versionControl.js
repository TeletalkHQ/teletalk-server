const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const { fields } = require("@/routes/fields");

const versionControlRouteBuilder = routeBuilder(baseUrls.versionControl);

const getAllStuffs = versionControlRouteBuilder
  .create()
  .method("post")
  .url("/getAllStuff")
  .statusCode(200)
  .inputFields({
    language: fields.single.language,
  })
  .build();

const routes = {
  getAllStuffs,
};

const versionControlRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { versionControl: versionControlRoutes };
