const { Router } = require("express");

const {
	welcomeOtherController,
} = require("~/controller/otherController/welcomeOtherController");
const {
	otherRouteTemplate: {
		welcome: { properties: welcome },
	},
} = require("~/template/routeTemplate/otherRouteTemplate");

const otherRoute = Router();

otherRoute[welcome.method](welcome.route, welcomeOtherController);

module.exports = { otherRoute };
