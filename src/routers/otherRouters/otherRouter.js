const { Router } = require("express");

const {
	welcomeOtherController,
} = require("~/controllers/otherControllers/welcomeOtherController");
const {
	otherRouterTemplate: {
		welcome: { properties: welcome },
	},
} = require("~/templates/routerTemplates/otherRouterTemplate");

const otherRoute = Router();

otherRoute[welcome.method](welcome.route, welcomeOtherController);

module.exports = { otherRoute };
