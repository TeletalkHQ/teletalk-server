const { routeBuilder } = require("@/classes/RouteBuilder");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const stuffRouteBuilder = routeBuilder(baseUrls.stuff);

const getAllStuffs = stuffRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/getAllStuff")
  .statusCode(200)
  .inputFields({
    language: fields.single.language,
  })
  .build();

const stuffRoutes = {
  getAllStuffs,
};

module.exports = { stuffRoutes };
