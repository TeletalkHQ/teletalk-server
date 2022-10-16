const { Router } = require("express");

const { controllers } = require("@/controllers");

const { routes } = require("@/routes");

const otherRouter = Router();

otherRouter[routes.other.getWelcomeMessage.method](
  routes.other.getWelcomeMessage.url,
  controllers.getWelcomeMessage
);

otherRouter[routes.other.getCountries.method](
  routes.other.getCountries.url,
  controllers.getCountries
);

module.exports = { otherRouter };
