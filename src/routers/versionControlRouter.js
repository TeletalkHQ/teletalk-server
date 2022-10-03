const { Router } = require("express");

const { controllers } = require("@/controllers/controllers");

const {
  versionControlRoutes,
} = require("@/variables/routes/versionControlRoutes");

const versionControlRouter = Router();

const { getAllStuffsRoute } = versionControlRoutes;

versionControlRouter[getAllStuffsRoute.method](
  getAllStuffsRoute.url,
  controllers.getAllStuff
);

module.exports = { versionControlRouter };
