const { routeBuilder } = require("@/classes/RouteBuilder");
const { ioFieldMaker } = require("@/classes/IoFieldMaker");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const { ioFieldTypes } = require("@/variables/others/inputOutputFields");

const versionControlRouteBuilder = routeBuilder(baseUrls.versionControl);

const getAllStuffs = versionControlRouteBuilder
  .create()
  .method("post")
  .url("/getAllStuff")
  .statusCode(200)
  .version("1.0.0")
  .description(
    "Use for get all routes, models, validation models, errors and more"
  )
  .inputFields([
    {
      language: ioFieldMaker.create().type(ioFieldTypes.language).build(),
    },
  ])
  .outputFields([{}])
  .build();

const routes = {
  getAllStuffs,
};

const versionControlRoutes = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { versionControl: versionControlRoutes };
