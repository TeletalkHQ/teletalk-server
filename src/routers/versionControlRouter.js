const { Router } = require("express");

const {
  getAllStuffVersionControlController,
} = require("~/controllers/versionControlControllers/getAllStuffVersionControlController");

const {
  versionControlRoutes,
} = require("~/variables/routes/versionControlRoutes");

const versionControlRouter = Router();

const {
  properties: {
    getAllStuffsRoute: { properties: getAllStuffsRoute },
  },
} = versionControlRoutes;

versionControlRouter[getAllStuffsRoute.method](
  getAllStuffsRoute.url,
  getAllStuffVersionControlController
);

module.exports = { versionControlRouter };
