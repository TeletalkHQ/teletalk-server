const { Router } = require("express");

const { controllers } = require("@/http/controllers");

const { routes } = require("@/http/routes");

const otherRouter = Router();

otherRouter[routes.other.getWelcomeMessage.method](
  routes.other.getWelcomeMessage.url,
  controllers.getWelcomeMessage
);

module.exports = { otherRouter };
