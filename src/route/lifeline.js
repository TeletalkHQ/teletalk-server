//* All routers come into here =>

const { Router } = require("express");

const { userAuthRoute } = require("~/route/authRoute/userAuthRoute");
const { authErrorRoute } = require("~/route/errorRoute/authErrorRoute");
const { userTemplateRoute } = require("~/route/templateRoute/userTemplateRoute");

const {
	userRouteTemplate
} = require("~/model/template/routeTemplate/userRouteTemplate");

const lifeline = Router();

lifeline.use(userRouteTemplate.mainBaseRoute, userAuthRoute);

lifeline.use("/error", authErrorRoute);

lifeline.use(userRouteTemplate.templateBaseRoute, userTemplateRoute);

exports.lifeline = lifeline;
