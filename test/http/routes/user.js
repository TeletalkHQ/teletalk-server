const { routeBuilder } = require("@/classes/RouteBuilder");

const { baseUrls } = require("$/http/routes/baseUrls");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = routeBuilder(baseUrls.user);

const getAllUsers = userRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getAllUsers")
  .statusCode(200)
  .build();

const userRoutes = {
  getAllUsers,
};

module.exports = {
  user: userRoutes,
};
