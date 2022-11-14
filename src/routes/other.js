const { ioFieldMaker } = require("@/classes/IoFieldMaker");
const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const { ioFieldTypes } = require("@/variables/others/inputOutputFields");

const otherRouteBuilder = routeBuilder(baseUrls.other);

const getCountries = otherRouteBuilder
  .create()
  .method("get")
  .url("/countries")
  .statusCode(200)
  .inputFields([{}])
  .outputFields([
    {
      countries: ioFieldMaker
        .create()
        .type(ioFieldTypes.countries)
        .value([
          {
            countryCode: ioFieldMaker
              .create()
              .type(ioFieldTypes.countryCode)
              .build(),
            countryName: ioFieldMaker
              .create()
              .type(ioFieldTypes.countryName)
              .build(),
            countryShortName: ioFieldMaker
              .create()
              .type(ioFieldTypes.countryShortName)
              .build(),
          },
        ])
        .build(),
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
      message: ioFieldMaker.create().type(ioFieldTypes.message).build(),
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
