const { Router } = require("express");

const userRegisterController = require("~/controller/userController/userRegisterController");
const userLoginController = require("~/controller/userController/userLoginController");

const userRoute = Router();

userRoute.post("/register/", userRegisterController.register);

userRoute.post("/login", userLoginController.login);

exports.userRoute = userRoute;
