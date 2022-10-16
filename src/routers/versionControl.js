const { Router } = require("express");

const { controllers } = require("@/controllers");

const { routes } = require("@/routes");

const versionControlRouter = Router();

versionControlRouter[routes.versionControl.getAllStuffs.method](
  routes.versionControl.getAllStuffs.url,
  controllers.getAllStuff
);

module.exports = { versionControlRouter };
