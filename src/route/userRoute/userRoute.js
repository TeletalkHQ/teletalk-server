const { Router } = require("express");

const userRegisterController = require("~/controller/userController/userRegisterController");

const userRoute = Router();

userRoute.post("/register/", userRegisterController.register);

exports.userRoute = userRoute;
