const { Router } = require("express");
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
	getAllStuffs.route,
	getAllStuffVersionControlController,
);

module.exports = { versionControlRouter };
