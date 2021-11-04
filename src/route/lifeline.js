//* All routers come into here =>

const { Router } = require("express");

const { userRoute } = require("~/route/userRoute/userRoute");

const {
	routeUserTemplate,
} = require("~/template/userTemplate/routeUserTemplate");

const lifeline = Router();

lifeline.use(routeUserTemplate.baseRoute, userRoute);

exports.lifeline = lifeline;
