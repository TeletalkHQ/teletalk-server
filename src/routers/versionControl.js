const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

const { routes } = require("@/routes/routes");

const versionControlRouter = Router();

versionControlRouter[routes.versionControl.getAllStuffs.method](
  routes.versionControl.getAllStuffs.url,
  controllers.getAllStuff
);

module.exports = { versionControlRouter };
