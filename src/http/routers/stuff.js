const { Router } = require("express");

const { controllers } = require("@/http/controllers");

const { routes } = require("@/http/routes");

const stuffRouter = Router();

stuffRouter[routes.stuff.getAllStuffs.method](
  routes.stuff.getAllStuffs.url,
  controllers.getAllStuff
);

module.exports = { stuffRouter };
