const { Router } = require("express");
const userTemplateController = require("~/controller/templateController/userTemplateContorller");

const templateRoute = Router();

templateRoute.get("/user", userTemplateController.sendUserTemplate);

exports.templateRoute = templateRoute;
