const { routeGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeGenerator(true, "/other", true, "1.0.0");

const welcome = routeGenerator(
  "get",
  "/welcomeMessage",
  200,
  "1.0.0",
  "Use to get welcome message for client"
);

const otherRoutes = {
  baseUrl,
  version: "1.0.0",
  welcome,
};

module.exports = { otherRoutes };
