const { Router } = require("express");

const {
	welcomeOtherController,
} = require("~/controller/otherController/welcomeOtherController");
const {
	otherRouteTemplate: { welcome },
} = require("~/template/routeTemplate/otherRouteTemplate");

const otherRoute = Router();

otherRoute.get(welcome.route, welcomeOtherController);

module.exports = { otherRoute };
