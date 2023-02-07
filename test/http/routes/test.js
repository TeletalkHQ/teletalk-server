const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { httpRouteBuilder } = require("@/classes/RouteBuilder");

const unknownRoute = httpRouteBuilder(`/${randomMaker.string(10)}`)
  .create()
  .url(`/${randomMaker.string(10)}`)
  .statusCode(404)
  .build();

const test = { unknownRoute };

module.exports = { test };
