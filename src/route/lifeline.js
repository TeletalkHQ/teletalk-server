//* All routers come into here =>

const { Router } = require("express");

const { userRoute } = require("~/route/userRoute/userRoute");
const { errorRoute } = require("~/route/errorRoute/userErrorRoute");
const { templateRoute } = require("~/route/templateRoute/userTemplateRoute");

const {
	userTemplateTemplate,
} = require("~/model/template/routeTemplate/userTemplateTemplate");
const {
	userRouteTemplate,
} = require("~/model/template/routeTemplate/userRouteTemplate");

const lifeline = Router();

lifeline.use(userRouteTemplate.baseRoute, userRoute);

lifeline.use("/error", errorRoute);

lifeline.use(userTemplateTemplate.baseRoute, templateRoute);

exports.lifeline = lifeline;
