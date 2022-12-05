const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const otherRouteBuilder = routeBuilder(baseUrls.other);

const getCountries = otherRouteBuilder
  .create()
  .method("get")
  .url("/getCountries")
  .statusCode(200)
  .outputFields([
    {
      countries: fields.statics.array(fields.collection.country),
    },
  ])
  .build();

const getWelcomeMessage = otherRouteBuilder
  .create()
  .method("get")
  .url("/welcomeMessage")
  .statusCode(200)
  .outputFields([
    {
      welcomeMessage: fields.single.welcomeMessage,
    },
  ])
  .build();

const routes = {
  getCountries,
  getWelcomeMessage,
};

const other = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = { other };
