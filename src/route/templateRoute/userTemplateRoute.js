const { Router } = require("express");

const userTemplateController = require("~/controller/templateController/userTemplateController");
const {
	userRouteTemplate: { user },
} = require("~/model/template/routeTemplate/userRouteTemplate");

const userTemplateRoute = Router();

userTemplateRoute.get(user.route, userTemplateController.userTemplateController);

exports.userTemplateRoute = userTemplateRoute;
