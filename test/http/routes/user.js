const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const { baseUrls } = require("$/http/routes/baseUrls");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = httpRouteBuilder(baseUrls.user);

const getAllUsers = userRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getAllUsers")
  .build();

const userRoutes = {
  getAllUsers,
};

module.exports = {
  user: userRoutes,
};
