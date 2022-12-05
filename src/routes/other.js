const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const otherRouteBuilder = routeBuilder(baseUrls.other);

const getCountries = otherRouteBuilder
  .create()
  .method(METHODS.GET)
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
  .method(METHODS.GET)
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
