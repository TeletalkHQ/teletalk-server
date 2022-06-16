const { routeBuilder } = require("@/classes/Builders");

const {
  versionCalculator,
  extractVersions,
  addFullUrlToRouteObjects,
} = require("@/functions/utilities/utils");
const { inputOutputFields } = require("@/variables/others/initialOptions");

const { countries, countryShortName, countryName, countryCode } =
  inputOutputFields;

const otherRouteBaseUrl = routeBuilder
  .create()
  .url("/other")
  .version("1.0.0")
  .build();

const countriesRoute = routeBuilder
  .create()
  .method("get")
  .url("/countries")
  .statusCode(200)
  .inputFields([{}])
  .outputFields([
    {
      [countries]: [{ countryShortName, countryName, countryCode }],
    },
  ])
  .version("1.0.0")
  .description("Use for get countries for normal account")
  .build();

const welcomeRoute = routeBuilder
  .create()
  .method("get")
  .url("/welcomeMessage")
  .statusCode(200)
  .version("1.0.0")
  .description("Use to get welcome message for client")
  .build();

const routes = addFullUrlToRouteObjects(otherRouteBaseUrl, {
  otherRouteBaseUrl,
  countriesRoute,
  welcomeRoute,
});

const otherRoutes = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = { otherRoutes };
