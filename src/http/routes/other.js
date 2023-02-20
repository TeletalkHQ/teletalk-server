const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const { baseUrls } = require("@/http/routes/baseUrls");
const { fields } = require("@/variables/others/fields");

const { METHODS } = require("@/variables/others/methods");

const otherRouteBuilder = httpRouteBuilder(baseUrls.other);

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
  getWelcomeMessage,
};

module.exports = { otherRoutes };
