const { Router } = require("express");

const { controllers } = require("@/controllers");

const { routes } = require("@/routes");

const stuffRouter = Router();

stuffRouter[routes.stuff.getAllStuffs.method](
  routes.stuff.getAllStuffs.url,
  controllers.getAllStuff
);

module.exports = { stuffRouter };
