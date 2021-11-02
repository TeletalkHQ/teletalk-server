const { Router } = require("express");

const authErrorController = require("~/controller/errorController/authErrorController");

const authErrorRoute = Router();

authErrorRoute.get("/user/", authErrorController.authErrorController);

exports.authErrorRoute = authErrorRoute;
