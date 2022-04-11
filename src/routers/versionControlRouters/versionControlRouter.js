const { Router } = require("express");

const {
  getAllStuffVersionControlController,
} = require("~/controllers/versionControlControllers/getAllStuffVersionControlController");

const {
  versionControlRouterTemplate,
} = require("~/templates/routerTemplates/versionControlRouterTemplate");

const versionControlRouter = Router();

const {
  properties: {
    getAllStuffs: { properties: getAllStuffs },
  },
} = versionControlRouterTemplate;

versionControlRouter[getAllStuffs.method](
  getAllStuffs.url,
  getAllStuffVersionControlController
);

module.exports = { versionControlRouter };
