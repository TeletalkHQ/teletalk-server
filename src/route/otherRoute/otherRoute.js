const { Router } = require("express");

const {
	faviconOtherController,
} = require("~/controller/otherController/faviconOtherController");

const {
	routeOtherTemplate: { favicon },
} = require("~/template/otherTemplate/routeOtherTemplate");

const otherRoute = Router();

otherRoute.get(favicon.route, faviconOtherController);

module.exports = { otherRoute };
