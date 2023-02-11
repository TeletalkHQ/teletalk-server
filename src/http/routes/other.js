const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const { baseUrls } = require("@/http/routes/baseUrls");
const { fields } = require("@/http/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const otherRouteBuilder = httpRouteBuilder(baseUrls.other);

const getCountries = otherRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getCountries")
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
  .outputFields([
    {
      welcomeMessage: fields.single.welcomeMessage,
    },
  ])
  .build();

const otherRoutes = {
  getCountries,
  getWelcomeMessage,
};

module.exports = { otherRoutes };
