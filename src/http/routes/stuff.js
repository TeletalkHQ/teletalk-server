const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const { baseUrls } = require("@/http/routes/baseUrls");
const { fields } = require("@/http/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const stuffRouteBuilder = httpRouteBuilder(baseUrls.stuff);

const getAllStuffs = stuffRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/getAllStuff")
  .inputFields({
    language: fields.single.language,
  })
  .build();

const stuffRoutes = {
  getAllStuffs,
};

module.exports = { stuffRoutes };
