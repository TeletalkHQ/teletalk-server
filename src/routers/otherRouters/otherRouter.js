const { Router } = require("express");

const {
	welcomeOtherController,
} = require("~/controllers/otherControllers/welcomeOtherController");
const {
	otherRouteTemplate: {
		welcome: { properties: welcome },
	},
} = require("~/templates/routeTemplates/otherRouteTemplate");

const otherRoute = Router();

otherRoute[welcome.method](welcome.route, welcomeOtherController);

module.exports = { otherRoute };
