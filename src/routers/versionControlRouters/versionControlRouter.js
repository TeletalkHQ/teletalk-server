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
    getAllStuffs: { properties: getAllStuffs },
  },
} = versionControlRoutes;

versionControlRouter[getAllStuffs.method](
  getAllStuffs.url,
  getAllStuffVersionControlController
);

module.exports = { versionControlRouter };
