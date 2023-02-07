const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { routeBuilder } = require("@/classes/RouteBuilder");

const unknownRoute = routeBuilder(`/${randomMaker.string(10)}`)
  .create()
  .url(`/${randomMaker.string(10)}`)
  .statusCode(404)
  .build();

const test = { unknownRoute };

module.exports = { test };
