const { Router } = require("express");

const userErrorController = require("~/controller/errorController/userErrorController");

const errorRoute = Router();

errorRoute.get("/user/", userErrorController.sendUserError);

exports.errorRoute = errorRoute;
