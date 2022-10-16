const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const {
  inputOutputFields: {
    countries,
    countryCode,
    countryName,
    countryShortName,
    message,
  },
} = require("@/variables/others/inputOutputFields");

const otherRouteBuilder = routeBuilder(baseUrls.other);

const getCountries = otherRouteBuilder
  .create()
  .method("get")
  .url("/countries")
  .statusCode(200)
  .inputFields([{}])
  .outputFields([
    {
      [countries]: [
        {
          countryCode,
          countryName,
          countryShortName,
        },
      ],
    },
  ])
  .version("1.0.0")
  .description("Use for get countries for normal account")
  .build();

const getWelcomeMessage = otherRouteBuilder
  .create()
  .method("get")
  .url("/welcomeMessage")
  .statusCode(200)
  .version("1.0.0")
  .description("Use to get welcome message for client")
  .inputFields([{}])
  .outputFields([
    {
      message,
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
