const { routeGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeGenerator(true, "/other", true, "1.0.0");

const countries = routeGenerator(
  "get",
  "/countries",
  200,
  "1.0.0",
  "Use for get countries for normal account"
);

const welcome = routeGenerator(
  "get",
  "/welcomeMessage",
  200,
  "1.0.0",
  "Use to get welcome message for client"
);

const otherRoutes = {
  info: {
    version: "1.0.0",
  },
  properties: { baseUrl, countries, welcome },
};

module.exports = { otherRoutes };
