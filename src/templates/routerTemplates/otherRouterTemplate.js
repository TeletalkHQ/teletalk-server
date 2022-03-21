const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(true, "/other", true, "1.0.0");

const welcome = routeTemplateGenerator(
  "get",
  "/welcomeMessage",
  200,
  "1.0.0",
  "Use to get welcome message for client"
);

const otherRouterTemplate = {
  baseUrl,
  version: "1.0.0",
  welcome,
};

module.exports = { otherRouterTemplate };
