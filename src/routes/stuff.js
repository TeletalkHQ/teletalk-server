const { routeBuilder } = require("@/classes/RouteBuilder");

const { extractVersions, versionCalculator } = require("@/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const versionControlRouteBuilder = routeBuilder(baseUrls.stuff);

const getAllStuffs = versionControlRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/getAllStuff")
  .statusCode(200)
  .inputFields({
    language: fields.single.language,
  })
  .build();

const routes = {
  getAllStuffs,
};

const stuff = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { stuff };
