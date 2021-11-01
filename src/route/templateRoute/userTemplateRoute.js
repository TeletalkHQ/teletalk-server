const { Router } = require("express");
const userTemplateController = require("~/controller/templateController/userTemplateContorller");
const {
	userTemplateTemplate: { user },
} = require("~/model/template/routeTemplate/userTemplateTemplate");

const templateRoute = Router();

templateRoute.get(user.route, userTemplateController.sendUserTemplate);

exports.templateRoute = templateRoute;
